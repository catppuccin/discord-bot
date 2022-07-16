/*
  Warnings:

  - A unique constraint covering the columns `[cid]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "cid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_cid_key" ON "Channel"("cid");
