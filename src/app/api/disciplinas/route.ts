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

  // Busca todas as disciplinas obrigatórias do currículo
  const disciplinasObrigatorias = await prisma.disciplina.findMany({
    where: { 
      curriculoId: curriculo.id,
      obrigatoria: true 
    },
    orderBy: [{ semestre: 'asc' }, { nome: 'asc' }],
  });

  // Busca as optativas que o usuário adicionou ao seu progresso
  const userEmail = session.user.email as string;
  console.log('Buscando optativas para usuário:', userEmail);
  console.log('Currículo ID:', curriculo.id);
  
  // Primeiro, busca todas as optativas do currículo
  const todasOptativas = await prisma.disciplina.findMany({
    where: {
      curriculoId: curriculo.id,
      obrigatoria: false
    }
  });
  console.log('Todas as optativas do currículo:', todasOptativas);
  
  // Depois, busca o progresso do usuário nessas optativas
  const optativasAdicionadas = await prisma.userDisciplinaProgresso.findMany({
    where: {
      user: { email: userEmail },
      disciplinaId: { in: todasOptativas.map(d => d.id) }
    },
    include: {
      disciplina: true
    }
  });
  
  console.log('Optativas encontradas:', optativasAdicionadas.length);
  console.log('Detalhes das optativas:', optativasAdicionadas);

  // Combina obrigatórias com optativas adicionadas
  const disciplinas = [
    ...disciplinasObrigatorias,
    ...optativasAdicionadas.map(op => op.disciplina)
  ];
  
  console.log('Total de disciplinas (obrigatórias + optativas):', disciplinas.length);
  console.log('Disciplinas obrigatórias:', disciplinasObrigatorias.length);
  console.log('Optativas adicionadas:', optativasAdicionadas.length);

  // Busca o progresso do usuário nessas disciplinas
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
    console.log('Processando disciplina:', disc.nome, 'semestre:', disc.semestre, 'status:', progressoMap.get(disc.id) || 'PENDENTE');
    const status = progressoMap.get(disc.id) || 'PENDENTE';
    const discWithStatus = { ...disc, status };
    // Mostra todas as disciplinas (obrigatórias e optativas)
    if (status === 'CONCLUIDA') {
      if (!completas[disc.semestre]) completas[disc.semestre] = [];
      completas[disc.semestre].push(discWithStatus);
      console.log('Adicionada às completas do semestre', disc.semestre);
    } else {
      if (!pendentes[disc.semestre]) pendentes[disc.semestre] = [];
      pendentes[disc.semestre].push(discWithStatus);
      console.log('Adicionada às pendentes do semestre', disc.semestre);
    }
  }

  console.log('Dashboard disciplinas completas:', completas);
  console.log('Dashboard disciplinas pendentes:', pendentes);
  
  // Log adicional para verificar os semestres
  const todosSemestres = new Set([
    ...Object.keys(completas).map(Number),
    ...Object.keys(pendentes).map(Number)
  ]);
  console.log('Todos os semestres encontrados:', Array.from(todosSemestres).sort((a, b) => a - b));

  return NextResponse.json({
    curriculo: {
      nome: curriculo.nome,
      ano: curriculo.ano
    },
    completas,
    pendentes
  });
} 