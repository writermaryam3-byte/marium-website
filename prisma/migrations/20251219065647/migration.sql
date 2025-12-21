/*
  Warnings:

  - You are about to drop the column `order` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderCourse" DROP CONSTRAINT "OrderCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "order";

-- AddForeignKey
ALTER TABLE "OrderCourse" ADD CONSTRAINT "OrderCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
