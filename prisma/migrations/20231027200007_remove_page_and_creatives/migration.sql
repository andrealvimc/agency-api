/*
  Warnings:

  - You are about to drop the `Creative` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creative" DROP CONSTRAINT "Creative_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_categoryId_fkey";

-- DropTable
DROP TABLE "Creative";

-- DropTable
DROP TABLE "Page";
