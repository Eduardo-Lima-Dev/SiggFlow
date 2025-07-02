import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Mapeamento entre o enum do usuário e os códigos dos cursos no banco
const cursoMapping: Record<string, string> = {
  ENGENHARIA_SOFTWARE: 'ES',
  CIENCIA_COMPUTACAO: 'CC',
  SISTEMAS_INFORMACAO: 'SI',
  DESIGN_DIGITAL: 'DD',
  ENGENHARIA_COMPUTACAO: 'EC',
  REDES_COMPUTADORES: 'RC'
};

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  // Busca o curso do usuário
  const userCurso = session.user.curso;
  console.log('Curso do usuário:', userCurso);
  
  if (!userCurso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
  }

  // Busca o código do curso usando o mapeamento
  const codigoCurso = cursoMapping[userCurso];
  console.log('Código do curso buscado:', codigoCurso);
  
  if (!codigoCurso) {
    return NextResponse.json({ error: 'Curso não mapeado' }, { status: 400 });
  }
  
  const curso = await prisma.curso.findFirst({
    where: { codigo: codigoCurso },
    include: { curriculos: true },
  });
  
  console.log('Curso encontrado:', curso);
  
  if (!curso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
  }

  // Pega o currículo mais recente
  const curriculo = curso.curriculos.sort((a, b) => b.ano - a.ano)[0];
  if (!curriculo) {
    return NextResponse.json({ error: 'Currículo não encontrado' }, { status: 404 });
  }

  // Busca todas as disciplinas do currículo
  const disciplinas = await prisma.disciplina.findMany({
    where: { curriculoId: curriculo.id },
    orderBy: [{ semestre: 'asc' }, { nome: 'asc' }],
  });

  // Busca o progresso do usuário nessas disciplinas
  const userEmail = session.user.email as string;
  const progresso = await prisma.userDisciplinaProgresso.findMany({
    where: {
      user: { email: userEmail },
      disciplinaId: { in: disciplinas.map(d => d.id) },
    },
    select: {
      disciplinaId: true,
      status: true,
    },
  });
  const progressoMap = new Map(progresso.map(p => [p.disciplinaId, p.status]));

  // Separar disciplinas em completas e pendentes, agrupadas por semestre
  const completas: Record<number, any[]> = {};
  const pendentes: Record<number, any[]> = {};

  for (const disc of disciplinas) {
    const status = progressoMap.get(disc.id);
    if (status === 'CONCLUIDA') {
      if (!completas[disc.semestre]) completas[disc.semestre] = [];
      completas[disc.semestre].push(disc);
    } else {
      if (!pendentes[disc.semestre]) pendentes[disc.semestre] = [];
      pendentes[disc.semestre].push(disc);
    }
  }

  return NextResponse.json({
    curriculo: curriculo.nome,
    completas,
    pendentes
  });
} 