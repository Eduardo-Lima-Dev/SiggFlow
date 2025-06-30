-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "curriculoId" TEXT;

-- CreateTable
CREATE TABLE "Curriculo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "cursoId" TEXT NOT NULL,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptativasCurriculo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OptativasCurriculo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OptativasCurriculo_B_index" ON "_OptativasCurriculo"("B");

-- AddForeignKey
ALTER TABLE "Curriculo" ADD CONSTRAINT "Curriculo_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "Curriculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptativasCurriculo" ADD CONSTRAINT "_OptativasCurriculo_A_fkey" FOREIGN KEY ("A") REFERENCES "Curriculo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptativasCurriculo" ADD CONSTRAINT "_OptativasCurriculo_B_fkey" FOREIGN KEY ("B") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;
