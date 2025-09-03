import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id;
  let data;
  
  try {
    data = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { disciplinaId } = data;
  
  if (!disciplinaId) {
    return NextResponse.json({ error: 'ID da disciplina não fornecido' }, { status: 400 });
  }

  try {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: disciplinaId },
      select: { obrigatoria: true }
    });

    if (!disciplina) {
      return NextResponse.json({ error: 'Disciplina não encontrada' }, { status: 404 });
    }

    if (disciplina.obrigatoria) {
      return NextResponse.json({ error: 'Não é possível remover disciplinas obrigatórias' }, { status: 400 });
    }

    await prisma.userDisciplinaProgresso.deleteMany({
      where: {
        userId,
        disciplinaId
      }
    });

    return NextResponse.json({ message: 'Optativa removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover optativa:', error);
    return NextResponse.json({ error: 'Erro ao remover optativa' }, { status: 500 });
  }
}
