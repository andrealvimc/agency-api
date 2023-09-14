/*
  Warnings:

  - You are about to drop the column `documentType` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Agency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "documentType",
DROP COLUMN "type";
