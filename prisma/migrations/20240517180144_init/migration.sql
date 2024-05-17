-- CreateTable
CREATE TABLE "HabitDay" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "HabitDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "name" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabitDay_id_key" ON "HabitDay"("id");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "HabitDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
