"use server";

import { actionClient } from "@/lib/safe-action";
import { schema } from "./schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { customAlphabet } from "nanoid";

export const createPool = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput: { name } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("required user");
    }

    const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZ", 6);
    const code = nanoid();

    const pool = await prisma.pool.create({
      data: {
        name,
        userId: session.user.id,
        code,
      },
    });

    revalidatePath("/dashboard");

    return {
      code: pool.code,
    };
  });
