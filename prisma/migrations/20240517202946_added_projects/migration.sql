/*
  Warnings:

  - Added the required column `name` to the `ProjectSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectSection" ADD COLUMN     "name" TEXT NOT NULL;
