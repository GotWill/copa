"use client";

import { useState } from "react";
import { RankingTable } from "./ranking-table";
import { MatchCard } from "./match-card";
import { Matches } from "../page";
import { GameDto, GuessesDto } from "@/app/_types";


type Tab = "palpites" | "ranking";

interface ContentPoolPageType {
  allMatches: Matches;
  games: GameDto;
  poolId: string;
  guesses: GuessesDto[];
}

export function ContentPoolPage({
  allMatches: { matches },
  games,
  poolId,
  guesses,
}: ContentPoolPageType) {
  const [tab, setTab] = useState<Tab>("palpites");
  return (
    <div>
      <nav
        className="mt-6 flex gap-2 rounded-lg border border-neutral bg-input p-1 w-fit"
        aria-label="Seções do bolão"
      >
        <button
          type="button"
          onClick={() => setTab("palpites")}
          aria-pressed={tab === "palpites"}
          className={`rounded-md px-5 py-2 text-sm font-medium transition,
              ${
                tab === "palpites"
                  ? "bg-[#323238] text-white"
                  : "text-muted-foreground bg-transparent"
              }`}
        >
          Seus palpites
        </button>
        <button
          type="button"
          onClick={() => setTab("ranking")}
          aria-pressed={tab === "ranking"}
          className={`rounded-md px-5 py-2 text-sm font-medium transition ${tab === "ranking" ? "bg-[#323238] text-white" : "text-muted-foreground bg-transparent"}`}
        >
          Ranking do grupo
        </button>
      </nav>

      {tab === "palpites" ? (
        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matches.map((match) => (
            <MatchCard
              key={`${match.team1}x${match.team2}-${match.time}`}
              match={match}
              games={games}
              poolId={poolId}
            />
          ))}
        </section>
      ) : (
        <section className="mt-8">
          <RankingTable  guesses={guesses} />
        </section>
      )}
    </div>
  );
}
