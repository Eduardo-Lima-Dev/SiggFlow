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
    const cursoObj = await prisma.curso.findFirst({ 
      where: { codigo: curso },
      include: { curriculos: true }
    });
    if (!cursoObj) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 400 });
    }
    console.log('CursoId usado para optativa:', cursoObj.id);
    
    // Determinar o currículo correto baseado no ano de ingresso do usuário
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
    
    // Cria disciplina optativa se não existir
    let disciplina = await prisma.disciplina.findFirst({ 
      where: { 
        codigo,
        curriculoId: curriculo.id,
        obrigatoria: false
      } 
    });
    console.log('Disciplina existente encontrada no currículo:', disciplina);
    
    if (!disciplina) {
      // Se não encontrou no currículo, busca em qualquer lugar
      disciplina = await prisma.disciplina.findFirst({ where: { codigo } });
      console.log('Disciplina encontrada em qualquer lugar:', disciplina);
      
      if (!disciplina) {
        // Cria nova disciplina
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
        console.log('Disciplina optativa criada:', disciplina);
      } else {
        // Atualiza a disciplina existente para associar ao currículo correto e usar o semestre selecionado
        disciplina = await prisma.disciplina.update({
          where: { id: disciplina.id },
          data: {
            curriculoId: curriculo.id,
            cursoId: cursoObj.id,
            semestre: Number(semestre), // Usa o semestre selecionado pelo usuário
          },
        });
        console.log('Disciplina optativa atualizada para o currículo com semestre:', disciplina);
      }
    } else {
      // Se já existe no currículo, atualiza o semestre se for diferente
      if (disciplina.semestre !== Number(semestre)) {
        disciplina = await prisma.disciplina.update({
          where: { id: disciplina.id },
          data: {
            semestre: Number(semestre), // Usa o semestre selecionado pelo usuário
          },
        });
        console.log('Disciplina optativa atualizada com novo semestre:', disciplina);
      } else {
        console.log('Disciplina optativa já existia no currículo com semestre correto:', disciplina);
      }
    }
    
    console.log('Disciplina final para progresso:', disciplina);
    
    // Cria progresso do usuário para a disciplina
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
    console.log('Progresso criado/atualizado:', progresso);
    console.log('Progresso criado para userId:', userId, 'disciplinaId:', disciplina.id);
    return NextResponse.json({ message: 'Optativa adicionada com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar optativa' }, { status: 500 });
  }
} 