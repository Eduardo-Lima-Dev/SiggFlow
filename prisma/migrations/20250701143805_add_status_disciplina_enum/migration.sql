/*
  Warnings:

  - You are about to drop the column `concluida` on the `UserDisciplinaProgresso` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusDisciplina" AS ENUM ('CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE', 'REPROVADA');

-- AlterTable
ALTER TABLE "UserDisciplinaProgresso" DROP COLUMN "concluida",
ADD COLUMN     "status" "StatusDisciplina" NOT NULL DEFAULT 'PENDENTE';
