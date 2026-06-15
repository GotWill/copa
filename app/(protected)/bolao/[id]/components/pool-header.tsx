"use client";

import Image from "next/image";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { GetPoolDto } from "@/app/_types";

interface PoolHeaderType {
  pool: GetPoolDto;
}

export function PoolHeader({ pool }: PoolHeaderType) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(pool.code);
    toast.success("Código copiado");
  };

  const extraCount = pool.poolParticapantes.length - 4;

  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{pool.name}</h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className="text-label">
            Código:{" "}
            <span className="font-semibold text-white">{pool.code}</span>
          </span>
          <button
            onClick={handleCopyCode}
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
          {pool.poolParticapantes.slice(0, 4).map(({ id, user }) => (
            <Image
              key={id}
              src={user.avatarUrl || "/placeholder.svg"}
              alt={user.name}
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-background object-cover"
            />
          ))}
        </div>
        {extraCount > 0 && (
          <div className="ml-2 flex size-10 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
            +{extraCount}
          </div>
        )}
      </div>
    </header>
  );
}