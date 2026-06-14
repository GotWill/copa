import Image from "next/image"
import { cn } from "@/app/_lib/utils"
import { GuessesDto } from "@/app/_data-access/guess/guesses"

interface RankingTableType {
  guesses: GuessesDto[]
}

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

export function RankingTable({guesses}:RankingTableType) {
  return (
    <div className="flex flex-col gap-3">
      {guesses.map((player, index) => {
        const position = index + 1
        const isTop3 = position <= 3
        return (
          <div
            key={player.id}
            className={cn(
              "flex items-center gap-4 rounded-xl border border-border px-4 py-3",
              isTop3 && "border-b-4 border-b-button-yellow",
            )}
          >
            <Image
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {player.name}
                {/* {player.isCurrentUser && (
                  <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                    (você)
                  </span>
                )} */}
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
