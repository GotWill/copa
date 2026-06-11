import Image from "next/image";
import { Copy } from "lucide-react";
import { ranking } from "@/lib/matches";

export function PoolHeader() {
  const visible = ranking.slice(0, 4);
  const extra = 38;

  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bolão do Rodrigão</h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className="text-label">
            Código: <span className="font-semibold text-white">JP3640</span>
          </span>
          <button
            type="button"
            aria-label="Copiar código do bolão"
            className="rounded p-1 transition hover:bg-muted hover:text-foreground"
          >
            <Copy className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex -space-x-3">
          {visible.map((player) => (
            <Image
              key={player.id}
              src={player.avatar || "/placeholder.svg"}
              alt={player.name}
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-background object-cover"
            />
          ))}
        </div>
        <div className="ml-2 flex size-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
          +{extra}
        </div>
      </div>
    </header>
  );
}
