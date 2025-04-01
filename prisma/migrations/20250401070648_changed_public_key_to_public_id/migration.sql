/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publicKey",
ADD COLUMN     "publicId" TEXT;
