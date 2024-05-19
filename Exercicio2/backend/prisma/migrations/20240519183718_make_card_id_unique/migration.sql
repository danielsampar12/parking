/*
  Warnings:

  - A unique constraint covering the columns `[card_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_card_id_key" ON "customers"("card_id");
