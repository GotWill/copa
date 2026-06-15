"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { schema } from "./schema";
import { prisma } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { Participant } from "@/app/_types";

interface GetPoolByCode {
  id: string;
  code: string;
  name: string;
  userId: string;
  userName: string;
  poolParticapantes: Participant[];
}

export const getPoolByCode = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput: { code } }): Promise<GetPoolByCode | null> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    await new Promise((resolver) => setTimeout(resolver, 1000))

    const pool = await prisma.pool.findUnique({
      where: {
        code,
        AND: {
          NOT: {
            userId: session.user.id,
          },
        },
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

    if (!pool) {
      return null;
    }

    return {
      id: pool.id,
      code: pool.code,
      name: pool.name,
      poolParticapantes: pool.poolParticapantes.map(({ id, user }) => ({
        id: id,
        avatarUrl: user.image,
        name: user.name,
        userId: user.id,
      })),
      userId: pool.userId,
      userName: pool.user.name,
    };
  });
