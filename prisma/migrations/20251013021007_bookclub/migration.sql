-- CreateEnum
CREATE TYPE "GenreType" AS ENUM ('FICTION', 'NONFICTION');

-- CreateTable
CREATE TABLE "BookClubBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" "GenreType" NOT NULL,

    CONSTRAINT "BookClubBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookClubMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BookClubMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookClubRating" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BookClubRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookClubBook_id_key" ON "BookClubBook"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookClubMember_id_key" ON "BookClubMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookClubRating_id_key" ON "BookClubRating"("id");

-- AddForeignKey
ALTER TABLE "BookClubRating" ADD CONSTRAINT "BookClubRating_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "BookClubMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookClubRating" ADD CONSTRAINT "BookClubRating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookClubBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
