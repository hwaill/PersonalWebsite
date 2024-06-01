/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `HabitOccurence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Report_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "HabitOccurence_id_key" ON "HabitOccurence"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");
