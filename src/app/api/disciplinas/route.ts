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

  // Busca as disciplinas do currículo, agrupadas por semestre
  const disciplinas = await prisma.disciplina.findMany({
    where: { curriculoId: curriculo.id },
    orderBy: [{ semestre: 'asc' }, { nome: 'asc' }],
  });

  // Agrupa por semestre
  const agrupadas = disciplinas.reduce((acc, disc) => {
    if (!acc[disc.semestre]) acc[disc.semestre] = [];
    acc[disc.semestre].push(disc);
    return acc;
  }, {} as Record<number, typeof disciplinas>);

  return NextResponse.json({ curriculo: curriculo.nome, disciplinas: agrupadas });
} 