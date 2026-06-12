"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { createPoolParticipant } from "../_actions/create-pool-participants";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface Participant {
  id?: string;
  name: string;
  avatarUrl: string | null;
}

interface BolaoCardProps {
  userId: string;
  poolId: string;
  title: string;
  createdBy: string;
  participants: Participant[];
  code: string;
  extraCount?: number;
  isButton?: boolean;
  onClose?: () => void;
}

export function CardPool({
  title,
  createdBy,
  participants,
  code,
  extraCount,
  isButton,
  poolId,
  userId,
  onClose,
}: BolaoCardProps) {
  const visibleParticipants = participants.slice(0, 4);

  const { execute } = useAction(createPoolParticipant, {
    onSuccess: () => {
      onClose?.();
      redirect(`bolao/${code}`);
    },
    onError: () => {
      toast.error("Error ao processar essa operação");
    },
  });

  console.log(participants)

  return (
    <div className="flex items-center justify-between bg-input border-b-4 border-button-yellow rounded-lg px-6 py-5 w-full">
      <Link href={`/bolao/${code}`} className="w-full">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-white font-bold text-lg leading-tight">
            {title}
          </span>
          <span className="text-label text-sm">Criado por {createdBy}</span>
        </div>
      </Link>

      <div className="flex items-center">
        <div className="flex gap-4">
          <div className="flex -space-x-3">
            {visibleParticipants.map((participant, i) => (
              <Avatar
                key={i}
                className="w-10 h-10 border-2 border-input ring-0"
              >
                <AvatarImage
                  src={participant?.avatarUrl ?? ""}
                  alt={participant.name}
                />
                <AvatarFallback className="bg-[#323238] text-white text-xs">
                  {participant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraCount && extraCount > 0 && (
              <Avatar className="w-10 h-10 border-2 border-input">
                <AvatarImage />
                <AvatarFallback className="bg-[#323238] text-white text-xs">
                  +{extraCount}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          {isButton &&  (
            <Button
              onClick={() => execute({ poolId, userId })}
              variant="outline"
              className="bg-green text-white py-2 px-5 border-none cursor-pointer relative z-20"
            >
              <LogOut />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
