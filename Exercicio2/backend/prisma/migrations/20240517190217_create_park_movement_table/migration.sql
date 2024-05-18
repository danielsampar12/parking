/*
  Warnings:

  - A unique constraint covering the columns `[plan_id]` on the table `customer_plans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "contract_rules" (
    "id" SERIAL NOT NULL,
    "until" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "contract_id" INTEGER NOT NULL,

    CONSTRAINT "contract_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "park_movements" (
    "id" SERIAL NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "exit_date" TIMESTAMP(3),
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "park_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contract_rules_contract_id_key" ON "contract_rules"("contract_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_plans_plan_id_key" ON "customer_plans"("plan_id");

-- AddForeignKey
ALTER TABLE "contract_rules" ADD CONSTRAINT "contract_rules_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "park_movements" ADD CONSTRAINT "park_movements_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
