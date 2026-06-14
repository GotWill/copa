import { getPool } from "@/app/_data-access/bolao/get-pool";
import { PoolHeader } from "./components/pool-header";
import { redirect } from "next/navigation";
import { ContentPoolPage } from "./components/content-pool-page";
import { addDays, isWithinInterval, parseISO, startOfDay } from "date-fns";
import { getGame } from "@/app/_data-access/bolao/get-guesses";

export interface OneMatche {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score?: {
    ft: number[];
  };
}

export interface Matches {
  matches: OneMatche[];
}

export default async function Page(props: PageProps<"/bolao/[id]">) {
  const { id } = await props.params;
  const pool = await getPool(id);

  if (!pool) {
    redirect("/dashboard");
  }

  const games = await getGame(pool.id);
  const { matches } = (await fetch(
    "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
  ).then((response) => response.json())) as Matches;
  const today = new Date();
  const nextMatches = matches
    .filter((match) =>
      isWithinInterval(startOfDay(parseISO(match.date)), {
        start: startOfDay(today),
        end: addDays(today, 2),
      }),
    )
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  // console.log(nextMatches);

  return (
    <main>
      <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:py-12">
        <PoolHeader pool={pool} />
        <ContentPoolPage
          allMatches={{ matches: nextMatches }}
          games={games}
          poolId={pool.id}
        />
      </div>
    </main>
  );
}
