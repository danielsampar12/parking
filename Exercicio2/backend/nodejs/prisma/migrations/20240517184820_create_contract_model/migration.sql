-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "max_value" DOUBLE PRECISION,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);
