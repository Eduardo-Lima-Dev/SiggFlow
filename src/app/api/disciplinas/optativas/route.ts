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
  
  if (!userCurso) {
    return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
  }

  if (typeof anoIngresso !== 'number' || isNaN(anoIngresso)) {
    return NextResponse.json({ error: 'Ano de ingresso não informado' }, { status: 400 });
  }

  // Busca o código do curso usando o mapeamento
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

  // Seleciona o currículo correto baseado no ano de ingresso
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

  // Busca todas as disciplinas optativas do currículo
  const optativas = await prisma.disciplina.findMany({
    where: { 
      curriculoId: curriculo.id,
      obrigatoria: false 
    },
    orderBy: [{ nome: 'asc' }],
  });

  // Busca o progresso do usuário nessas optativas
  const userEmail = session.user.email as string;
  const progresso = await prisma.userDisciplinaProgresso.findMany({
    where: {
      user: { email: userEmail },
      disciplinaId: { in: optativas.map(d => d.id) },
    },
    select: {
      disciplinaId: true,
      status: true,
      semestre: true,
    },
  });
  const progressoMap = new Map(progresso.map(p => [p.disciplinaId, { status: p.status, semestre: p.semestre }]));

  // Adiciona informações de progresso às optativas
  const optativasComProgresso = optativas.map(opt => {
    const progresso = progressoMap.get(opt.id);
    return {
      ...opt,
      status: progresso?.status || 'PENDENTE',
      semestreUsuario: progresso?.semestre || null,
      adicionada: progresso !== undefined
    };
  });

  return NextResponse.json({
    optativas: optativasComProgresso
  });
} 