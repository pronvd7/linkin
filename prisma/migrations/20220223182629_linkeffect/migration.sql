/*
  Warnings:

  - You are about to drop the column `linkAnimateEffect` on the `linkdata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "linkdata" DROP COLUMN "linkAnimateEffect",
ADD COLUMN     "linkEffect" VARCHAR;
