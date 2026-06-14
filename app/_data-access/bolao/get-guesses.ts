"server-only";

import { prisma } from "@/app/_lib/prisma";
export interface GameDto {
  games: {
    id: string;
    score_team1: number;
    score_team2: number;
    team1: string;
    team2: string;
    round: string;
  }[];
}

export const getGame = async (poolId: string): Promise<GameDto> => {
  const games = await prisma.game.findMany({
    where: {
      poolId,
    },
  });

  return {
    games: games.map((game) => ({
      id: game.id,
      round: game.round,
      score_team1: game.score_team1,
      score_team2: game.score_team2,
      team1: game.team1,
      team2: game.team2,
    })),
  };
};
