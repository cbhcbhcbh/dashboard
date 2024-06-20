-- AlterTable
ALTER TABLE "ExperimentDetail" ALTER COLUMN "createdAt" SET DATA TYPE DATE,
ALTER COLUMN "updatedAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Pricetracking" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "createdAt" SET DATA TYPE DATE,
ALTER COLUMN "updatedAt" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "POPSale" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
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

    CONSTRAINT "POPSale_pkey" PRIMARY KEY ("id")
);
