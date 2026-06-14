import { Matches } from "@/app/(protected)/bolao/[id]/page";
import { prisma } from "@/app/_lib/prisma";

type Result = "team1" | "team2" | "draw";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const games = await prisma.game.findMany({});

  function getResult(score1: number, score2: number): Result {
    if (score1 > score2) return "team1";
    if (score2 > score1) return "team2";
    return "draw";
  }

  function handleResultGame(
    score_team1: number,
    score_team2: number,
    scoreboard1: number,
    scoreboard2: number,
  ) {
    if (score_team1 === scoreboard1 && score_team2 === scoreboard2) {
      return 3;
    }

    const realResult = getResult(score_team1, score_team2);
    const guessResult = getResult(scoreboard1, scoreboard2);

    if (realResult === guessResult) {
      return 1;
    }

    return 0;
  }

  for (const game of games) {
    const { matches } = (await fetch(
      "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
    ).then((response) => response.json())) as Matches;

    const getGame = matches.find(
      (item) =>
        item.round === game.round &&
        item.team1 === game.team1 &&
        item.team2 === game.team2,
    );

    if (getGame?.score?.ft) {
      const [score_team1, score_team2] = getGame.score.ft;
      const result = handleResultGame(
        game.score_team1,
        game.score_team2,
        score_team1,
        score_team2,
      );

      const allGuess = await prisma.guess.findFirst({
        where: {
          gameId: game.id,
        },
      });

      if (allGuess) {
        return new Response("Game id alread here", { status: 200 });
      }

      await prisma.guess.create({
        data: {
          gameId: game.id,
          userId: game.userId,
          poolId: game.poolId,
          points: result,
        },
      });
    }
  }

  return new Response("OK", { status: 200 });
}
