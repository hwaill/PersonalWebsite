-- CreateTable
CREATE TABLE "ProjectSection" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "imgStyle" TEXT,
    "logoUrl" TEXT NOT NULL,
    "logoStyle" TEXT,
    "description" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,

    CONSTRAINT "ProjectSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSection_id_key" ON "ProjectSection"("id");
