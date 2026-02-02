import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  parseHistoricoTexto,
  isSituacaoAprovada,
  anoPeriodoParaSemestre,
} from '@/lib/historico-parser';

const cursoMapping: Record<string, string> = {
  ENGENHARIA_SOFTWARE: 'ES',
  CIENCIA_COMPUTACAO: 'CC',
  SISTEMAS_INFORMACAO: 'SI',
  DESIGN_DIGITAL: 'DD',
  ENGENHARIA_COMPUTACAO: 'EC',
  REDES_COMPUTADORES: 'RC',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id;
  const userCurso = session.user.curso;
  const anoIngresso = session.user.anoIngresso ?? 2020;

  if (!userCurso || !cursoMapping[userCurso]) {
    return NextResponse.json(
      { error: 'Curso não configurado para o usuário' },
      { status: 400 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Requisição inválida' },
      { status: 400 }
    );
  }

  const file = formData.get('file') as File | null;
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'Nenhum arquivo enviado. Selecione um PDF.' },
      { status: 400 }
    );
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json(
      { error: 'Formato inválido. Envie apenas arquivos PDF.' },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'Arquivo muito grande. Máximo 10MB.' },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const { getPath } = await import('pdf-parse/worker');
    const { PDFParse } = await import('pdf-parse');
    PDFParse.setWorker(getPath());

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();

    const texto = result?.text ?? '';
    if (!texto.trim()) {
      return NextResponse.json(
        { error: 'Não foi possível extrair texto do PDF. Verifique se o arquivo é um histórico escolar válido.' },
        { status: 400 }
      );
    }

    const disciplinasExtraidas = parseHistoricoTexto(texto);
    const aprovadas = disciplinasExtraidas.filter((d) =>
      isSituacaoAprovada(d.situacao)
    );

    if (aprovadas.length === 0) {
      return NextResponse.json({
        message: 'Nenhuma disciplina aprovada encontrada no histórico.',
        importadas: 0,
        naoEncontradas: [],
        erros: [],
      });
    }

    const codigoCurso = cursoMapping[userCurso];
    const curso = await prisma.curso.findFirst({
      where: { codigo: codigoCurso },
      include: { curriculos: true },
    });

    if (!curso) {
      return NextResponse.json(
        { error: 'Currículo do curso não encontrado' },
        { status: 404 }
      );
    }

    const curriculosOrdenados = curso.curriculos.sort((a, b) => a.ano - b.ano);
    let curriculo = curriculosOrdenados[0];
    if (curriculosOrdenados.length > 1) {
      for (let i = 0; i < curriculosOrdenados.length; i++) {
        const atual = curriculosOrdenados[i];
        const proximo = curriculosOrdenados[i + 1];
        if (
          anoIngresso >= atual.ano &&
          (!proximo || anoIngresso < proximo.ano)
        ) {
          curriculo = atual;
          break;
        }
      }
    }

    const disciplinasObrigatorias = await prisma.disciplina.findMany({
      where: {
        curriculoId: curriculo.id,
        obrigatoria: true,
      },
    });

    const todasOptativas = await prisma.disciplina.findMany({
      where: {
        curriculoId: curriculo.id,
        obrigatoria: false,
      },
    });

    const optativasAdicionadas = await prisma.userDisciplinaProgresso.findMany({
      where: {
        userId,
        disciplina: {
          curriculoId: curriculo.id,
          obrigatoria: false,
        },
      },
      include: { disciplina: true },
    });

    const disciplinasCurriculo = [
      ...disciplinasObrigatorias,
      ...optativasAdicionadas.map((op) => op.disciplina),
    ];
    const mapaCodigoParaDisciplina = new Map(
      disciplinasCurriculo.map((d) => [d.codigo.toUpperCase(), d])
    );
    const mapaOptativasPorCodigo = new Map(
      todasOptativas.map((d) => [d.codigo.toUpperCase(), d])
    );

    const updates: Array<{
      disciplinaId: string;
      semestre: number;
      status: 'CONCLUIDA';
    }> = [];
    const naoEncontradas: string[] = [];
    const erros: string[] = [];

    for (const disc of aprovadas) {
      const codigoUpper = disc.codigo.toUpperCase();
      let disciplina = mapaCodigoParaDisciplina.get(codigoUpper);

      const ehOptativaConhecida = mapaOptativasPorCodigo.has(codigoUpper);
      const tratarComoOptativa = disc.optativa || ehOptativaConhecida;

      if (!disciplina && tratarComoOptativa) {
        let optativa = mapaOptativasPorCodigo.get(codigoUpper);
        if (!optativa) {
          const existing = await prisma.disciplina.findFirst({ where: { codigo: codigoUpper } });
          if (existing) {
            optativa = await prisma.disciplina.update({
              where: { id: existing.id },
              data: {
                curriculoId: curriculo.id,
                cursoId: curso.id,
                semestre: anoPeriodoParaSemestre(disc.anoPeriodo, anoIngresso),
                obrigatoria: false,
              },
            });
          } else {
            optativa = await prisma.disciplina.create({
              data: {
                nome: disc.nome,
                codigo: codigoUpper,
                cargaHoraria: disc.cargaHoraria ?? 64,
                semestre: anoPeriodoParaSemestre(disc.anoPeriodo, anoIngresso),
                obrigatoria: false,
                preRequisitos: '',
                cursoId: curso.id,
                curriculoId: curriculo.id,
              },
            });
          }
          disciplina = optativa;
        } else {
          disciplina = optativa;
        }
      }

      if (!disciplina) {
        naoEncontradas.push(`${disc.codigo} - ${disc.nome}`);
        continue;
      }

      const semestre = disciplina.obrigatoria || ehOptativaConhecida
        ? disciplina.semestre
        : anoPeriodoParaSemestre(disc.anoPeriodo, anoIngresso);

      updates.push({
        disciplinaId: disciplina.id,
        semestre,
        status: 'CONCLUIDA',
      });
    }

    if (updates.length === 0) {
      return NextResponse.json({
        message:
          'Nenhuma disciplina do histórico corresponde ao seu currículo. Verifique se o PDF é do mesmo curso.',
        importadas: 0,
        naoEncontradas,
        erros,
      });
    }

    await Promise.all(
      updates.map((u) =>
        prisma.userDisciplinaProgresso.upsert({
          where: {
            userId_disciplinaId: {
              userId,
              disciplinaId: u.disciplinaId,
            },
          },
          update: {
            status: 'CONCLUIDA',
            semestre: u.semestre,
          },
          create: {
            userId,
            disciplinaId: u.disciplinaId,
            semestre: u.semestre,
            status: 'CONCLUIDA',
          },
        })
      )
    );

    await prisma.user.update({
      where: { id: userId },
      data: { completedOnboarding: true },
    });

    return NextResponse.json({
      message: `${updates.length} disciplina(s) marcada(s) como concluída(s) com sucesso!`,
      importadas: updates.length,
      naoEncontradas: naoEncontradas.slice(0, 20),
      totalNaoEncontradas: naoEncontradas.length,
      erros,
    });
  } catch (error) {
    console.error('Erro ao processar histórico:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao processar o PDF. Tente novamente.',
      },
      { status: 500 }
    );
  }
}
