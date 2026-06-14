"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Lock } from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import { OneMatche } from "../page";
import Image from "next/image";
import { COUNTRY_CODE } from "@/app/_lib/matches";
import { parseMatchToUTC } from "@/app/_helpers/parse-match-utc";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { createGame } from "@/app/_actions/create-game";
import { GameDto } from "@/app/_data-access/bolao/get-guesses";

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

export function MatchCard({
  match,
  games: { games },
  poolId
}: {
  match: OneMatche;
  games: GameDto;
  poolId: string;
}) {
  const [team1, setTeam1] = useState<number | undefined>(undefined);
  const [team2, setTeam2] = useState<number | undefined>(undefined);
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

  const { execute } = useAction(createGame, {
    onSuccess: () => {
      toast.success("Palpite registrado");
    },
    onError: () => {
      toast.error("Falha ao registar palpite");
    },
  });

  const gameIsPlayer = games.find(
    (game) =>
      game.round === match.round &&
      game.team1 === match.team1 &&
      game.team2 === match.team2,
  );

  const handleCreateGame = async () => {
    if (team1 === undefined || team2 === undefined) {
      toast.error("Preencha os campos");
      return;
    }
    execute({
      date: match.date,
      round: match.round,
      score_team1: team1,
      score_team2: team2,
      team1: match.team1,
      team2: match.team2,
      poolId
    });
  };

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
          value={gameIsPlayer ? gameIsPlayer.score_team1 : (team1 ?? "")}
          onChange={setTeam1}
          disabled={isClosed || Boolean(gameIsPlayer)}
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
          value={gameIsPlayer ? gameIsPlayer.score_team2 : (team2 ?? "")}
          onChange={setTeam2}
          disabled={isClosed || Boolean(gameIsPlayer)}
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
        ) : gameIsPlayer ? (
          <Button
            disabled
            className="h-11 w-full gap-2 bg-green opacity-10 cursor-not-allowed text-white"
          >
            <Check className="size-4" />
            Palpite confirmado
          </Button>
        ) : (
          <Button
            onClick={handleCreateGame}
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
