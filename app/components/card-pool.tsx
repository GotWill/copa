import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Participant {
  name: string;
  avatarUrl?: string;
}

interface BolaoCardProps {
  title: string;
  createdBy: string;
  participants: Participant[];
  extraCount?: number;
}

export function CardPool({
  title,
  createdBy,
  participants,
  extraCount,
}: BolaoCardProps) {
  const visibleParticipants = participants.slice(0, 4);

  return (
    <div className="flex items-center justify-between bg-input border-b border-button-yellow rounded-lg px-6 py-5 w-full">
      <div className="flex flex-col gap-1">
        <span className="text-white font-bold text-lg leading-tight">
          {title}
        </span>
        <span className="text-label text-sm">Criado por {createdBy}</span>
      </div>

      <div className="flex items-center">
        <div className="flex -space-x-3">
          {visibleParticipants.map((p, i) => (
            <Avatar key={i} className="w-10 h-10 border-2 border-input ring-0">
              <AvatarImage src={p.avatarUrl} alt={p.name} />
              <AvatarFallback className="bg-[#323238] text-white text-xs">
                {p.name.charAt(0)}
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
      </div>
    </div>
  );
}
