/*
  Warnings:

  - The primary key for the `Habit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Habit_pkey" PRIMARY KEY ("id");
