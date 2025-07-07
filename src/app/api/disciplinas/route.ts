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
  const anoIngresso = session.user.anoIngresso;
  console.log('Curso do usuário:', userCurso);
  console.log('Ano de ingresso:', anoIngresso);
  
  if (!userCurso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
  }

  if (typeof anoIngresso !== 'number' || isNaN(anoIngresso)) {
    return NextResponse.json({ error: 'Ano de ingresso não informado' }, { status: 400 });
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

  // Seleciona o currículo correto baseado no ano de ingresso
  // Ordena currículos por ano ascendente
  const curriculosOrdenados = curso.curriculos.sort((a, b) => a.ano - b.ano);
  let curriculo = null;
  if (curriculosOrdenados.length === 1) {
    curriculo = curriculosOrdenados[0];
  } else {
    for (let i = 0; i < curriculosOrdenados.length; i++) {
      const atual = curriculosOrdenados[i];
      const proximo = curriculosOrdenados[i + 1];
      if (anoIngresso >= atual.ano && (!proximo || anoIngresso < proximo.ano)) {
        curriculo = atual;
        break;
      }
    }
  }
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
    const status = progressoMap.get(disc.id) || 'PENDENTE';
    const discWithStatus = { ...disc, status };
    // Mostra todas as obrigatórias e as optativas do usuário
    if (disc.obrigatoria || progressoMap.has(disc.id)) {
      if (status === 'CONCLUIDA') {
        if (!completas[disc.semestre]) completas[disc.semestre] = [];
        completas[disc.semestre].push(discWithStatus);
      } else {
        if (!pendentes[disc.semestre]) pendentes[disc.semestre] = [];
        pendentes[disc.semestre].push(discWithStatus);
      }
    }
  }

  console.log('Dashboard disciplinas completas:', completas);
  console.log('Dashboard disciplinas pendentes:', pendentes);

  return NextResponse.json({
    curriculo: {
      nome: curriculo.nome,
      ano: curriculo.ano
    },
    completas,
    pendentes
  });
} 