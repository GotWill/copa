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
  isButton,
  poolId,
  onClose,
}: BolaoCardProps) {
  const extraCount = participants.length - 4

  const { execute } = useAction(createPoolParticipant, {
    onSuccess: () => {
      onClose?.();
      setTimeout(() => {
        redirect(`/bolao/${code}`);
      }, 200);
    },
    onError: () => {
      toast.error("Error ao processar essa operação");
    },
  });

  const verifyUserInParticipant = !isButton ? `bolao/${code}` : "#";

  return (
    <div className="flex items-center justify-between bg-input border-b-4 border-button-yellow rounded-lg px-6 py-5 w-full">
      <Link
        href={verifyUserInParticipant}
        className={`${!isButton ? "cursor-pointer w-full" : "cursor-default"}`}
      >
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-white font-bold text-base md:text-lg leading-tight">
            {title}
          </span>
          <span className="text-label text-sm">Criado por {createdBy}</span>
        </div>
      </Link>

      <div className="flex items-center">
        <div className="flex gap-4">
          <div className="flex -space-x-3">
            {participants.slice(0, 4).map((participant, i) => (
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
            {extraCount > 0 && (
              <Avatar className="w-10 h-10 border-2 border-input">
                <AvatarFallback className="bg-[#323238] text-white text-xs">
                  +{extraCount}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          {isButton && (
            <Button
              onClick={() => execute({ poolId })}
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
