-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('NORMAL_DAY', 'WORK_DAY', 'OUT_OF_TOWN');

-- AlterTable
ALTER TABLE "HabitDay" ADD COLUMN     "type" "DayType" NOT NULL DEFAULT 'NORMAL_DAY';
