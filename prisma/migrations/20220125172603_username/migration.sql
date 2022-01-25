/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `pagedata` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "pagedata" DROP CONSTRAINT "pagedata_username_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "pagedata_username_key" ON "pagedata"("username");

-- AddForeignKey
ALTER TABLE "pagedata" ADD CONSTRAINT "pagedata_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
