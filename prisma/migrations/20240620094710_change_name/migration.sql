/*
  Warnings:

  - You are about to drop the `POPSale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "POPSale";

-- CreateTable
CREATE TABLE "PopSale" (
    "id" SERIAL NOT NULL,
    "reseller" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "productID" TEXT NOT NULL,
    "saleType" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "totalSales" INTEGER NOT NULL,
    "totalMoney" INTEGER NOT NULL,
    "refundMoney" INTEGER NOT NULL,
    "refundRate" DOUBLE PRECISION NOT NULL,
    "refundAmount" DOUBLE PRECISION NOT NULL,
    "netPaymentQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PopSale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PopSale_reseller_saleType_product_date_idx" ON "PopSale"("reseller", "saleType", "product", "date");

-- CreateIndex
CREATE UNIQUE INDEX "PopSale_reseller_date_productID_saleType_product_key" ON "PopSale"("reseller", "date", "productID", "saleType", "product");
