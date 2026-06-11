"use client"

import { useState } from "react"
import { Check, Clock, Lock } from "lucide-react"
import type { Match } from "@/lib/matches"
import { cn } from "@/lib/utils"
import { TeamFlag } from "./team-flag"
import { Button } from "@/app/components/ui/button"

function ScoreInput({
  value,
  onChange,
  disabled,
  label,
}: {
  value: number
  onChange: (value: number) => void
  disabled: boolean
  label: string
}) {
  return (
    <input
      type="number"
      min={0}
      inputMode="numeric"
      aria-label={label}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
      className={cn(
        "h-14 w-14 rounded-md border border-border bg-input text-center text-xl font-semibold text-foreground outline-none transition",
        "focus:border-primary focus:ring-2 focus:ring-primary/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white",
      )}
    />
  )
}

export function MatchCard({ match }: { match: Match }) {
  const [home, setHome] = useState(match.homeScore)
  const [away, setAway] = useState(match.awayScore)
  const [confirmed, setConfirmed] = useState(false)

  const isClosed = match.status === "closed"
  const isActive = match.status === "active"

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-input p-5 transition-colors",
        isActive
          ? "border-accent/60 ring-1 ring-accent/30"
          : "border-border hover:border-border/80",
      )}
    >
      <header className="text-center">
        <h3 className="text-base font-semibold">
          {match.home.name} vs {match.away.name}
        </h3>
        <p className="mt-1 text-xs">{match.date}</p>
      </header>

      <div className="mt-5 flex items-center justify-center gap-3">
        <ScoreInput
          value={home}
          onChange={setHome}
          disabled={isClosed}
          label={`Placar ${match.home.name}`}
        />
        <TeamFlag team={match.home} />
        <span className="px-1 text-sm font-medium">X</span>
        <TeamFlag team={match.away} align="right" />
        <ScoreInput
          value={away}
          onChange={setAway}
          disabled={isClosed}
          label={`Placar ${match.away.name}`}
        />
      </div>

      <div className="mt-5">
        {isClosed ? (
          <Button
            disabled
            variant="secondary"
            className="h-11 w-full cursor-not-allowed gap-2"
          >
            <Lock className="size-4" />
            Tempo esgotado
          </Button>
        ) : confirmed ? (
          <Button
            disabled
            className="h-11 w-full gap-2 bg-green opacity-10 cursor-not-allowed text-white"
          >
            <Check className="size-4" />
            Palpite confirmado
          </Button>
        ) : (
          <Button
            onClick={() => setConfirmed(true)}
            className="h-11 w-full gap-2 bg-green text-white hover:bg-green/65"
          >
            {isActive ? <Clock className="size-4" /> : null}
            Confirmar palpite
            <Check className="size-4" />
          </Button>
        )}
      </div>
    </article>
  )
}
