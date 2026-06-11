"use client"

import { useState } from "react"
import { matches } from "@/app/_lib/matches"

import { cn } from "@/app/_lib/utils"
import { PoolHeader } from "./components/pool-header"
import { MatchCard } from "./components/match-card"
import { RankingTable } from "./components/ranking-table"

type Tab = "palpites" | "ranking"

export default function Page() {
  const [tab, setTab] = useState<Tab>("palpites")

  return (
    <main>
      <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:py-12">
        <PoolHeader />

        <nav
          className="mt-6 inline-flex rounded-lg border border-neutral bg-input p-1"
          aria-label="Seções do bolão"
        >
          <button
            type="button"
            onClick={() => setTab("palpites")}
            aria-pressed={tab === "palpites"}
            className={
              `rounded-md px-5 py-2 text-sm font-medium transition,
              ${tab === "palpites"
                ? "bg-[#323238] text-white"
                : "text-muted-foreground"}`
            }
          >
            Seus palpites
          </button>
          <button
            type="button"
            onClick={() => setTab("ranking")}
            aria-pressed={tab === "ranking"}
            className={cn(
              "rounded-md px-5 py-2 text-sm font-medium transition",
              tab === "ranking"
                ? "bg-[#323238] text-white"
                : "text-muted-foreground",
            )}
          >
            Ranking do grupo
          </button>
        </nav>

        {tab === "palpites" ? (
          <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </section>
        ) : (
          <section className="mt-8">
            <RankingTable />
          </section>
        )}
      </div>
    </main>
  )
}
