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
  let data;
  try {
    data = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  const { nome, codigo, cargaHoraria, status, semestre } = data;
  console.log('Recebido para optativa:', { nome, codigo, cargaHoraria, status, semestre });
  if (!nome || !codigo || !cargaHoraria || !status || !semestre) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }
  try {
    // Buscar o curso pelo campo recebido do body
    const { curso } = data;
    const cursoObj = await prisma.curso.findFirst({ where: { codigo: curso } });
    if (!cursoObj) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
    }
    console.log('CursoId usado para optativa:', cursoObj.id);
    // Cria disciplina optativa se não existir
    let disciplina = await prisma.disciplina.findFirst({ where: { codigo } });
    if (!disciplina) {
      disciplina = await prisma.disciplina.create({
        data: {
          nome,
          codigo,
          cargaHoraria: Number(cargaHoraria),
          semestre: Number(semestre),
          obrigatoria: false,
          preRequisitos: '',
          cursoId: cursoObj.id,
        },
      });
      console.log('Disciplina optativa criada:', disciplina);
    } else {
      console.log('Disciplina optativa já existia:', disciplina);
    }
    // Cria progresso do usuário para a disciplina
    await prisma.userDisciplinaProgresso.upsert({
      where: {
        userId_disciplinaId: {
          userId,
          disciplinaId: disciplina.id,
        },
      },
      update: {
        status,
        semestre: Number(semestre),
      },
      create: {
        userId,
        disciplinaId: disciplina.id,
        status,
        semestre: Number(semestre),
      },
    });
    console.log('Progresso criado para userId:', userId, 'disciplinaId:', disciplina.id);
    return NextResponse.json({ message: 'Optativa adicionada com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar optativa' }, { status: 500 });
  }
} 