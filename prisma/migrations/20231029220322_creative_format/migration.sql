/*
  Warnings:

  - Added the required column `format` to the `Creative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creative" ADD COLUMN     "format" TEXT NOT NULL;
