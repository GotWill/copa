import Image from "next/image"
import { ranking } from "@/app/_lib/matches"
import { cn } from "@/app/_lib/utils"

function PositionPill({ position }: { position: number }) {
  const isTop3 = position <= 3
  return (
    <span
      className={cn(
        "flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-sm font-bold",
        isTop3
          ? "bg-accent text-accent-foreground"
          : "bg-secondary text-muted-foreground",
      )}
    >
      {position}º
    </span>
  )
}

export function RankingTable() {
  return (
    <div className="flex flex-col gap-3">
      {ranking.map((player, index) => {
        const position = index + 1
        const isTop3 = position <= 3
        return (
          <div
            key={player.id}
            className={cn(
              "flex items-center gap-4 rounded-xl border border-border px-4 py-3",
              isTop3 && "border-b-2 border-b-button-yellow",
            )}
          >
            <Image
              src={player.avatar || "/placeholder.svg"}
              alt={player.name}
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {player.name}
                {player.isCurrentUser && (
                  <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                    (você)
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {player.points} ponto(s)
              </p>
            </div>
            <PositionPill position={position} />
          </div>
        )
      })}
    </div>
  )
}
