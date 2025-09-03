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
  if (!nome || !codigo || !cargaHoraria || !status || !semestre) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }
  try {
    const { curso } = data;
    const cursoObj = await prisma.curso.findFirst({ 
      where: { codigo: curso },
      include: { curriculos: true }
    });
    if (!cursoObj) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
    }
    
    const anoIngresso = session.user.anoIngresso || 2024;
    const curriculosOrdenados = cursoObj.curriculos.sort((a, b) => a.ano - b.ano);
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
    
    let disciplina = await prisma.disciplina.findFirst({ 
      where: { 
        codigo,
        curriculoId: curriculo.id,
        obrigatoria: false
      } 
    });
    
    if (!disciplina) {
      disciplina = await prisma.disciplina.findFirst({ where: { codigo } });

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
            curriculoId: curriculo.id,
          },
        });
      } else {
        disciplina = await prisma.disciplina.update({
          where: { id: disciplina.id },
          data: {
            curriculoId: curriculo.id,
            cursoId: cursoObj.id,
            semestre: Number(semestre),
            obrigatoria: false, // Garante que seja marcada como optativa
          },
        });
      }
    } else {
      if (disciplina.semestre !== Number(semestre)) {
        disciplina = await prisma.disciplina.update({
          where: { id: disciplina.id },
          data: {
            semestre: Number(semestre),
            obrigatoria: false, // Garante que continue como optativa
          },
        });
      }
    }
    
    const progresso = await prisma.userDisciplinaProgresso.upsert({
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
    return NextResponse.json({ message: 'Optativa adicionada com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar optativa' }, { status: 500 });
  }
} 