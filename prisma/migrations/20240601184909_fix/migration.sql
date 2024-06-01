/*
  Warnings:

  - The values [MORNING_MOOD,EVENING_MOOD,ENERGY_REPORT,SLEEP_REPORT,PRODUCTIVITY_REPORT] on the enum `ReportType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportType_new" AS ENUM ('MORNING_MOOD', 'EVENING_MOOD', 'ENERGY_REPORT', 'SLEEP_REPORT', 'PRODUCTIVITY_REPORT');
ALTER TABLE "Report" ALTER COLUMN "type" TYPE "ReportType_new" USING ("type"::text::"ReportType_new");
ALTER TYPE "ReportType" RENAME TO "ReportType_old";
ALTER TYPE "ReportType_new" RENAME TO "ReportType";
DROP TYPE "ReportType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Report_pkey" PRIMARY KEY ("id");
