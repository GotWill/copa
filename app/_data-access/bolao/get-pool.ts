import "server-only";

import { prisma } from "@/app/_lib/prisma";
import { GetPoolDto } from "@/app/_types";

export const getPool = async (code: string): Promise<GetPoolDto | null> => {
  const pool = await prisma.pool.findUnique({
    where: {
      code,
    },
    select: {
      id: true,
      code: true,
      name: true,
      poolParticapantes: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!pool) {
    return null;
  }

  return {
    id: pool.id,
    code: pool?.code,
    name: pool.name,
    poolParticapantes: pool.poolParticapantes.map(({ id, user }) => ({
      id,
      user: {
        id: "user.id",
        name: user.name,
        avatarUrl: user.image,
      },
    })),
  };
};
