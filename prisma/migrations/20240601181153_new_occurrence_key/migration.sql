/*
  Warnings:

  - The primary key for the `HabitOccurence` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "HabitOccurence" DROP CONSTRAINT "HabitOccurence_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HabitOccurence_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HabitOccurence_id_seq";
