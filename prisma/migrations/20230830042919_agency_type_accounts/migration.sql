/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Agency` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `Agency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Agency_cnpj_key";

-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "cnpj",
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "documentType" TEXT NOT NULL DEFAULT 'cnpj',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'pj';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "agencyRole" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Agency_document_key" ON "Agency"("document");
