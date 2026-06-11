import type { Team } from "@/app/_lib/matches"

export function TeamFlag({
  team,
  align = "left",
}: {
  team: Team
  align?: "left" | "right"
}) {
  return (
    <div
      className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      
      <span className="text-sm font-medium">{team.short}</span>
    </div>
  )
}
