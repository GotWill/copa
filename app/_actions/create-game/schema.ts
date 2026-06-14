import * as z from "zod";

export const schema = z.object({
  team1: z.string(),
  team2: z.string(),
  date: z.string(),
  round: z.string(),
  score_team1: z.number(),
  score_team2: z.number(),
  poolId: z.string(),
});
