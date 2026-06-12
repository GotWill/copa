import { prisma } from "@/app/_lib/prisma";

export interface GetPool {
  id: string;
  code: string;
  name: string;
  poolParticapantes: {
    id: string;
    user: {
      id: string;
      name: string;
      avatarUrl: string | null;
    };
  }[];
}

export const getPool = async (code: string): Promise<GetPool | null> => {
  const pool = await prisma.pool.findUnique({
    where: {
      code,
    },
    select: {
      id: true,
      code: true,
      name: true,
      poolParticapntes: {
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
    poolParticapantes: pool.poolParticapntes.map(({ id, user }) => ({
      id,
      user: {
        id: 'user.id',
        name: user.name,
        avatarUrl: user.image,
      },
    })),
  };
};
