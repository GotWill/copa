"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { schema } from "./schema";
import { prisma } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";

export const createGame = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("required user");
    }

    await prisma.game.create({
      data: {
        ...parsedInput,
        userId: session.user.id,
      },
    });

    revalidatePath("/bolao/[id]");
  });
