"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { schema } from "./schema";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const createPoolParticipant = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput: { poolId, userId }}) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("required user");
    }

    await prisma.poolParticipants.create({
      data: {
        poolId,
        userId,
      },
    });

    revalidatePath("/dashboard")
  });
