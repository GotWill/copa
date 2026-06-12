"use client";

import { CardPool } from "@/app/_components/card-pool";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import { PoolDto } from "@/app/_data-access/dashboard/all-pool";
import { useState } from "react";

interface ContentSearchPoolType {
  data: PoolDto | undefined;
  userId: string;
}

export default function ContentSearchPool({
  data,
  userId,
}: ContentSearchPoolType) {
  const [filter, setFilter] = useState("");

  const dataFiltered = data?.pools.filter(
    (item) =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      item.userName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );

  return (
    <div className="flex flex-col space-y-4">
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Digite o nome do bolão"
        className="w-full bg-input border font-medium text-white placeholder:text-white py-4 px-6 h-auto"
      />
      <Separator />
      <div className="flex flex-col gap-2">
        {dataFiltered?.length ? (
          dataFiltered?.map((item, index) => (
            <CardPool
              poolId={item.id}
              userId={userId}
              key={index}
              code={item.code}
              title={item.name}
              createdBy={item.userName}
              participants={item.poolParticapantes}
              isButton={true}
            />
          ))
        ) : (
          <p className="text-white text-center text-base">Nenhum Bolão encontrado</p>
        )}
      </div>
    </div>
  );
}
