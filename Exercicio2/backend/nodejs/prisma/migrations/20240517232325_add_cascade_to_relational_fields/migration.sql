-- DropForeignKey
ALTER TABLE "contract_rules" DROP CONSTRAINT "contract_rules_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_plans" DROP CONSTRAINT "customer_plans_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_plans" DROP CONSTRAINT "customer_plans_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "park_movements" DROP CONSTRAINT "park_movements_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_customer_id_fkey";

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_plans" ADD CONSTRAINT "customer_plans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_plans" ADD CONSTRAINT "customer_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_rules" ADD CONSTRAINT "contract_rules_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "park_movements" ADD CONSTRAINT "park_movements_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
