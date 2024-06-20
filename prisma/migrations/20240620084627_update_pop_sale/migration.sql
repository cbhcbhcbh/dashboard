/*
  Warnings:

  - A unique constraint covering the columns `[reseller,date,productID,saleType,product]` on the table `POPSale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productID` to the `POPSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reseller` to the `POPSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "POPSale" ADD COLUMN     "productID" TEXT NOT NULL,
ADD COLUMN     "reseller" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "POPSale_reseller_saleType_product_date_idx" ON "POPSale"("reseller", "saleType", "product", "date");

-- CreateIndex
CREATE UNIQUE INDEX "POPSale_reseller_date_productID_saleType_product_key" ON "POPSale"("reseller", "date", "productID", "saleType", "product");
