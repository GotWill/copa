"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Lock } from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import { OneMatche } from "../page";
import Image from "next/image";
import { COUNTRY_CODE } from "@/app/_lib/matches";
import { isSameHour } from "date-fns";
import { parseMatchToUTC } from "@/app/_helpers/parse-match-utc";

function ScoreInput({
  value,
  onChange,
  disabled,
  label,
}: {
  value: number | string;
  onChange: (value: number | undefined) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      aria-label={label}
      value={value}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.value === "" ? undefined : Number(e.target.value))
      }
      className={cn(
        "h-14 w-14 rounded-md border border-border bg-input text-center text-xl font-semibold text-foreground outline-none transition",
        "focus:border-primary focus:ring-2 focus:ring-primary/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white",
      )}
    />
  );
}

export function MatchCard({ match }: { match: OneMatche }) {
  const [home, setHome] = useState<number | undefined>(undefined);
  const [away, setAway] = useState<number | undefined>(undefined);
  const [confirmed, setConfirmed] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const matchDate = parseMatchToUTC(match.time, match.date);
  const isClosed = now.getTime() > matchDate.getTime() + 15 * 60 * 1000;

  const isActive = "active";

  const flagUrlOne = (team: string) =>
    `https://flagcdn.com/48x36/${COUNTRY_CODE[team]}.png`;

  const flagUrlTwo = (team: string) =>
    `https://flagcdn.com/48x36/${COUNTRY_CODE[team]}.png`;

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
          {match.team1} vs {match.team2}
        </h3>
        <p className="mt-1 text-xs">{match.date}</p>
      </header>

      <div className="mt-5 flex items-center justify-center gap-3">
        <ScoreInput
          value={home ?? ""}
          onChange={setHome}
          disabled={isClosed}
          label={`Placar`}
        />
        <Image
          src={flagUrlOne(match.team1)}
          width={32}
          height={24}
          alt={match.team1}
        />
        <span className="px-1 text-sm font-medium">X</span>
        <Image
          src={flagUrlTwo(match.team2)}
          width={32}
          height={24}
          alt={match.team2}
        />
        <ScoreInput
          value={away ?? ""}
          onChange={setAway}
          disabled={isClosed}
          label={`Placa`}
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
  );
}
