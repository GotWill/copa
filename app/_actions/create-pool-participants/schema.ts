import * as z from "zod";

export const schema = z.object({
  poolId: z.string(),
  userId: z.string(),
});
