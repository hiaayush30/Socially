/*
  Warnings:

  - You are about to drop the column `publicId` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publicId",
ADD COLUMN     "imageKey" TEXT;
