/*
  Warnings:

  - You are about to drop the column `description` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "description",
ADD COLUMN     "designation" TEXT;
