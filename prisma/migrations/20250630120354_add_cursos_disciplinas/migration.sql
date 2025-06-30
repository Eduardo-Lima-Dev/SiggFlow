/*
  Warnings:

  - You are about to drop the column `semestre` on the `users` table. All the data in the column will be lost.
  - Changed the type of `curso` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CursoEnum" AS ENUM ('CIENCIA_COMPUTACAO', 'DESIGN_DIGITAL', 'ENGENHARIA_COMPUTACAO', 'ENGENHARIA_SOFTWARE', 'REDES_COMPUTADORES', 'SISTEMAS_INFORMACAO');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "semestre",
DROP COLUMN "curso",
ADD COLUMN     "curso" "CursoEnum" NOT NULL;

-- DropEnum
DROP TYPE "Curso";

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL,
    "obrigatoria" BOOLEAN NOT NULL,
    "cursoId" TEXT NOT NULL,
    "preRequisitos" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codigo_key" ON "Curso"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_codigo_key" ON "Disciplina"("codigo");

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
