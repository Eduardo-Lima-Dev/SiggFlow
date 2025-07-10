import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

  const userCurso = session.user.curso;
  const anoIngresso = session.user.anoIngresso; 
  
  if (!userCurso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
  }

  if (typeof anoIngresso !== 'number' || isNaN(anoIngresso)) {
    return NextResponse.json({ error: 'Ano de ingresso não informado' }, { status: 400 });
  }

  const codigoCurso = cursoMapping[userCurso];

  if (!codigoCurso) {
    return NextResponse.json({ error: 'Curso não mapeado' }, { status: 400 });
  }
  
  const curso = await prisma.curso.findFirst({
    where: { codigo: codigoCurso },
    include: { curriculos: true },
  });
  
  if (!curso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
  }

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

  const disciplinasObrigatorias = await prisma.disciplina.findMany({
    where: { 
      curriculoId: curriculo.id,
      obrigatoria: true 
    },
    orderBy: [{ semestre: 'asc' }, { nome: 'asc' }],
  });

  const userEmail = session.user.email as string;
  
  const todasOptativas = await prisma.disciplina.findMany({
    where: {
      curriculoId: curriculo.id,
      obrigatoria: false
    }
  });

  const optativasAdicionadas = await prisma.userDisciplinaProgresso.findMany({
    where: {
      user: { email: userEmail },
      disciplinaId: { in: todasOptativas.map(d => d.id) }
    },
    include: {
      disciplina: true
    }
  });

  const disciplinas = [
    ...disciplinasObrigatorias,
    ...optativasAdicionadas.map(op => op.disciplina)
  ];

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

  const completas: Record<number, any[]> = {};
  const pendentes: Record<number, any[]> = {};

  for (const disc of disciplinas) {
    const status = progressoMap.get(disc.id) || 'PENDENTE';
    const discWithStatus = { ...disc, status };
    if (status === 'CONCLUIDA') {
      if (!completas[disc.semestre]) completas[disc.semestre] = [];
      completas[disc.semestre].push(discWithStatus);
    } else {
      if (!pendentes[disc.semestre]) pendentes[disc.semestre] = [];
      pendentes[disc.semestre].push(discWithStatus);
    }
  }
  
  const todosSemestres = new Set([
    ...Object.keys(completas).map(Number),
    ...Object.keys(pendentes).map(Number)
  ]);

  return NextResponse.json({
    curriculo: {
      nome: curriculo.nome,
      ano: curriculo.ano
    },
    completas,
    pendentes
  });
} 