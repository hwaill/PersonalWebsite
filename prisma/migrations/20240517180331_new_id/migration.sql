/*
  Warnings:

  - The primary key for the `HabitDay` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HabitDay` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `dayId` on the `Habit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_dayId_fkey";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "dayId",
ADD COLUMN     "dayId" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HabitDay" DROP CONSTRAINT "HabitDay_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "HabitDay_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "HabitDay_id_key" ON "HabitDay"("id");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "HabitDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
