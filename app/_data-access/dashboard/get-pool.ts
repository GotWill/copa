import "server-only";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { headers } from "next/headers";

interface Participant {
  name: string;
  avatarUrl: string | null;
}

interface Pool {
  pools: {
    id: string;
    code: string;
    name: string;
    userId: string,
    poolParticapantes: Participant[];
  }[];
}

export const getPool = async (): Promise<Pool | undefined> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return;
  }

  const pools = await prisma.pool.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      poolParticapntes: {
        select: {
          user: true,
          id: true,
        },
      },
    },
  });

  return {
    pools: pools.map((item) => ({
      code: item.code,
      userId: item.userId,
      id: item.id,
      name: item.name,
      poolParticapantes: item.poolParticapntes.map((item) => ({
        name: item.user.name,
        avatarUrl: item.user.image,
      })),
    })),
  };
};
