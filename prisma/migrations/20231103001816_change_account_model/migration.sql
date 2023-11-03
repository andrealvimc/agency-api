/*
  Warnings:

  - You are about to drop the column `address` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domain]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "address";

-- CreateIndex
CREATE UNIQUE INDEX "Account_domain_key" ON "Account"("domain");
