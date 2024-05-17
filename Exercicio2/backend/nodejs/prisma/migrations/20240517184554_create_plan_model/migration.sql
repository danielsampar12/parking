-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);
