/*
  Warnings:

  - The primary key for the `HabitDay` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `HabitDay` table. All the data in the column will be lost.
  - You are about to drop the column `dayId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Habit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date]` on the table `HabitDay` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `HabitDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HabitCategory" AS ENUM ('MORNING_ROUTINE', 'EVENING_ROUTINE', 'DAILY_GOALS', 'OTHER_GOALS');

-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_dayId_fkey";

-- DropIndex
DROP INDEX "HabitDay_id_key";

-- AlterTable
ALTER TABLE "HabitDay" DROP CONSTRAINT "HabitDay_pkey",
DROP COLUMN "id",
ADD COLUMN     "date" TEXT NOT NULL,
ADD CONSTRAINT "HabitDay_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "dayId",
ADD COLUMN     "date" TEXT NOT NULL;

-- DropTable
DROP TABLE "Habit";

-- CreateTable
CREATE TABLE "HabitOccurence" (
    "id" SERIAL NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "date" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "HabitOccurence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" "HabitCategory" NOT NULL,

    CONSTRAINT "HabitType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabitType_id_key" ON "HabitType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HabitDay_date_key" ON "HabitDay"("date");

-- AddForeignKey
ALTER TABLE "HabitOccurence" ADD CONSTRAINT "HabitOccurence_date_fkey" FOREIGN KEY ("date") REFERENCES "HabitDay"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitOccurence" ADD CONSTRAINT "HabitOccurence_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "HabitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_date_fkey" FOREIGN KEY ("date") REFERENCES "HabitDay"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
