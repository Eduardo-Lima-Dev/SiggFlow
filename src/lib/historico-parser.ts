  /**
 * Parser para histórico escolar SIGAA (UFC).
 * Extrai disciplinas com status "APROVADO MÉDIA" do texto do PDF.
 */

export type DisciplinaExtraida = {
  codigo: string;
  nome: string;
  anoPeriodo: string; // ex: "2020.1"
  situacao: string;
  optativa: boolean; // * antes do código ou após ano/período
  cargaHoraria?: number; // CH extraída da tabela (ex: 64)
};

const SITUACOES_APROVADAS = [
  'APROVADO MÉDIA',
  'APROVADO POR NOTA',
  'APROVADO POR FREQUÊNCIA',
  'APROVADO POR FREQ',
  'APROVADO',
  'DISPENSADO',
];

/**
 * Verifica se a situação indica que a disciplina foi concluída com sucesso.
 * Também considera aprovado qualquer situação que comece com "APROVADO" (exceto REPROVADO).
 */
export function isSituacaoAprovada(situacao: string): boolean {
  const normalized = situacao.toUpperCase().trim();
  if (normalized === 'REPROVADO' || normalized.startsWith('REPROVADO')) return false;
  if (normalized.startsWith('APROVADO')) return true;
  return SITUACOES_APROVADAS.some(
    (s) => normalized.includes(s) || normalized === s.replace(' ', '_')
  );
}

/**
 * Converte ano/periodo (ex: 2020.1) para número do semestre no curso.
 * Ex: anoIngresso 2020, 2020.1 -> 1º semestre, 2020.2 -> 2º, 2021.1 -> 3º
 */
export function anoPeriodoParaSemestre(
  anoPeriodo: string,
  anoIngresso: number
): number {
  const match = anoPeriodo.match(/^(\d{4})\.(\d)$/);
  if (!match) return 1;
  const ano = parseInt(match[1], 10);
  const periodo = parseInt(match[2], 10); // 1 ou 2
  const semestresDesdeIngresso = (ano - anoIngresso) * 2 + periodo;
  return Math.max(1, semestresDesdeIngresso);
}

/**
 * Extrai disciplinas do texto do histórico escolar SIGAA.
 * Estrutura esperada: tabela "Componentes Curriculares Cursados/Cursando"
 * com colunas: Ano/Período, Código, Nome, CH, Turma, Freq%, Nota, Situação
 */
export function parseHistoricoTexto(texto: string): DisciplinaExtraida[] {
  const disciplinas: DisciplinaExtraida[] = [];
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // Regex para código de disciplina (formato QXD0001, QXD0056, etc.)
  const codigoRegex = /\b(QXD\d{4})\b/gi;
  // Regex para ano.periodo (ex: 2020.1, 2021.2)
  const periodoRegex = /\b(\d{4})\.(\d)\b/;
  // Situações possíveis (REPROVADO primeiro para não confundir com APROVADO)
  const situacaoRegex =
    /(REPROVADO|SUPRIMIDO|TRANCADO|APROVADO\s*MÉDIA|APROVADO\s*POR\s*NOTA|APROVADO\s*POR\s*FREQ|APROVADO|DISPENSADO)/gi;

  let periodoAtual = '';
  let periodoOptativo = false;

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];

    // Detecta novo período letivo; * ou • após ano/período indica optativas no bloco
    const periodoMatch = linha.match(periodoRegex);
    if (periodoMatch && linha.length < 30) {
      periodoAtual = `${periodoMatch[1]}.${periodoMatch[2]}`;
      periodoOptativo = /[\*•]/.test(linha);
    }

    // Procura código de disciplina na linha
    const codigoMatch = linha.match(codigoRegex);
    if (!codigoMatch) continue;

    const codigo = codigoMatch[0].toUpperCase();
    const idxCodigo = linha.toUpperCase().indexOf(codigo);
    const textoAntesDoCodigo = idxCodigo >= 0 ? linha.substring(0, idxCodigo) : '';
    const asteriscoAntesDoCodigo = /[\*•]/.test(textoAntesDoCodigo);
    const optativa = periodoOptativo || asteriscoAntesDoCodigo;

    // Extrai situação - pode estar na mesma linha ou próximo
    let situacao = '';
    const situacaoMatch = linha.match(situacaoRegex);
    if (situacaoMatch) {
      situacao = situacaoMatch[0].toUpperCase().replace(/\s+/g, ' ');
    } else {
      // Verifica próximas linhas (docente pode estar entre código e situação)
      for (let j = i + 1; j < Math.min(i + 4, linhas.length); j++) {
        const sitMatch = linhas[j].match(situacaoRegex);
        if (sitMatch) {
          situacao = sitMatch[0].toUpperCase().replace(/\s+/g, ' ');
          break;
        }
        if (linhas[j].match(codigoRegex)) break;
      }
    }

    if (!situacao) continue;

    // Extrai nome - texto entre código e padrões de CH/Turma/Freq/Nota
    let nome = '';
    const semDocente = linha
      .replace(/Docente\(s\):.*$/i, '')
      .replace(/\(\s*(Doutorado|Mestrado|Especialização)\s*\)/gi, '')
      .trim();
    const afterCodigo = semDocente
      .replace(codigoRegex, '')
      .replace(/^\s*[-–]\s*/, '')
      .trim();
    // Remove sufixo numérico (CH Turma Freq Nota Situação) - ex: "64.00 02 100.00 7.3 APROVADO MÉDIA"
    nome = afterCodigo
      .replace(/\s+\d+\.?\d*\s+\d{2}[A-Z]?\s+[\d.-]+\s+[\d.-]+\s+(?:APROVADO|REPROVADO|SUPRIMIDO|TRANCADO|DISPENSADO).*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (nome.length > 100) nome = nome.substring(0, 100);
    if (!nome) nome = codigo;

    // Extrai carga horária (padrão: 32.00, 64.00, 96.00 antes de Turma)
    const chMatch = linha.match(/(\d{2,3}(?:\.\d+)?)\s+\d{2}[A-Z]?\s+[\d.-]+/);
    const cargaHoraria = chMatch ? Math.round(parseFloat(chMatch[1])) : 64;

    disciplinas.push({
      codigo,
      nome: nome || codigo,
      anoPeriodo: periodoAtual || '0.0',
      situacao,
      optativa,
      cargaHoraria,
    });
  }

  // Remove duplicatas mantendo a última ocorrência (mais recente)
  const porCodigo = new Map<string, DisciplinaExtraida>();
  for (const d of disciplinas) {
    porCodigo.set(d.codigo.toUpperCase(), d);
  }
  return Array.from(porCodigo.values());
}
