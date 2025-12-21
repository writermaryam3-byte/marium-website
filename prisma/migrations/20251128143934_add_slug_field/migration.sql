/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Made the column `content` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
