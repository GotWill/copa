import { CardPool } from "@/app/_components/card-pool";
import Link from "next/link";
import PoolHandler from "./components/pool-handler";
import { getPool } from "@/app/_data-access/dashboard/get-pool";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const data = await getPool();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="max-w-[1144px] w-full mx-auto pt-6">
      <PoolHandler />
      <div className="flex flex-col gap-3">
        {data?.pools.map((item, index) => (
          <Link key={index} href={`/bolao/${item.code}`}>
            <CardPool
              title={item.name}
              createdBy={session?.user.id === item.userId ? 'Mim' : item.name}
              participants={item.poolParticapantes}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
