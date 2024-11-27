/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_driver_id_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "Ride";

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "driver" (
    "driver_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "minKm" INTEGER NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "ride" (
    "ride_id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("ride_id")
);

-- AddForeignKey
ALTER TABLE "ride" ADD CONSTRAINT "ride_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ride" ADD CONSTRAINT "ride_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;
