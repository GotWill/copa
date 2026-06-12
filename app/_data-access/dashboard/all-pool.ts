import "server-only";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { headers } from "next/headers";

interface Participant {
  id: string;
  name: string;
  avatarUrl: string | null;
  userId: string
}

export interface PoolDto {
  pools: {
    id: string;
    code: string;
    name: string;
    userId: string;
    userName: string;
    poolParticapantes: Participant[];
  }[];
}

export const allPool = async (): Promise<PoolDto | undefined> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return;
  }

  const pools = await prisma.pool.findMany({
    where: {
      NOT: {
        userId: session.user.id,
      },
      AND: {
        poolParticapntes: {
          none: {
            userId: session.user.id
          }
        }
      }
    },
    include: {
      poolParticapntes: {
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
      poolParticapantes: item.poolParticapntes.map((item) => ({
        id: item.user.id,
        name: item.user.name,
        avatarUrl: item.user.image,
        userId: item.user.id
      })),
    })),
  };
};
