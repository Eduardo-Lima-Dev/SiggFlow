-- CreateTable
CREATE TABLE "UserDisciplinaProgresso" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDisciplinaProgresso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDisciplinaProgresso_userId_disciplinaId_key" ON "UserDisciplinaProgresso"("userId", "disciplinaId");

-- AddForeignKey
ALTER TABLE "UserDisciplinaProgresso" ADD CONSTRAINT "UserDisciplinaProgresso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDisciplinaProgresso" ADD CONSTRAINT "UserDisciplinaProgresso_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
