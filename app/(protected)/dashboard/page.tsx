

import { CardPool } from "@/app/_components/card-pool";
import PoolHandler from "./components/pool-handler";
import { myGetPool } from "@/app/_data-access/dashboard/my-pool";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { DialogButtonCreatePool } from "./components/dialog-button";
import Header from "@/app/_components/header";

export default async function Home() {
  const data = await myGetPool();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="max-w-[1144px] w-full mx-auto pt-6">
      <div className="flex flex-col gap-4">
        <Header />
        <PoolHandler />
        <div className="flex flex-col gap-3">
          {data?.pools.length ? (
            data?.pools.map((item, index) => (
              <CardPool
                poolId={item.id}
                userId={item.userId}
                key={index}
                code={item.code}
                title={item.name}
                createdBy={
                  session?.user.id === item.userId ? "Mim" : item.userName
                }
                participants={item.poolParticapantes}
              />
            ))
          ) : (
            <div className="text-center max-w-[400px] mx-auto">
              Você ainda não está participando de nenhum bolão, que tal{" "}
              <strong className="text-button-yellow font-bold underline cursor-pointer">
                buscar um por código
              </strong>{" "}
              ou <DialogButtonCreatePool isButton={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
