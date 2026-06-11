/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `pool` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pool" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pool_code_key" ON "pool"("code");
