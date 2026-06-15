import "server-only";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { headers } from "next/headers";
import { Participant } from "@/app/_types";



interface Pool {
  pools: {
    id: string;
    code: string;
    name: string;
    userId: string;
    userName: string;
    poolParticapantes: Participant[];
  }[];
}

export const myGetPool = async (): Promise<Pool | undefined> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return;
  }

  const pools = await prisma.pool.findMany({
    where: {
      OR: [
        {
          userId: session?.user.id,
        },
        {
          poolParticapantes: {
            some: {
              userId: session?.user.id,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      poolParticapantes: {
        select: {
          user: true,
          id: true,
        },
      },
      user: {
        select: {
          name: true,
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
      userName: item.user.name,
      poolParticapantes: item.poolParticapantes.map((item) => ({
        id: item.user.id,
        name: item.user.name,
        avatarUrl: item.user.image,
      })),
    })),
  };
};
