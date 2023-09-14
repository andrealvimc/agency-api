/*
  Warnings:

  - Made the column `nameFantasy` on table `Agency` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "nameFantasy" SET NOT NULL;
