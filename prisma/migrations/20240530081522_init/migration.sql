-- CreateTable
CREATE TABLE "Pricetracking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "storage" VARCHAR(255) NOT NULL,
    "alp" INTEGER NOT NULL,
    "dac" DOUBLE PRECISION NOT NULL,
    "dg" DOUBLE PRECISION NOT NULL,
    "newDAC" DOUBLE PRECISION NOT NULL,
    "marketplace_price" INTEGER NOT NULL,
    "reseller" JSONB NOT NULL,

    CONSTRAINT "Pricetracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pricetracking_date_idx" ON "Pricetracking"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Pricetracking_date_product_storage_key" ON "Pricetracking"("date", "product", "storage");
