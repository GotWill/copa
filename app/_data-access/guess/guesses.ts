import { prisma } from "@/app/_lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

export interface GuessesDto {
  id: string;
  points: number;
  name: string;
  image: string | null;
}

interface PromiseGuesses {
  guesses: GuessesDto[];
}

export const getGuesses = async (poolId: string): Promise<PromiseGuesses> => {
  const gueses: {
    id: string;
    points: number;
    name: string;
    image: string | null;
  }[] = await prisma.$queryRaw(
    Prisma.sql`
SELECT 
    users.id, 
    users.name, 
    users.image, 
    COALESCE(SUM(guess.points), 0) as points
  FROM (
    SELECT "userId" FROM pool_participants WHERE "poolId" = ${poolId}
    UNION
    SELECT "userId" FROM pool WHERE id = ${poolId}
  ) AS all_users
  JOIN users ON users.id = all_users."userId"
  LEFT JOIN guess ON guess."userId" = all_users."userId" 
    AND guess."poolId" = ${poolId}
  GROUP BY users.id, users.name, users.image
  ORDER BY points DESC
      `,
  );

  return {
    guesses: gueses.map((item) => ({
      id: item.id,
      points: item.points,
      name: item.name,
      image: item.image,
    })),
  };
};
