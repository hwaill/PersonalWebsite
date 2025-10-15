/*
  Warnings:

  - You are about to drop the column `bookId` on the `BookClubRating` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `BookClubRating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `BookClubBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `BookClubMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookTitle` to the `BookClubRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberName` to the `BookClubRating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookClubRating" DROP CONSTRAINT "BookClubRating_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookClubRating" DROP CONSTRAINT "BookClubRating_memberId_fkey";

-- AlterTable
ALTER TABLE "BookClubRating" DROP COLUMN "bookId",
DROP COLUMN "memberId",
ADD COLUMN     "bookTitle" TEXT NOT NULL,
ADD COLUMN     "memberName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookClubBook_title_key" ON "BookClubBook"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BookClubMember_name_key" ON "BookClubMember"("name");

-- AddForeignKey
ALTER TABLE "BookClubRating" ADD CONSTRAINT "BookClubRating_memberName_fkey" FOREIGN KEY ("memberName") REFERENCES "BookClubMember"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookClubRating" ADD CONSTRAINT "BookClubRating_bookTitle_fkey" FOREIGN KEY ("bookTitle") REFERENCES "BookClubBook"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
