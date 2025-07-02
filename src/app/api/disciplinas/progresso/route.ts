import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id;
  console.log('userId recebido na sessão:', userId);
  let data;
  try {
    data = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
  }

  // data: [{ disciplinaId, semestre, status }]
  try {
    const upserts = await Promise.all(
      data.map(async ({ disciplinaId, semestre, status }) => {
        return prisma.userDisciplinaProgresso.upsert({
          where: {
            userId_disciplinaId: {
              userId,
              disciplinaId,
            },
          },
          update: {
            status,
            semestre: Number(semestre),
          },
          create: {
            userId,
            disciplinaId,
            semestre: Number(semestre),
            status,
          },
        });
      })
    );
    // Marca o usuário como onboarding concluído
    await prisma.user.update({ where: { id: userId }, data: { completedOnboarding: true } });
    return NextResponse.json({ message: 'Progresso salvo com sucesso', progresso: upserts });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    return NextResponse.json({ error: 'Erro ao salvar progresso' }, { status: 500 });
  }
} 