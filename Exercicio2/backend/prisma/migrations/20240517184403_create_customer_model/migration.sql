-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "card_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
