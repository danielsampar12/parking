-- CreateTable
CREATE TABLE "customer_plans" (
    "id" SERIAL NOT NULL,
    "due_date" TIMESTAMP(3),
    "customer_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,

    CONSTRAINT "customer_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_plans" ADD CONSTRAINT "customer_plans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_plans" ADD CONSTRAINT "customer_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
