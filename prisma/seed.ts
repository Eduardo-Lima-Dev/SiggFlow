import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Limpa o banco antes de popular
  await prisma.userDisciplinaProgresso.deleteMany();
  await prisma.disciplina.deleteMany();
  await prisma.curriculo.deleteMany();
  await prisma.curso.deleteMany();

  // Cria o curso de Design Digital
  const cursoDD = await prisma.curso.create({
    data: {
      nome: "Design Digital",
      codigo: "DD"
    }
  });

  // Cria o currículo 2024.1 de Design Digital
  const curriculoDD2024 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2024.1",
      ano: 2024,
      curso: { connect: { id: cursoDD.id } },
    }
  });

  // Disciplinas obrigatórias do currículo DD 2024.1
  const obrigatoriasDD2024 = [
    // 1º Semestre
    { nome: "DESENHO I", codigo: "QXD0121", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "HISTÓRIA DA ARTE", codigo: "QXD0122", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "MULTIMÍDIA", codigo: "QXD0124", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "INTRODUÇÃO À PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0125", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0001", curriculoId: curriculoDD2024.id },
    { nome: "PSICOLOGIA E PERCEPÇÃO", codigo: "QXD0126", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    // 2º Semestre
    { nome: "COMUNICAÇÃO VISUAL I", codigo: "QXD0127", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "DESENHO II", codigo: "QXD0128", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0121", curriculoId: curriculoDD2024.id },
    { nome: "PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0129", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2024.id },
    { nome: "HISTÓRIA DO DESIGN", codigo: "QXD0130", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0122", curriculoId: curriculoDD2024.id },
    { nome: "EDIÇÃO DIGITAL DE IMAGENS", codigo: "QXD0501", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    // 3º Semestre
    { nome: "SEMIÓTICA", codigo: "QXD0161", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "SOCIEDADE, CULTURA E TECNOLOGIAS", codigo: "QXD0162", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0256", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "MODELAGEM TRIDIMENSIONAL", codigo: "QXD0503", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0128", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO INTEGRADO I", codigo: "QXD0504", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0256,QXD0161", curriculoId: curriculoDD2024.id },
    // 4º Semestre
    { nome: "COMUNICAÇÃO VISUAL II", codigo: "QXD0163", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2024.id },
    { nome: "LINGUAGENS DE MARCAÇÃO E SCRIPTS", codigo: "QXD0164", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2024.id },
    { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0505", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0256", curriculoId: curriculoDD2024.id },
    { nome: "DIREÇÃO DE ARTE", codigo: "QXD0506", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO INTEGRADO II", codigo: "QXD0507", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0504,QXD0164,QXD0506", curriculoId: curriculoDD2024.id },
    // 5º Semestre
    { nome: "TIPOGRAFIA", codigo: "QXD0191", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "PROCESSOS DE CRIAÇÃO", codigo: "QXD0192", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO DE INTERFACES WEB", codigo: "QXD0193", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2024.id },
    { nome: "ÉTICA E LEGISLAÇÃO", codigo: "QXD0508", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO INTEGRADO III", codigo: "QXD0509", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0507", curriculoId: curriculoDD2024.id },
    // 6º Semestre
    { nome: "DESIGN E INOVAÇÃO", codigo: "QXD0195", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0192", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO DE INTERFACES PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0197", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164,QXD0102", curriculoId: curriculoDD2024.id },
    { nome: "CONCEPÇÃO E DESENVOLVIMENTO DE PRODUTOS", codigo: "QXD0198", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0510", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0255", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO INTEGRADO IV", codigo: "QXD0511", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0509", curriculoId: curriculoDD2024.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0213", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "PROJETO TÉCNICO-CIENTÍFICO EM DESIGN DIGITAL", codigo: "QXD0215", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0511", curriculoId: curriculoDD2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0216", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0215", curriculoId: curriculoDD2024.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "DIGQ0002", cargaHoraria: 128, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "UNIDADE CURRICULAR ESPECIAL DE EXTENSÃO", codigo: "EXT0512", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0217", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0216", curriculoId: curriculoDD2024.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasDD2024 });

  // Disciplinas optativas do currículo DD 2024.1 (8º semestre)
  const optativasDD2024 = [
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2024.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0056", curriculoId: curriculoDD2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2024.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0035", curriculoId: curriculoDD2024.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2024.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0193", curriculoId: curriculoDD2024.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "ARQUITETURA DA INFORMAÇÃO", codigo: "QXD0199", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "DESIGN DE SISTEMAS COLABORATIVOS", codigo: "QXD0200", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "ENGENHARIA SEMIÓTICA", codigo: "QXD0201", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0256", curriculoId: curriculoDD2024.id },
    { nome: "ERGONOMIA", codigo: "QXD0202", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "FOTOGRAFIA", codigo: "QXD0203", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "CINEMA E ANIMAÇÃO", codigo: "QXD0204", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "JOGOS ELETRÔNICOS", codigo: "QXD0205", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2024.id },
    { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "PROTOTIPAÇÃO RÁPIDA", codigo: "QXD0208", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "REALIDADE VIRTUAL", codigo: "QXD0209", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0503", curriculoId: curriculoDD2024.id },
    { nome: "SOCIOLOGIA E ANTROPOLOGIA", codigo: "QXD0210", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "USER EXPERIENCE (UX)", codigo: "QXD0211", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0256", curriculoId: curriculoDD2024.id },
    { nome: "SEMINÁRIOS", codigo: "QXD0212", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "TÓPICOS ESPECIAIS EM ARTES", codigo: "QXD0222", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "TÓPICOS ESPECIAIS EM DESIGN", codigo: "QXD0223", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "TÓPICOS ESPECIAIS EM COMUNICAÇÃO", codigo: "QXD0224", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "TÓPICOS ESPECIAIS EM TECNOLOGIA DE INFORMAÇÃO E COMUNICAÇÃO", codigo: "QXD0225", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0252", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2024.id },
  ];
  await prisma.disciplina.createMany({ data: optativasDD2024 });

  console.log("Curso DD, currículo 2024.1 e disciplinas criados!");

  // Cria o currículo 2018.2 de Design Digital
  const curriculoDD2018 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2018.2",
      ano: 2018,
      curso: { connect: { id: cursoDD.id } },
    }
  });

  // Disciplinas obrigatórias do currículo DD 2018.2
  const obrigatoriasDD2018 = [
    // 1º Semestre
    { nome: "DESENHO I", codigo: "QXD0121", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "HISTÓRIA DA ARTE", codigo: "QXD0122", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "EDIÇÃO DIGITAL DE IMAGENS", codigo: "QXD0123", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0501", curriculoId: curriculoDD2018.id },
    { nome: "MULTIMÍDIA", codigo: "QXD0124", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "INTRODUÇÃO À PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0125", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0001", curriculoId: curriculoDD2018.id },
    // 2º Semestre
    { nome: "PSICOLOGIA E PERCEPÇÃO", codigo: "QXD0126", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "COMUNICAÇÃO VISUAL I", codigo: "QXD0127", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "DESENHO II", codigo: "QXD0128", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0121", curriculoId: curriculoDD2018.id },
    { nome: "PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0129", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2018.id },
    { nome: "HISTÓRIA DO DESIGN", codigo: "QXD0130", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0122", curriculoId: curriculoDD2018.id },
    // 3º Semestre
    { nome: "MODELAGEM TRIDIMENSIONAL", codigo: "QXD0159", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0128", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO INTEGRADO I", codigo: "QXD0160", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0504", curriculoId: curriculoDD2018.id },
    { nome: "SEMIÓTICA", codigo: "QXD0161", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "SOCIEDADE, CULTURA E TECNOLOGIAS", codigo: "QXD0162", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0221", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 4º Semestre
    { nome: "COMUNICAÇÃO VISUAL II", codigo: "QXD0163", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2018.id },
    { nome: "LINGUAGENS DE MARCAÇÃO E SCRIPTS", codigo: "QXD0164", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO INTEGRADO II", codigo: "QXD0165", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0160", curriculoId: curriculoDD2018.id },
    { nome: "DIREÇÃO DE ARTE", codigo: "QXD0166", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2018.id },
    { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0189", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0221", curriculoId: curriculoDD2018.id },
    // 5º Semestre
    { nome: "PROJETO INTEGRADO III", codigo: "QXD0190", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0165", curriculoId: curriculoDD2018.id },
    { nome: "TIPOGRAFIA", codigo: "QXD0191", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "PROCESSOS DE CRIAÇÃO", codigo: "QXD0192", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO DE INTERFACES WEB", codigo: "QXD0193", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2018.id },
    { nome: "ÉTICA E LEGISLAÇÃO", codigo: "QXD0194", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 6º Semestre
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "DESIGN E INOVAÇÃO", codigo: "QXD0195", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0192", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO INTEGRADO IV", codigo: "QXD0196", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0190", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO DE INTERFACES PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0197", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2018.id },
    { nome: "CONCEPÇÃO E DESENVOLVIMENTO DE PRODUTOS", codigo: "QXD0198", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0213", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "PROJETO TÉCNICO-CIENTÍFICO EM DESIGN DIGITAL", codigo: "QXD0215", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0196", curriculoId: curriculoDD2018.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0216", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0215", curriculoId: curriculoDD2018.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "DIGQ0001", cargaHoraria: 192, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0217", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0216", curriculoId: curriculoDD2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasDD2018 });

  // Disciplinas optativas do currículo DD 2018.2 (8º semestre)
  const optativasDD2018 = [
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2018.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0056", curriculoId: curriculoDD2018.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0019", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0035", curriculoId: curriculoDD2018.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0193", curriculoId: curriculoDD2018.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "ARQUITETURA DA INFORMAÇÃO", codigo: "QXD0199", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "DESIGN DE SISTEMAS COLABORATIVOS", codigo: "QXD0200", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "ENGENHARIA SEMIÓTICA", codigo: "QXD0201", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0221", curriculoId: curriculoDD2018.id },
    { nome: "ERGONOMIA", codigo: "QXD0202", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "FOTOGRAFIA", codigo: "QXD0203", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "CINEMA E ANIMAÇÃO", codigo: "QXD0204", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "JOGOS ELETRÔNICOS", codigo: "QXD0205", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "PRÁTICAS EM DESIGN I", codigo: "QXD0207", cargaHoraria: 160, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0193", curriculoId: curriculoDD2018.id },
    { nome: "PROTOTIPAÇÃO RÁPIDA", codigo: "QXD0208", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "REALIDADE VIRTUAL", codigo: "QXD0209", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0159", curriculoId: curriculoDD2018.id },
    { nome: "SOCIOLOGIA E ANTROPOLOGIA", codigo: "QXD0210", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "USER EXPERIENCE (UX)", codigo: "QXD0211", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0221", curriculoId: curriculoDD2018.id },
    { nome: "SEMINÁRIOS", codigo: "QXD0212", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "TÓPICOS ESPECIAIS EM ARTES", codigo: "QXD0222", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "TÓPICOS ESPECIAIS EM DESIGN", codigo: "QXD0223", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "TÓPICOS ESPECIAIS EM COMUNICAÇÃO", codigo: "QXD0224", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "TÓPICOS ESPECIAIS EM TECNOLOGIA DE INFORMAÇÃO E COMUNICAÇÃO", codigo: "QXD0225", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
  ];
  await prisma.disciplina.createMany({ data: optativasDD2018 });

  console.log("Curso DD, currículo 2018.2 e disciplinas criados!");

  // Cria o currículo 2015.1 de Design Digital
  const curriculoDD2015 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2015.1",
      ano: 2015,
      curso: { connect: { id: cursoDD.id } },
    }
  });

  // Disciplinas obrigatórias do currículo DD 2015.1
  const obrigatoriasDD2015 = [
    // 1º Semestre
    { nome: "DESENHO I", codigo: "QXD0121", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "HISTÓRIA DA ARTE", codigo: "QXD0122", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "EDIÇÃO DIGITAL DE IMAGENS", codigo: "QXD0123", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "MULTIMÍDIA", codigo: "QXD0124", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "INTRODUÇÃO À PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0125", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0001", curriculoId: curriculoDD2015.id },
    // 2º Semestre
    { nome: "PSICOLOGIA E PERCEPÇÃO", codigo: "QXD0126", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "COMUNICAÇÃO VISUAL I", codigo: "QXD0127", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "DESENHO II", codigo: "QXD0128", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0121", curriculoId: curriculoDD2015.id },
    { nome: "PROGRAMAÇÃO PARA DESIGN", codigo: "QXD0129", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2015.id },
    { nome: "HISTÓRIA DO DESIGN", codigo: "QXD0130", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0122", curriculoId: curriculoDD2015.id },
    // 3º Semestre
    { nome: "INTERFACE HUMANO-COMPUTADOR", codigo: "QXD0038", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "MODELAGEM TRIDIMENSIONAL", codigo: "QXD0159", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0128", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO INTEGRADO I", codigo: "QXD0160", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "SEMIÓTICA", codigo: "QXD0161", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "SOCIEDADE, CULTURA E TECNOLOGIAS", codigo: "QXD0162", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    // 4º Semestre
    { nome: "COMUNICAÇÃO VISUAL II", codigo: "QXD0163", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2015.id },
    { nome: "LINGUAGENS DE MARCAÇÃO E SCRIPTS", codigo: "QXD0164", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO INTEGRADO II", codigo: "QXD0165", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0160", curriculoId: curriculoDD2015.id },
    { nome: "DIREÇÃO DE ARTE", codigo: "QXD0166", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2015.id },
    { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0189", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0038", curriculoId: curriculoDD2015.id },
    // 5º Semestre
    { nome: "PROJETO INTEGRADO III", codigo: "QXD0190", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0165", curriculoId: curriculoDD2015.id },
    { nome: "TIPOGRAFIA", codigo: "QXD0191", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "PROCESSOS DE CRIAÇÃO", codigo: "QXD0192", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO DE INTERFACES WEB", codigo: "QXD0193", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2015.id },
    { nome: "ÉTICA E LEGISLAÇÃO", codigo: "QXD0194", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    // 6º Semestre
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "DESIGN E INOVAÇÃO", codigo: "QXD0195", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0192", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO INTEGRADO IV", codigo: "QXD0196", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0190", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO DE INTERFACES PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0197", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2015.id },
    { nome: "CONCEPÇÃO E DESENVOLVIMENTO DE PRODUTOS", codigo: "QXD0198", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0213", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "PROJETO TÉCNICO-CIENTÍFICO EM DESIGN DIGITAL", codigo: "QXD0215", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0196", curriculoId: curriculoDD2015.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0216", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0215", curriculoId: curriculoDD2015.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "DIGQ0001", cargaHoraria: 192, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0217", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0216", curriculoId: curriculoDD2015.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasDD2015 });

  // Disciplinas optativas do currículo DD 2015.1 (8º semestre)
  const optativasDD2015 = [
    { nome: "RELAÇOES ETNICO-RACIAIS E AFRICANIDADES", codigo: "PRG0002", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "PRG0003", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "PRG0004", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "DIFERENÇA E ENFRENTAMENTO PROFISSIONAL NAS DESIGUALDADES SOCIAIS", codigo: "PRG0005", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0056", curriculoId: curriculoDD2015.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0019", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2015.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2015.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0035", curriculoId: curriculoDD2015.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2015.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0193", curriculoId: curriculoDD2015.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "ARQUITETURA DA INFORMAÇÃO", codigo: "QXD0199", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "DESIGN DE SISTEMAS COLABORATIVOS", codigo: "QXD0200", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "ENGENHARIA SEMIÓTICA", codigo: "QXD0201", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0221", curriculoId: curriculoDD2015.id },
    { nome: "ERGONOMIA", codigo: "QXD0202", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "FOTOGRAFIA", codigo: "QXD0203", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "CINEMA E ANIMAÇÃO", codigo: "QXD0204", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "JOGOS ELETRÔNICOS", codigo: "QXD0205", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2015.id },
    { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "PRÁTICAS EM DESIGN I", codigo: "QXD0207", cargaHoraria: 160, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0193", curriculoId: curriculoDD2015.id },
    { nome: "PROTOTIPAÇÃO RÁPIDA", codigo: "QXD0208", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "REALIDADE VIRTUAL", codigo: "QXD0209", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0159", curriculoId: curriculoDD2015.id },
    { nome: "SOCIOLOGIA E ANTROPOLOGIA", codigo: "QXD0210", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
    { nome: "USER EXPERIENCE (UX)", codigo: "QXD0211", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "QXD0221", curriculoId: curriculoDD2015.id },
    { nome: "SEMINÁRIOS", codigo: "QXD0212", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2015.id },
  ];
  await prisma.disciplina.createMany({ data: optativasDD2015 });

  console.log("Curso DD, currículo 2015.1 e disciplinas criados!");

  // Cria o curso de Ciência da Computação se não existir
  let cursoCC = await prisma.curso.findFirst({ where: { codigo: "CC" } });
  if (!cursoCC) {
    cursoCC = await prisma.curso.create({
    data: {
        nome: "Ciência da Computação",
        codigo: "CC"
    }
  });
  }

  // Cria o currículo 2013.1 de Ciência da Computação
  const curriculoCC2013 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2013.1",
      ano: 2013,
      curso: { connect: { id: cursoCC.id } },
    }
  });

  // Disciplinas obrigatórias do currículo CC 2013.1
  const obrigatoriasCC2013 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0103", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "INTRODUÇÃO À CIÊNCIA DA COMPUTAÇÃO", codigo: "QXD0108", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    // 2º Semestre
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0109", curriculoId: curriculoCC2013.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0001", curriculoId: curriculoCC2013.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0056", curriculoId: curriculoCC2013.id },
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0001", curriculoId: curriculoCC2013.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0005", curriculoId: curriculoCC2013.id },
    // 3º Semestre
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0056", curriculoId: curriculoCC2013.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2013.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2013.id },
    { nome: "PROGRAMAÇÃO FUNCIONAL", codigo: "QXD0114", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "ESTRUTURA DE DADOS AVANÇADA", codigo: "QXD0115", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0010", curriculoId: curriculoCC2013.id },
    // 4º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0014", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoCC2013.id },
    { nome: "ÁLGEBRA LINEAR", codigo: "QXD0116", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    // 5º Semestre
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0040", curriculoId: curriculoCC2013.id },
    { nome: "COMPUTAÇÃO GRÁFICA", codigo: "QXD0119", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2013.id },
    { nome: "MATEMÁTICA COMPUTACIONAL", codigo: "QXD0120", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2013.id },
    // 6º Semestre
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0019", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2013.id },
    { nome: "INTERFACE HUMANO-COMPUTADOR", codigo: "QXD0038", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0013", curriculoId: curriculoCC2013.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0040", curriculoId: curriculoCC2013.id },
    // 7º Semestre
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0046", curriculoId: curriculoCC2013.id },
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0155", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0157", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0110", curriculoId: curriculoCC2013.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "CDCQ0001", cargaHoraria: 192, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0156", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0155", curriculoId: curriculoCC2013.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0158", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0157", curriculoId: curriculoCC2013.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasCC2013 });

  // Disciplinas optativas do currículo CC 2013.1 (8º semestre)
  const optativasCC2013 = [
    { nome: "RELAÇOES ETNICO-RACIAIS E AFRICANIDADES", codigo: "PRG0002", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "PRG0003", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "PRG0004", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "CONSTRUÇÃO DE SISTEMAS DE GERÊNCIA DE BANCO DE DADOS", codigo: "QXD0018", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011", curriculoId: curriculoCC2013.id },
    { nome: "GERÊNCIA DE PROJETOS DE SOFTWARE", codigo: "QXD0023", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0035", curriculoId: curriculoCC2013.id },
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0042", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "SISTEMAS MULTIMÍDIA", codigo: "QXD0044", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS AVANÇADOS EM BANCO DE DADOS", codigo: "QXD0047", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007,QXD0011", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2013.id },
    { nome: "PROJETO DETALHADO DE SOFTWARE", codigo: "QXD0058", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0014", curriculoId: curriculoCC2013.id },
    { nome: "PROCESSOS DE SOFTWARE", codigo: "QXD0060", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0061", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0014", curriculoId: curriculoCC2013.id },
    { nome: "MANUTENÇÃO DE SOFTWARE", codigo: "QXD0062", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "VERIFICAÇÃO E VALIDAÇÃO", codigo: "QXD0063", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "REUSO DE SOFTWARE", codigo: "QXD0068", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2013.id },
    { nome: "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE", codigo: "QXD0073", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0019", curriculoId: curriculoCC2013.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0020", curriculoId: curriculoCC2013.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0020", curriculoId: curriculoCC2013.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoCC2013.id },
    { nome: "REDES DE COMUNICAÇÕES MÓVEIS", codigo: "QXD0090", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2013.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011,QXD0007", curriculoId: curriculoCC2013.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007,QXD0021", curriculoId: curriculoCC2013.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II", codigo: "QXD0134", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0006", curriculoId: curriculoCC2013.id },
    { nome: "TEORIA DOS GRAFOS", codigo: "QXD0152", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2013.id },
    { nome: "DESAFIOS DE PROGRAMAÇÃO", codigo: "QXD0153", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2013.id },
    { nome: "TEORIA DA PROVA", codigo: "QXD0167", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2013.id },
    { nome: "ALGORITMOS PROBABILÍSTICOS", codigo: "QXD0168", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2013.id },
    { nome: "MODELAGEM E SIMULAÇÃO DISCRETA DE SISTEMAS", codigo: "QXD0169", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2013.id },
    { nome: "CRIPTOGRAFIA", codigo: "QXD0170", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2013.id },
    { nome: "OTIMIZAÇÃO COMBINATÓRIA", codigo: "QXD0171", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoCC2013.id },
    { nome: "LÓGICA MODAL", codigo: "QXD0172", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0173", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0174", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS ESPECIAIS II", codigo: "QXD0175", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0012", curriculoId: curriculoCC2013.id },
    { nome: "RECUPERAÇÃO DE INFORMAÇÃO", codigo: "QXD0177", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2013.id },
    { nome: "MINERAÇÃO DE DADOS", codigo: "QXD0178", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011,QXD0012,QXD0041", curriculoId: curriculoCC2013.id },
    { nome: "ESTATÍSTICA MULTIVARIADA", codigo: "QXD0179", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2013.id },
    { nome: "FÍSICA I", codigo: "QXD0180", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0006", curriculoId: curriculoCC2013.id },
    { nome: "PESQUISA OPERACIONAL", codigo: "QXD0181", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0120", curriculoId: curriculoCC2013.id },
    { nome: "VISÃO COMPUTACIONAL", codigo: "QXD0182", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2013.id },
    { nome: "COMPUTAÇÃO PARALELA", codigo: "QXD0183", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0013", curriculoId: curriculoCC2013.id },
    { nome: "REALIDADE VIRTUAL", codigo: "QXD0184", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0119", curriculoId: curriculoCC2013.id },
    { nome: "ANÁLISE DE DESEMPENHO DE SISTEMAS", codigo: "QXD0185", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2013.id },
    { nome: "CÁLCULO NUMÉRICO", codigo: "QXD0186", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0006,QXD0116", curriculoId: curriculoCC2013.id },
    { nome: "TÓPICOS ESPECIAIS I", codigo: "QXD0187", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "PROCESSAMENTO DE IMAGENS", codigo: "QXD0188", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2013.id },
  ];
  await prisma.disciplina.createMany({ data: optativasCC2013 });

  console.log("Curso CC, currículo 2013.1 e disciplinas criados!");

  // Cria o currículo 2024.1 de Ciência da Computação
  const curriculoCC2024 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2024.1",
      ano: 2024,
      curso: { connect: { id: cursoCC.id } },
    }
  });

  // Disciplinas obrigatórias do currículo CC 2024.1
  const obrigatoriasCC2024 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0250", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0256", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "INTRODUÇÃO À CIÊNCIA DA COMPUTAÇÃO", codigo: "QXD200", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0109", curriculoId: curriculoCC2024.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0001", curriculoId: curriculoCC2024.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0056", curriculoId: curriculoCC2024.id },
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0001", curriculoId: curriculoCC2024.id },
    // 3º Semestre
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0056", curriculoId: curriculoCC2024.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0005", curriculoId: curriculoCC2024.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2024.id },
    { nome: "PROGRAMAÇÃO FUNCIONAL", codigo: "QXD0114", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "ESTRUTURA DE DADOS AVANÇADA", codigo: "QXD0115", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0010", curriculoId: curriculoCC2024.id },
    // 4º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2024.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoCC2024.id },
    { nome: "ÁLGEBRA LINEAR", codigo: "QXD0116", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0248", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2024.id },
    // 5º Semestre
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2024.id },
    { nome: "COMPUTAÇÃO GRÁFICA", codigo: "QXD0119", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2024.id },
    { nome: "MATEMÁTICA COMPUTACIONAL", codigo: "QXD0120", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0116", curriculoId: curriculoCC2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0253", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2024.id },
    // 6º Semestre
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0040", curriculoId: curriculoCC2024.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0013", curriculoId: curriculoCC2024.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0040", curriculoId: curriculoCC2024.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0010,QXD0012", curriculoId: curriculoCC2024.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0252", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2024.id },
    { nome: "PROJETO INTEGRADO EM CIÊNCIA DA COMPUTAÇÃO", codigo: "QXD0296", cargaHoraria: 32, semestre: 6, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0011,QXD0248,QXD0253", curriculoId: curriculoCC2024.id },
    // 7º Semestre
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0046", curriculoId: curriculoCC2024.id },
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0155", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0157", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0110", curriculoId: curriculoCC2024.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0255", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "CDCQ0002", cargaHoraria: 48, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "ATIVIDADES DE EXTENSÃO", codigo: "EXT0064", cargaHoraria: 176, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0156", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0155", curriculoId: curriculoCC2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0295", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0157", curriculoId: curriculoCC2024.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasCC2024 });

  // Disciplinas optativas do currículo CC 2024.1 (8º semestre)
  const optativasCC2024 = [
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2024.id },
    { nome: "CONSTRUÇÃO DE SISTEMAS DE GERÊNCIA DE BANCO DE DADOS", codigo: "QXD0018", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011", curriculoId: curriculoCC2024.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0035", curriculoId: curriculoCC2024.id },
    { nome: "SISTEMAS MULTIMÍDIA", codigo: "QXD0044", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2024.id },
    { nome: "TÓPICOS ESPECIAIS I", codigo: "QXD0050", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "TÓPICOS ESPECIAIS II", codigo: "QXD0051", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "PROCESSOS DE SOFTWARE", codigo: "QXD0060", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "MANUTENÇÃO DE SOFTWARE", codigo: "QXD0062", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "REUSO DE SOFTWARE", codigo: "QXD0068", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2024.id },
    { nome: "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE", codigo: "QXD0073", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0253", curriculoId: curriculoCC2024.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007", curriculoId: curriculoCC2024.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0253", curriculoId: curriculoCC2024.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoCC2024.id },
    { nome: "REDES DE COMUNICAÇÕES MÓVEIS", codigo: "QXD0090", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0021", curriculoId: curriculoCC2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011,QXD0007", curriculoId: curriculoCC2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0007,QXD0021", curriculoId: curriculoCC2024.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II", codigo: "QXD0134", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0006", curriculoId: curriculoCC2024.id },
    { nome: "TEORIA DOS GRAFOS", codigo: "QXD0152", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0008", curriculoId: curriculoCC2024.id },
    { nome: "DESAFIOS DE PROGRAMAÇÃO", codigo: "QXD0153", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoCC2024.id },
    { nome: "TEORIA DA PROVA", codigo: "QXD0167", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2024.id },
    { nome: "ALGORITMOS PROBABILÍSTICOS", codigo: "QXD0168", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2024.id },
    { nome: "MODELAGEM E SIMULAÇÃO DISCRETA DE SISTEMAS", codigo: "QXD0169", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2024.id },
    { nome: "CRIPTOGRAFIA", codigo: "QXD0170", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2024.id },
    { nome: "OTIMIZAÇÃO COMBINATÓRIA", codigo: "QXD0171", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoCC2024.id },
    { nome: "LÓGICA MODAL", codigo: "QXD0172", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0017", curriculoId: curriculoCC2024.id },
    { nome: "RECUPERAÇÃO DE INFORMAÇÃO", codigo: "QXD0177", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041", curriculoId: curriculoCC2024.id },
    { nome: "MINERAÇÃO DE DADOS", codigo: "QXD0178", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0011,QXD0012,QXD0041", curriculoId: curriculoCC2024.id },
    { nome: "ESTATÍSTICA MULTIVARIADA", codigo: "QXD0179", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2024.id },
    { nome: "FÍSICA I", codigo: "QXD0180", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0006", curriculoId: curriculoCC2024.id },
    { nome: "PESQUISA OPERACIONAL", codigo: "QXD0181", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0120", curriculoId: curriculoCC2024.id },
    { nome: "VISÃO COMPUTACIONAL", codigo: "QXD0182", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0119", curriculoId: curriculoCC2024.id },
    { nome: "COMPUTAÇÃO PARALELA", codigo: "QXD0183", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0041,QXD0013", curriculoId: curriculoCC2024.id },
    { nome: "REALIDADE VIRTUAL", codigo: "QXD0184", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0119", curriculoId: curriculoCC2024.id },
    { nome: "ANÁLISE DE DESEMPENHO DE SISTEMAS", codigo: "QXD0185", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0012", curriculoId: curriculoCC2024.id },
    { nome: "CÁLCULO NUMÉRICO", codigo: "QXD0186", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0116,QXD0006", curriculoId: curriculoCC2024.id },
    { nome: "PROCESSAMENTO DE IMAGENS", codigo: "QXD0188", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0119", curriculoId: curriculoCC2024.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0251", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0248", curriculoId: curriculoCC2024.id },
    { nome: "GERÊNCIA DE PROJETOS", codigo: "QXD0254", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0259", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0276", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "PROJETO DETALHADO DE SOFTWARE", codigo: "QXD0277", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0248", curriculoId: curriculoCC2024.id },
    { nome: "VERIFICAÇÃO E VALIDAÇÃO", codigo: "QXD0278", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "QXD0252", curriculoId: curriculoCC2024.id },
  ];
  await prisma.disciplina.createMany({ data: optativasCC2024 });

  console.log("Curso CC, currículo 2024.1 e disciplinas criados!");

  // Cria o curso de Engenharia de Computação se não existir
  let cursoEC = await prisma.curso.findFirst({ where: { codigo: "EC" } });
  if (!cursoEC) {
    cursoEC = await prisma.curso.create({
    data: {
        nome: "Engenharia de Computação",
        codigo: "EC"
    }
  });
  }

  // Cria o currículo 2015.1 de Engenharia de Computação
  const curriculoEC2015 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2015.1",
      ano: 2015,
      curso: { connect: { id: cursoEC.id } },
    }
  });

  // Disciplinas obrigatórias do currículo EC 2015.1
  const obrigatoriasEC2015 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0103", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "CIRCUITOS DIGITAIS", codigo: "QXD0117", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "INTRODUÇÃO À ENGENHARIA DE COMPUTAÇÃO", codigo: "QXD0118", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    // 2º Semestre
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0109", curriculoId: curriculoEC2015.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2015.id },
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2015.id },
    { nome: "ÁLGEBRA LINEAR", codigo: "QXD0116", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "INTRODUÇÃO À ARQUITETURA DE COMPUTADORES", codigo: "QXD0142", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2015.id },
    // 3º Semestre
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2015.id },
    { nome: "ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES I", codigo: "QXD0132", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0142", curriculoId: curriculoEC2015.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II", codigo: "QXD0134", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0006", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS OPERACIONAIS I", codigo: "QXD0147", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0142,QXD0010", curriculoId: curriculoEC2015.id },
    { nome: "TÉCNICAS DE PROGRAMAÇÃO PARA SISTEMAS EMBARCADOS I", codigo: "QXD0149", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0010", curriculoId: curriculoEC2015.id },
    // 4º Semestre
    { nome: "ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES II", codigo: "QXD0133", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0132", curriculoId: curriculoEC2015.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL III", codigo: "QXD0135", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0134", curriculoId: curriculoEC2015.id },
    { nome: "EQUAÇÕES DIFERENCIAIS", codigo: "QXD0140", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0006,QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS OPERACIONAIS II", codigo: "QXD0148", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0147", curriculoId: curriculoEC2015.id },
    { nome: "TÉCNICAS DE PROGRAMAÇÃO PARA SISTEMAS EMBARCADOS II", codigo: "QXD0150", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0149", curriculoId: curriculoEC2015.id },
    // 5º Semestre
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2015.id },
    { nome: "ANÁLISE DE CIRCUITOS", codigo: "QXD0131", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117,QXD0140", curriculoId: curriculoEC2015.id },
    { nome: "ELETRICIDADE E MAGNETISMO", codigo: "QXD0136", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0135", curriculoId: curriculoEC2015.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0139", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0150", curriculoId: curriculoEC2015.id },
    { nome: "MICROCONTROLADORES", codigo: "QXD0143", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0133", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS DIGITAIS PARA COMPUTADORES", codigo: "QXD0146", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2015.id },
    // 6º Semestre
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2015.id },
    { nome: "ELETRÔNICA FUNDAMENTAL I", codigo: "QXD0137", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0131", curriculoId: curriculoEC2015.id },
    { nome: "SINAIS E SISTEMAS", codigo: "QXD0144", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0140,QXD0008", curriculoId: curriculoEC2015.id },
    // 7º Semestre
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2015.id },
    { nome: "ELETRÔNICA FUNDAMENTAL II", codigo: "QXD0138", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0137", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS DE TEMPO-REAL", codigo: "QXD0145", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0148", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS DE AUTOMAÇÃO E CONTROLE", codigo: "QXD0151", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2015.id },
    // 8º Semestre
    { nome: "INSTRUMENTAÇÃO", codigo: "QXD0141", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0137", curriculoId: curriculoEC2015.id },
    { nome: "SISTEMAS EMBARCADOS", codigo: "QXD0214", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145", curriculoId: curriculoEC2015.id },
    // 9º Semestre
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145,QXD0141", curriculoId: curriculoEC2015.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0219", cargaHoraria: 32, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    // 10º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "ENCQ0001", cargaHoraria: 192, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0220", cargaHoraria: 96, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0219", curriculoId: curriculoEC2015.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasEC2015 });

  // Disciplinas optativas do currículo EC 2015.1 (10º semestre)
  const optativasEC2015 = [
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2015.id },
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0007", curriculoId: curriculoEC2015.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0035", curriculoId: curriculoEC2015.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0017", curriculoId: curriculoEC2015.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoEC2015.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0040", curriculoId: curriculoEC2015.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2015.id },
    { nome: "PROGRAMAÇÃO DE SCRIPT", codigo: "QXD0088", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "REDES DE COMUNICAÇÕES MÓVEIS", codigo: "QXD0090", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2015.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "COMPUTAÇÃO GRÁFICA", codigo: "QXD0119", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "TEORIA DOS GRAFOS", codigo: "QXD0152", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2015.id },
    { nome: "CRIPTOGRAFIA", codigo: "QXD0170", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "OTIMIZAÇÃO COMBINATÓRIA", codigo: "QXD0171", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0012,QXD0010", curriculoId: curriculoEC2015.id },
    { nome: "MINERAÇÃO DE DADOS", codigo: "QXD0178", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0011,QXD0012,QXD0041", curriculoId: curriculoEC2015.id },
    { nome: "FÍSICA I", codigo: "QXD0180", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0006", curriculoId: curriculoEC2015.id },
    { nome: "PESQUISA OPERACIONAL", codigo: "QXD0181", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "VISÃO COMPUTACIONAL", codigo: "QXD0182", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "COMPUTAÇÃO PARALELA", codigo: "QXD0183", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0147,QXD0010", curriculoId: curriculoEC2015.id },
    { nome: "ANÁLISE DE DESEMPENHO DE SISTEMAS", codigo: "QXD0185", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0012", curriculoId: curriculoEC2015.id },
    { nome: "CÁLCULO NUMÉRICO", codigo: "QXD0186", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0006,QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "PROCESSAMENTO DE IMAGENS", codigo: "QXD0188", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2015.id },
    { nome: "FUNDAMENTOS DE TOLERÂNCIA A FALHAS", codigo: "QXD0218", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0139", curriculoId: curriculoEC2015.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0221", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "INTRODUÇÃO A ADMINISTRAÇÃO", codigo: "QXD0227", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "FINANÇAS", codigo: "QXD0233", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "ROBÓTICA I", codigo: "QXD0240", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0151", curriculoId: curriculoEC2015.id },
    { nome: "ROBÓTICA II", codigo: "QXD0241", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0240", curriculoId: curriculoEC2015.id },
    { nome: "PROTOCOLOS DE COMUNICAÇÃO", codigo: "QXD0242", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2015.id },
    { nome: "PROCESSAMENTO DIGITAL DE SINAIS", codigo: "QXD0243", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2015.id },
    { nome: "PRINCÍPIOS DE COMUNICAÇÃO", codigo: "QXD0244", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2015.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
    { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2015.id },
  ];
  await prisma.disciplina.createMany({ data: optativasEC2015 });

  console.log("Curso EC, currículo 2015.1 e disciplinas criados!");

  // Cria o currículo 2024.1 de Engenharia de Computação
  const curriculoEC2024 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2024.1",
      ano: 2024,
      curso: { connect: { id: cursoEC.id } },
    }
  });

  // Disciplinas obrigatórias do currículo EC 2024.1
  const obrigatoriasEC2024 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0250", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "INTRODUÇÃO À ENGENHARIA DE COMPUTAÇÃO", codigo: "QXD203", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0109", curriculoId: curriculoEC2024.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2024.id },
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2024.id },
    { nome: "ÁLGEBRA LINEAR", codigo: "QXD0116", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    // 3º Semestre
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2024.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0005", curriculoId: curriculoEC2024.id },
    { nome: "CIRCUITOS DIGITAIS", codigo: "QXD0117", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II", codigo: "QXD0134", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0006", curriculoId: curriculoEC2024.id },
    { nome: "TÉCNICAS DE PROGRAMAÇÃO PARA SISTEMAS EMBARCADOS I", codigo: "QXD0149", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0010", curriculoId: curriculoEC2024.id },
    { nome: "ORGANIZAÇÃO DE COMPUTADORES E LINGUAGENS DE MONTAGEM I", codigo: "QXD0280", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0005", curriculoId: curriculoEC2024.id },
    // 4º Semestre
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL III", codigo: "QXD0135", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0134", curriculoId: curriculoEC2024.id },
    { nome: "EQUAÇÕES DIFERENCIAIS", codigo: "QXD0140", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0116,QXD0006", curriculoId: curriculoEC2024.id },
    { nome: "TÉCNICAS DE PROGRAMAÇÃO PARA SISTEMAS EMBARCADOS II", codigo: "QXD0150", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0149", curriculoId: curriculoEC2024.id },
    { nome: "ORGANIZAÇÃO DE COMPUTADORES E LINGUAGENS DE MONTAGEM II", codigo: "QXD0288", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0280", curriculoId: curriculoEC2024.id },
    { nome: "PROJETO E IMPLEMENTAÇÃO DE SISTEMAS OPERACIONAIS", codigo: "QXD0289", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0013,QXD0010", curriculoId: curriculoEC2024.id },
    // 5º Semestre
    { nome: "ANÁLISE DE CIRCUITOS", codigo: "QXD0131", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117,QXD0140", curriculoId: curriculoEC2024.id },
    { nome: "ELETRICIDADE E MAGNETISMO", codigo: "QXD0136", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0135", curriculoId: curriculoEC2024.id },
    { nome: "MICROCONTROLADORES", codigo: "QXD0143", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0288", curriculoId: curriculoEC2024.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0252", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE COMPUTAÇÃO I", codigo: "QXD0284", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "SISTEMAS DIGITAIS PARA COMPUTADORES", codigo: "QXD0285", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2024.id },
    // 6º Semestre
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2024.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "ELETRÔNICA FUNDAMENTAL I", codigo: "QXD0137", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0131", curriculoId: curriculoEC2024.id },
    { nome: "SINAIS E SISTEMAS", codigo: "QXD0144", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008,QXD0140", curriculoId: curriculoEC2024.id },
    { nome: "ENGENHARIA DE SOFTWARE PARA SISTEMAS EMBARCADOS", codigo: "QXD0286", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE COMPUTAÇÃO II", codigo: "QXD0287", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0284", curriculoId: curriculoEC2024.id },
    // 7º Semestre
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2024.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2024.id },
    { nome: "ELETRÔNICA FUNDAMENTAL II", codigo: "QXD0138", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0137", curriculoId: curriculoEC2024.id },
    { nome: "SISTEMAS DE TEMPO-REAL", codigo: "QXD0145", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0150", curriculoId: curriculoEC2024.id },
    { nome: "SISTEMAS DE AUTOMAÇÃO E CONTROLE", codigo: "QXD0151", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2024.id },
    // 8º Semestre
    { nome: "INSTRUMENTAÇÃO", codigo: "QXD0141", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0138", curriculoId: curriculoEC2024.id },
    { nome: "PROJETO DE SISTEMAS EMBARCADOS", codigo: "QXD0303", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145", curriculoId: curriculoEC2024.id },
    // 9º Semestre
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145,QXD0137", curriculoId: curriculoEC2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0219", cargaHoraria: 32, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    // 10º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "ENCQ0002", cargaHoraria: 60, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "UNIDADE CURRICULAR ESPECIAL DE EXTENSÃO", codigo: "EXT0063", cargaHoraria: 132, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0304", cargaHoraria: 64, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0219", curriculoId: curriculoEC2024.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasEC2024 });

  // Disciplinas optativas do currículo EC 2024.1 (10º semestre)
  const optativasEC2024 = [
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2024.id },
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0007", curriculoId: curriculoEC2024.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0035", curriculoId: curriculoEC2024.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0017", curriculoId: curriculoEC2024.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoEC2024.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0040", curriculoId: curriculoEC2024.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2024.id },
    { nome: "PROGRAMAÇÃO DE SCRIPT", codigo: "QXD0088", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2024.id },
    { nome: "REDES DE COMUNICAÇÕES MÓVEIS", codigo: "QXD0090", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2024.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "COMPUTAÇÃO GRÁFICA", codigo: "QXD0119", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "TEORIA DOS GRAFOS", codigo: "QXD0152", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2024.id },
    { nome: "CRIPTOGRAFIA", codigo: "QXD0170", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0041", curriculoId: curriculoEC2024.id },
    { nome: "OTIMIZAÇÃO COMBINATÓRIA", codigo: "QXD0171", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0012,QXD0010", curriculoId: curriculoEC2024.id },
    { nome: "MINERAÇÃO DE DADOS", codigo: "QXD0178", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0011,QXD0012,QXD0041", curriculoId: curriculoEC2024.id },
    { nome: "FÍSICA I", codigo: "QXD0180", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0006", curriculoId: curriculoEC2024.id },
    { nome: "PESQUISA OPERACIONAL", codigo: "QXD0181", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0041,QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "VISÃO COMPUTACIONAL", codigo: "QXD0182", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "COMPUTAÇÃO PARALELA", codigo: "QXD0183", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0013,QXD0010", curriculoId: curriculoEC2024.id },
    { nome: "ANÁLISE DE DESEMPENHO DE SISTEMAS", codigo: "QXD0185", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0012", curriculoId: curriculoEC2024.id },
    { nome: "CÁLCULO NUMÉRICO", codigo: "QXD0186", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0006,QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "PROCESSAMENTO DE IMAGENS", codigo: "QXD0188", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2024.id },
    { nome: "FUNDAMENTOS DE TOLERÂNCIA A FALHAS", codigo: "QXD0218", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0283", curriculoId: curriculoEC2024.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0221", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "INTRODUÇÃO A ADMINISTRAÇÃO", codigo: "QXD0227", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "FINANÇAS", codigo: "QXD0233", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "ROBÓTICA I", codigo: "QXD0240", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0151", curriculoId: curriculoEC2024.id },
    { nome: "ROBÓTICA II", codigo: "QXD0241", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0240", curriculoId: curriculoEC2024.id },
    { nome: "PROTOCOLOS DE COMUNICAÇÃO", codigo: "QXD0242", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2024.id },
    { nome: "PROCESSAMENTO DIGITAL DE SINAIS", codigo: "QXD0243", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2024.id },
    { nome: "PRINCÍPIOS DE COMUNICAÇÃO", codigo: "QXD0244", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2024.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
    { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2024.id },
  ];
  await prisma.disciplina.createMany({ data: optativasEC2024 });

  console.log("Curso EC, currículo 2024.1 e disciplinas criados!");

  // Cria o curso de Engenharia de Software se não existir
  let cursoES = await prisma.curso.findFirst({ where: { codigo: "ES" } });
  if (!cursoES) {
    cursoES = await prisma.curso.create({
    data: {
        nome: "Engenharia de Software",
        codigo: "ES"
    }
  });
  }

  // Cria o currículo 2010.1 de Engenharia de Software
  const curriculoES2010 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2010.1",
      ano: 2010,
      curso: { connect: { id: cursoES.id } },
    }
  });

  // Disciplinas obrigatórias do currículo ES 2010.1
  const obrigatoriasES2010 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "ÉTICA,NORMAS E POSTURA PROFISSIONAL", codigo: "QXD0054", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "INTRODUÇÃO À COMPUTAÇÃO E ENGENHARIA DE SOFTWARE", codigo: "QXD0055", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2010.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2010.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2010.id },
    { nome: "INTRODUÇÃO A PROCESSO E REQUISITOS DE SOFTWARE", codigo: "QXD0057", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0055", curriculoId: curriculoES2010.id },
    // 3º Semestre
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2010.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0005", curriculoId: curriculoES2010.id },
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0014", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0057", curriculoId: curriculoES2010.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2010.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    // 4º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2010.id },
    { nome: "INTERFACE HUMANO-COMPUTADOR", codigo: "QXD0038", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "PROJETO DETALHADO DE SOFTWARE", codigo: "QXD0058", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES2010.id },
    { nome: "REDES E SISTEMAS DISTRIBUÍDOS", codigo: "QXD0059", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    // 5º Semestre
    { nome: "GERÊNCIA DE PROJETOS DE SOFTWARE", codigo: "QXD0023", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010,QXD0008", curriculoId: curriculoES2010.id },
    { nome: "PROCESSOS DE SOFTWARE", codigo: "QXD0060", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0057", curriculoId: curriculoES2010.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0061", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0057", curriculoId: curriculoES2010.id },
    // 6º Semestre
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0042", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "VERIFICAÇÃO E VALIDAÇÃO", codigo: "QXD0063", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0023,QXD0042", curriculoId: curriculoES2010.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "EES0001", cargaHoraria: 288, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "ARQUITETURA DE SOFTWARE", codigo: "QXD0064", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2010.id },
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0104", curriculoId: curriculoES2010.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0111", curriculoId: curriculoES2010.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasES2010 });

  // Disciplinas optativas do currículo ES 2010.1
  const optativasES2010 = [
    // 6º Semestre
    { nome: "MANUTENÇÃO DE SOFTWARE", codigo: "QXD0062", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES2010.id },
    // 8º Semestre
    { nome: "RELAÇOES ETNICO-RACIAIS E AFRICANIDADES", codigo: "PRG0002", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "PRG0004", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "DIFERENÇA E ENFRENTAMENTO PROFISSIONAL NAS DESIGUALDADES SOCIAIS", codigo: "PRG0005", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2010.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0016", curriculoId: curriculoES2010.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0035", curriculoId: curriculoES2010.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0017", curriculoId: curriculoES2010.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2010.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2010.id },
    { nome: "TRABALHO COOPERATIVO BASEADO EM COMPUTADORES", codigo: "QXD0049", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "ESPECIFICAÇÃO FORMAL DE SOFTWARE", codigo: "QXD0065", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "GERÊNCIA DE CONFIGURAÇÃO", codigo: "QXD0066", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "LEITURA DE SOFTWARE", codigo: "QXD0067", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "REUSO DE SOFTWARE", codigo: "QXD0068", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "ESTIMATIVA DE CUSTOS EM PROJETOS DE SOFTWARE", codigo: "QXD0071", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0023", curriculoId: curriculoES2010.id },
    { nome: "INTEGRAÇÃO DE APLICAÇÕES", codigo: "QXD0072", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0064", curriculoId: curriculoES2010.id },
    { nome: "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE", codigo: "QXD0073", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2010.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007,QXD0013", curriculoId: curriculoES2010.id },
    { nome: "MÉTODOS E FERRAMENTAS DA ENGENHARIA DE SOFTWARE", codigo: "QXD0077", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0063", curriculoId: curriculoES2010.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2010.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0059,QXD0011", curriculoId: curriculoES2010.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0011,QXD0007", curriculoId: curriculoES2010.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0059,QXD0007", curriculoId: curriculoES2010.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2010.id },
  ];
  await prisma.disciplina.createMany({ data: optativasES2010 });

  console.log("Curso ES, currículo 2010.1 e disciplinas criados!");

  // Cria o currículo 2019.1 de Engenharia de Software
  const curriculoES2019 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2019.1",
      ano: 2019,
      curso: { connect: { id: cursoES.id } },
    }
  });

  // Disciplinas obrigatórias do currículo ES 2019.1
  const obrigatoriasES2019 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0103", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0221", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "INTRODUÇÃO À ENGENHARIA DE SOFTWARE", codigo: "QXD0236", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2019.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2019.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2019.id },
    { nome: "PROCESSOS DE SOFTWARE", codigo: "QXD0060", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0236", curriculoId: curriculoES2019.id },
    // 3º Semestre
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2019.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0005", curriculoId: curriculoES2019.id },
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0014", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0061", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0236", curriculoId: curriculoES2019.id },
    // 4º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2019.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2019.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "PROJETO DETALHADO DE SOFTWARE", codigo: "QXD0058", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES2019.id },
    { nome: "GERÊNCIA DE CONFIGURAÇÃO", codigo: "QXD0066", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0236", curriculoId: curriculoES2019.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE I", codigo: "QXD0237", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    // 5º Semestre
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010,QXD0008", curriculoId: curriculoES2019.id },
    { nome: "VERIFICAÇÃO E VALIDAÇÃO", codigo: "QXD0063", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2019.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE II", codigo: "QXD0238", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    // 6º Semestre
    { nome: "GERÊNCIA DE PROJETOS DE SOFTWARE", codigo: "QXD0023", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0060", curriculoId: curriculoES2019.id },
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0042", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0060", curriculoId: curriculoES2019.id },
    { nome: "ARQUITETURA DE SOFTWARE", codigo: "QXD0064", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2019.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE III", codigo: "QXD0239", cargaHoraria: 32, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "ESQ0001", cargaHoraria: 256, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0104", curriculoId: curriculoES2019.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0111", curriculoId: curriculoES2019.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasES2019 });

  // Disciplinas optativas do currículo ES 2019.1
  const optativasES2019 = [
    { nome: "DIFERENÇA E ENFRENTAMENTO PROFISSIONAL NAS DESIGUALDADES SOCIAIS", codigo: "PRG0005", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "AUDITORIA E SEGURANÇA DE SISTEMAS DE INFORMAÇÃO", codigo: "QXD0022", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021", curriculoId: curriculoES2019.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0016", curriculoId: curriculoES2019.id },
    { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0035", curriculoId: curriculoES2019.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0017", curriculoId: curriculoES2019.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0056,QXD0001", curriculoId: curriculoES2019.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2019.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0013,QXD0007,QXD0021", curriculoId: curriculoES2019.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2019.id },
    { nome: "MANUTENÇÃO DE SOFTWARE", codigo: "QXD0062", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES2019.id },
    { nome: "ESPECIFICAÇÃO FORMAL DE SOFTWARE", codigo: "QXD0065", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0017", curriculoId: curriculoES2019.id },
    { nome: "REUSO DE SOFTWARE", codigo: "QXD0068", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2019.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021", curriculoId: curriculoES2019.id },
    { nome: "ESTIMATIVA DE CUSTOS EM PROJETOS DE SOFTWARE", codigo: "QXD0071", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0023", curriculoId: curriculoES2019.id },
    { nome: "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE", codigo: "QXD0073", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0013,QXD0007", curriculoId: curriculoES2019.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: 
      "QXD0058,QXD0020", curriculoId: curriculoES2019.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0277,QXD0253", curriculoId: curriculoES2019.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: 
      cursoES.id, preRequisitos: "QXD0058", curriculoId: curriculoES2019.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0277", curriculoId: curriculoES2019.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoES2019.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0011,QXD0007", curriculoId: curriculoES2019.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "PROGRAMAÇÃO FUNCIONAL", codigo: "QXD0114", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "ESTRUTURA DE DADOS AVANÇADA", codigo: "QXD0115", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0010", curriculoId: curriculoES2019.id },
    { nome: "DESAFIOS DE PROGRAMAÇÃO", codigo: "QXD0153", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, 
      preRequisitos: "QXD0041", curriculoId: curriculoES2019.id },
    { nome: "DESAFIOS DE PROGRAMAÇÃO", codigo: "QXD0153", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoES2019.id },
    { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0154", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "LINGUAGENS DE MARCAÇÃO E SCRIPTS", codigo: "QXD0164", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2019.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0012", curriculoId: curriculoES2019.id },
    { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0189", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0221", curriculoId: curriculoES2019.id },
    { nome: "USER EXPERIENCE (UX)", codigo: "QXD0211", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0221", curriculoId: curriculoES2019.id },
    { nome: "SISTEMAS COLABORATIVOS", codigo: "QXD0231", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2019.id },
  ];
  await prisma.disciplina.createMany({ data: optativasES2019 });

  console.log("Curso ES, currículo 2019.1 e disciplinas criados!");

  // Cria o currículo 2024.1 de Engenharia de Software
  const curriculoES2024 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2024.1",
      ano: 2024,
      curso: { connect: { id: cursoES.id } },
    }
  });

  // Disciplinas obrigatórias do currículo ES 2024.1
  const obrigatoriasES2024 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0250", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0256", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "INTRODUÇÃO À ENGENHARIA DE SOFTWARE", codigo: "QXD2040", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2024.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2024.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES2024.id },
    { nome: "PROCESSOS DE SOFTWARE", codigo: "QXD0060", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD2040", curriculoId: curriculoES2024.id },
    // 3º Semestre
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2024.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0005", curriculoId: curriculoES2024.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0248", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0251", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD2040", curriculoId: curriculoES2024.id },
    // 4º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES2024.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2024.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "GERÊNCIA DE CONFIGURAÇÃO", codigo: "QXD0066", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD2040", curriculoId: curriculoES2024.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE I", codigo: "QXD0237", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "PROJETO DETALHADO DE SOFTWARE", codigo: "QXD0277", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0274", curriculoId: curriculoES2024.id },
    // 5º Semestre
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010,QXD0008", curriculoId: curriculoES2024.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE II", codigo: "QXD0238", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0253", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0255", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "VERIFICAÇÃO E VALIDAÇÃO", codigo: "QXD0278", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0277", curriculoId: curriculoES2024.id },
    // 6º Semestre
    { nome: "ARQUITETURA DE SOFTWARE", codigo: "QXD0064", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0277", curriculoId: curriculoES2024.id },
    { nome: "PROJETO INTEGRADO EM ENGENHARIA DE SOFTWARE III", codigo: "QXD0239", cargaHoraria: 32, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "GERÊNCIA DE PROJETOS", codigo: "QXD0254", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0060", curriculoId: curriculoES2024.id },
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0259", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0060", curriculoId: curriculoES2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0276", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    // 7º Semestre
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0281", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    // 8º Semestre
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "ESQ0002", cargaHoraria: 192, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "UNIDADE CURRICULAR ESPECIAL DE EXTENSÃO", codigo: "EXT0062", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0111", curriculoId: curriculoES2024.id },
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0282", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0281", curriculoId: curriculoES2024.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasES2024 });

  // Disciplinas optativas do currículo ES 2024.1
  const optativasES2024 = [
    { nome: "AUDITORIA E SEGURANÇA DE SISTEMAS DE INFORMAÇÃO", codigo: "QXD0022", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021", curriculoId: curriculoES2024.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0016", curriculoId: curriculoES2024.id },
    { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0035", curriculoId: curriculoES2024.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0017", curriculoId: curriculoES2024.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0056,QXD0001", curriculoId: curriculoES2024.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2024.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0013,QXD0007,QXD0021", curriculoId: curriculoES2024.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES2024.id },
    { nome: "MANUTENÇÃO DE SOFTWARE", codigo: "QXD0062", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0274", curriculoId: curriculoES2024.id },
    { nome: "ESPECIFICAÇÃO FORMAL DE SOFTWARE", codigo: "QXD0065", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0017", curriculoId: curriculoES2024.id },
    { nome: "REUSO DE SOFTWARE", codigo: "QXD0068", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0277", curriculoId: curriculoES2024.id },
    { nome: "SEGURANÇA", codigo: "QXD0069", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021", curriculoId: curriculoES2024.id },
    { nome: "ESTIMATIVA DE CUSTOS EM PROJETOS DE SOFTWARE", codigo: "QXD0071", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0254", curriculoId: curriculoES2024.id },
    { nome: "EXPERIMENTAÇÃO EM ENGENHARIA DE SOFTWARE", codigo: "QXD0073", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0013,QXD0007", curriculoId: curriculoES2024.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0277,QXD0253", curriculoId: curriculoES2024.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0277", curriculoId: curriculoES2024.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoES2024.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0011,QXD0007", curriculoId: curriculoES2024.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "PROGRAMAÇÃO FUNCIONAL", codigo: "QXD0114", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "ESTRUTURA DE DADOS AVANÇADA", codigo: "QXD0115", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0010", curriculoId: curriculoES2024.id },
    { nome: "DESAFIOS DE PROGRAMAÇÃO", codigo: "QXD0153", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0008,QXD0010", curriculoId: curriculoES2024.id },
    { nome: "LINGUAGENS DE MARCAÇÃO E SCRIPTS", codigo: "QXD0164", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES2024.id },
    { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0012", curriculoId: curriculoES2024.id },
    { nome: "USER EXPERIENCE (UX)", codigo: "QXD0211", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "QXD0256", curriculoId: curriculoES2024.id },
    { nome: "SISTEMAS COLABORATIVOS", codigo: "QXD0231", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0249", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
    { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0505", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES2024.id },
  ];
  await prisma.disciplina.createMany({ data: optativasES2024 });

  console.log("Curso ES, currículo 2024.1 e disciplinas criados!");

  // Cria o curso de Redes de Computadores se não existir
  let cursoRC = await prisma.curso.findFirst({ where: { codigo: "RC" } });
  if (!cursoRC) {
    cursoRC = await prisma.curso.create({
      data: {
        nome: "Redes de Computadores",
        codigo: "RC"
      }
    });
  }

  // Cria o currículo 2010.1 de Redes de Computadores
  const curriculoRC2010 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2010.1",
      ano: 2010,
      curso: { connect: { id: cursoRC.id } },
    }
  });

  // Disciplinas obrigatórias do currículo RC 2010.1
  const obrigatoriasRC2010 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "TEORIA GERAL DA ADMINISTRAÇÃO", codigo: "QXD0004", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "INFORMATICA E ORGANIZAÇÃO DE COMPUTADORES", codigo: "QXD0081", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "MATEMÁTICA COMPUTACIONAL", codigo: "QXD0082", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "MÉTODOS E TÉCNICAS DE PESQUISA", codigo: "QXD0083", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    // 2º Semestre
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2010.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0082", curriculoId: curriculoRC2010.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    // 3º Semestre
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "ADMINISTRAÇÃO DE SISTEMAS OPERACIONAIS LINUX", codigo: "QXD0084", cargaHoraria: 96, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0013", curriculoId: curriculoRC2010.id },
    { nome: "ADMINISTRAÇÃO DE SISTEMAS OPERACIONAIS WINDOWS", codigo: "QXD0085", cargaHoraria: 96, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0013", curriculoId: curriculoRC2010.id },
    { nome: "INTERNET E ARQUITETURA TCP/IP", codigo: "QXD0086", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    // 4º Semestre
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0013,QXD0007", curriculoId: curriculoRC2010.id },
    { nome: "LABORATÓRIO EM INFRAESTRUTURA DE REDES DE COMPUTADORES", codigo: "QXD0087", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    { nome: "PROGRAMAÇÃO DE SCRIPT", codigo: "QXD0088", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2010.id },
    { nome: "REDES DE ALTA VELOCIDADE", codigo: "QXD0089", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    { nome: "REDES DE COMUNICAÇÕES MÓVEIS", codigo: "QXD0090", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0103", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    // 5º Semestre
    { nome: "GERÊNCIA DE REDES", codigo: "QXD0033", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    { nome: "GERÊNCIA DE PROJETOS", codigo: "QXD0034", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0086", curriculoId: curriculoRC2010.id },
    { nome: "SEGURANÇA DA INFORMAÇÃO", codigo: "QXD0091", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0021", curriculoId: curriculoRC2010.id },
    { nome: "SERVIÇOS DE REDES DE COMPUTADORES", codigo: "QXD0092", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0086", curriculoId: curriculoRC2010.id },
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0096", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0087,QXD0088", curriculoId: curriculoRC2010.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0097", cargaHoraria: 32, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    // 6º Semestre
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001,QXD0007", curriculoId: curriculoRC2010.id },
    { nome: "ANÁLISE DE DESEMPENHO DE REDES DE COMPUTADORES", codigo: "QXD0093", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0086,QXD0012", curriculoId: curriculoRC2010.id },
    { nome: "GESTÃO DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO", codigo: "QXD0094", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "PROJETO INTEGRADO EM REDES DE COMPUTADORES", codigo: "QXD0095", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0033,QXD0092,QXD0085,QXD0084", curriculoId: curriculoRC2010.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0098", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0097", curriculoId: curriculoRC2010.id },
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "RCO0001", cargaHoraria: 192, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasRC2010 });

  // Disciplinas optativas do currículo RC 2010.1
  const optativasRC2010 = [
    { nome: "RELAÇOES ETNICO-RACIAIS E AFRICANIDADES", codigo: "PRG0002", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "PRG0003", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "PRG0004", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "DIFERENÇA E ENFRENTAMENTO PROFISSIONAL NAS DESIGUALDADES SOCIAIS", codigo: "PRG0005", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2010.id },
  ];
  await prisma.disciplina.createMany({ data: optativasRC2010 });

  console.log("Curso RC, currículo 2010.1 e disciplinas criados!");

    // Cria o currículo 2024.1 de Redes de Computadores
    const curriculoRC2024 = await prisma.curriculo.create({
      data: {
        nome: "Currículo 2024.1",
        ano: 2024,
        curso: { connect: { id: cursoRC.id } },
      }
    });
  
    // Disciplinas obrigatórias do currículo RC 2024.1
    const obrigatoriasRC2024 = [
      // 1º Semestre
      { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0250", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "INFORMÁTICA E ORGANIZAÇÃO DE COMPUTADORES", codigo: "QXD0261", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "REDES DE COMPUTADORES I", codigo: "QXD0263", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      // 2º Semestre
      { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2024.id },
      { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0056", curriculoId: curriculoRC2024.id },
      { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0261", curriculoId: curriculoRC2024.id },
      { nome: "REDES DE COMPUTADORES II", codigo: "QXD0264", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0263", curriculoId: curriculoRC2024.id },
      // 3º Semestre
      { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2024.id },
      { nome: "ADMINISTRAÇÃO DE SISTEMAS OPERACIONAIS", codigo: "QXD0265", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0013", curriculoId: curriculoRC2024.id },
      { nome: "LABORATÓRIO EM INFRAESTRUTURA DE REDES DE COMPUTADORES", codigo: "QXD0266", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0263", curriculoId: curriculoRC2024.id },
      { nome: "SEGURANÇA DA INFORMAÇÃO", codigo: "QXD0267", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0263", curriculoId: curriculoRC2024.id },
      // 4º Semestre
      { nome: "PROGRAMAÇÃO DE SCRIPT", codigo: "QXD0088", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2024.id },
      { nome: "REDES DE ALTA VELOCIDADE", codigo: "QXD0089", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0263", curriculoId: curriculoRC2024.id },
      { nome: "SERVIÇOS DE REDES DE COMPUTADORES", codigo: "QXD0092", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0265,QXD0267", curriculoId: curriculoRC2024.id },
      { nome: "GERÊNCIA DE REDES DE COMPUTADORES", codigo: "QXD0268", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0263", curriculoId: curriculoRC2024.id },
    // 5º Semestre
      { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0007,QXD0013", curriculoId: curriculoRC2024.id },
      { nome: "ANÁLISE DE DESEMPENHO DE REDES DE COMPUTADORES", codigo: "QXD0093", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0264,QXD0012", curriculoId: curriculoRC2024.id },
      { nome: "VIRTUALIZAÇÃO E REDES DEFINIDAS POR SOFTWARE", codigo: "QXD0269", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0264", curriculoId: curriculoRC2024.id },
      { nome: "REDES MÓVEIS E SEM FIO", codigo: "QXD0270", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0264", curriculoId: curriculoRC2024.id },
    // 6º Semestre
      { nome: "ATIVIDADES DE EXTENSÃO", codigo: "EXT0044", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0253", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0007", curriculoId: curriculoRC2024.id },
      { nome: "GERÊNCIA DE PROJETOS", codigo: "QXD0254", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "PROJETO INTEGRADO EM REDES DE COMPUTADORES", codigo: "QXD0271", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "QXD0268,QXD0092,QXD0093", curriculoId: curriculoRC2024.id },
      { nome: "EMPREENDEDORISMO", codigo: "QXD0510", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "ATIVIDADES COMPLEMENTARES", codigo: "RCO0002", cargaHoraria: 32, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
    ];
    await prisma.disciplina.createMany({ data: obrigatoriasRC2024 });
  
    // Disciplinas optativas do currículo RC 2024.1 (6º semestre)
    const optativasRC2024 = [
      { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0001", curriculoId: curriculoRC2024.id },
      { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0035", curriculoId: curriculoRC2024.id },
      { nome: "TÓPICOS AVANÇADOS EM BANCO DE DADOS", codigo: "QXD0047", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0011", curriculoId: curriculoRC2024.id },
      { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0265,QXD0092", curriculoId: curriculoRC2024.id },
      { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0096", cargaHoraria: 32, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0088,QXD0092", curriculoId: curriculoRC2024.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0097", cargaHoraria: 32, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0011", curriculoId: curriculoRC2024.id },
      { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "INTRODUÇÃO A ADMINISTRAÇÃO", codigo: "QXD0227", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0004", curriculoId: curriculoRC2024.id },
      { nome: "GESTÃO DA TECNOLOGIA DA INFORMAÇÃO", codigo: "QXD0230", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0248", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0272", cargaHoraria: 96, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0096", curriculoId: curriculoRC2024.id },
      { nome: "ESTÁGIO SUPERVISIONADO", codigo: "QXD0273", cargaHoraria: 160, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0088,QXD0092", curriculoId: curriculoRC2024.id },
      { nome: "PROJETO SOCIAL", codigo: "QXD0275", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2024.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0276", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "QXD0007,QXD0043", curriculoId: curriculoRC2024.id },
    ];
    await prisma.disciplina.createMany({ data: optativasRC2024 });
  
    console.log("Curso RC, currículo 2024.1 e disciplinas criados!");

      // Cria o curso de Sistemas de Informação se não existir
  let cursoSI = await prisma.curso.findFirst({ where: { codigo: "SI" } });
  if (!cursoSI) {
    cursoSI = await prisma.curso.create({
      data: {
        nome: "Sistemas de Informação",
        codigo: "SI"
      }
    });
  }

  // Cria o currículo 2014.1 de Sistemas de Informação
  const curriculoSI2014 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2014.1",
      ano: 2014,
      curso: { connect: { id: cursoSI.id } },
    }
  });

  // Disciplinas obrigatórias do currículo SI 2014.1
  const obrigatoriasSI2014 = [
    // 1º Semestre
    { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "INTRODUÇÃO A CIÊNCIA DA COMPUTAÇÃO E SISTEMAS DE INFORMAÇÃO", codigo: "QXD0002", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TEORIA GERAL DA ADMINISTRAÇÃO", codigo: "QXD0004", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    // 2º Semestre
    { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0109", curriculoId: curriculoSI2014.id },
    { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2014.id },
    { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2014.id },
    { nome: "TEORIA GERAL DE SISTEMAS", codigo: "QXD0009", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    // 3º Semestre
    { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2014.id },
    { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2014.id },
    { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0005", curriculoId: curriculoSI2014.id },
    // 4º Semestre
    { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0014", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "GESTÃO DA INFORMAÇÃO E DOS SISTEMAS DE INFORMAÇÃO", codigo: "QXD0015", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0009", curriculoId: curriculoSI2014.id },
    { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2014.id },
    // 5º Semestre
    { nome: "CONSTRUÇÃO DE SISTEMAS DE GERÊNCIA DE BANCO DE DADOS", codigo: "QXD0018", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2014.id },
    { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0019", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0014", curriculoId: curriculoSI2014.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    // 6º Semestre
    { nome: "AUDITORIA E SEGURANÇA DE SISTEMAS DE INFORMAÇÃO", codigo: "QXD0022", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "GERÊNCIA DE PROJETOS DE SOFTWARE", codigo: "QXD0023", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0019", curriculoId: curriculoSI2014.id },
    // 7º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0023,QXD0022", curriculoId: curriculoSI2014.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    // 8º Semestre
    { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0104", curriculoId: curriculoSI2014.id },
    { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0111", curriculoId: curriculoSI2014.id },
    { nome: "ATIVIDADES COMPLEMENTARES", codigo: "SINQ0001", cargaHoraria: 288, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasSI2014 });

  // Disciplinas optativas do currículo SI 2014.1 (8º semestre)
  const optativasSI2014 = [
    { nome: "RELAÇOES ETNICO-RACIAIS E AFRICANIDADES", codigo: "PRG0002", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "EDUCAÇÃO AMBIENTAL", codigo: "PRG0003", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "PRG0004", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "DIFERENÇA E ENFRENTAMENTO PROFISSIONAL NAS DESIGUALDADES SOCIAIS", codigo: "PRG0005", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "AVALIAÇÃO DE SISTEMAS", codigo: "QXD0024", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0016", curriculoId: curriculoSI2014.id },
    { nome: "CONTABILIDADE E CUSTOS", codigo: "QXD0026", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "ECONOMIA E FINANÇAS", codigo: "QXD0028", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "ÉTICA,DIREITO E LEGISLAÇÃO", codigo: "QXD0030", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "FILOSOFIA DA CIÊNCIA", codigo: "QXD0031", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "FUNÇÕES EMPRESARIAIS", codigo: "QXD0032", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "GERÊNCIA DE REDES", codigo: "QXD0033", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2014.id },
    { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0035", curriculoId: curriculoSI2014.id },
    { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0017", curriculoId: curriculoSI2014.id },
    { nome: "INTERFACE HUMANO-COMPUTADOR", codigo: "QXD0038", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "INTRODUÇÃO A COMPUTAÇÃO GRÁFICA", codigo: "QXD0039", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2014.id },
    { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2014.id },
    { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0010,QXD0008", curriculoId: curriculoSI2014.id },
    { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0042", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0019", curriculoId: curriculoSI2014.id },
    { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0013,QXD0021", curriculoId: curriculoSI2014.id },
    { nome: "SISTEMAS MULTIMÍDIA", codigo: "QXD0044", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "SOCIOLOGIA", codigo: "QXD0045", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS AVANÇADOS EM BANCO DE DADOS", codigo: "QXD0047", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011,QXD0014", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2014.id },
    { nome: "TRABALHO COOPERATIVO BASEADO EM COMPUTADORES", codigo: "QXD0049", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS ESPECIAIS I", codigo: "QXD0050", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS ESPECIAIS II", codigo: "QXD0051", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0061", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0014", curriculoId: curriculoSI2014.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0013,QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0020", curriculoId: curriculoSI2014.id },
    { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoSI2014.id },
    { nome: "PROJETO SOCIAL", codigo: "QXD0080", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2014.id },
    { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021,QXD0007", curriculoId: curriculoSI2014.id },
    { nome: "GOVERNANÇA ESTRATÉGICA DE TECNOLOGIA DA INFORMAÇÃO", codigo: "QXD0106", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0015", curriculoId: curriculoSI2014.id },
    { nome: "PROGRAMAÇÃO LINEAR", codigo: "QXD0107", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0010", curriculoId: curriculoSI2014.id },
    { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0154", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0004,QXD0009", curriculoId: curriculoSI2014.id },
    { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "GESTÃO DA PRODUÇÃO", codigo: "QXD0234", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
    { nome: "GESTÃO DE PESSOAS", codigo: "QXD0235", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2014.id },
  ];
  await prisma.disciplina.createMany({ data: optativasSI2014 });

  console.log("Curso SI, currículo 2014.1 e disciplinas criados!");

    // Cria o currículo 2019.1 de Sistemas de Informação
    const curriculoSI2019 = await prisma.curriculo.create({
      data: {
        nome: "Currículo 2019.1",
        ano: 2019,
        curso: { connect: { id: cursoSI.id } },
      }
    });
  
    // Disciplinas obrigatórias do currículo SI 2019.1
    const obrigatoriasSI2019 = [
    // 1º Semestre
      { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "INTRODUÇÃO A SISTEMAS DE INFORMAÇÃO", codigo: "QXD0226", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "INTRODUÇÃO A ADMINISTRAÇÃO", codigo: "QXD0227", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
    // 2º Semestre
      { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0109", curriculoId: curriculoSI2019.id },
      { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2019.id },
      { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2019.id },
      { nome: "SISTEMAS DE INFORMAÇÃO", codigo: "QXD0228", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0226,QXD0227", curriculoId: curriculoSI2019.id },
    // 3º Semestre
      { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2019.id },
      { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0005", curriculoId: curriculoSI2019.id },
      { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0014", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0154", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0226,QXD0227", curriculoId: curriculoSI2019.id },
    // 4º Semestre
      { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2019.id },
      { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0061", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0014", curriculoId: curriculoSI2019.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2019.id },
      { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0103", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO", codigo: "QXD0229", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0228", curriculoId: curriculoSI2019.id },
    // 5º Semestre
      { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2019.id },
      { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0019", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0014", curriculoId: curriculoSI2019.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0020", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2019.id },
      { nome: "AUDITORIA E SEGURANÇA DE SISTEMAS DE INFORMAÇÃO", codigo: "QXD0022", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DA TECNOLOGIA DA INFORMAÇÃO", codigo: "QXD0230", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0229", curriculoId: curriculoSI2019.id },
    // 6º Semestre
      { nome: "GERÊNCIA DE PROJETOS DE SOFTWARE", codigo: "QXD0023", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0014", curriculoId: curriculoSI2019.id },
      { nome: "EMPREENDEDORISMO", codigo: "QXD0029", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0221", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
    // 7º Semestre
      { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
    // 8º Semestre
      { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0104", curriculoId: curriculoSI2019.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0111", curriculoId: curriculoSI2019.id },
      { nome: "ATIVIDADES COMPLEMENTARES", codigo: "SIQXD0001", cargaHoraria: 192, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
    ];
    await prisma.disciplina.createMany({ data: obrigatoriasSI2019 });
  
    // Disciplinas optativas do currículo SI 2019.1 (8º semestre)
    const optativasSI2019 = [
      { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2019.id },
      { nome: "CONSTRUÇÃO DE SISTEMAS DE GERÊNCIA DE BANCO DE DADOS", codigo: "QXD0018", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2019.id },
      { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0016", curriculoId: curriculoSI2019.id },
      { nome: "CONTABILIDADE E CUSTOS", codigo: "QXD0026", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GERÊNCIA DE REDES", codigo: "QXD0033", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2019.id },
      { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0035", curriculoId: curriculoSI2019.id },
      { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0017", curriculoId: curriculoSI2019.id },
      { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2019.id },
      { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0010", curriculoId: curriculoSI2019.id },
      { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0042", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0019", curriculoId: curriculoSI2019.id },
      { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0013,QXD0021", curriculoId: curriculoSI2019.id },
      { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS AVANÇADOS EM BANCO DE DADOS", codigo: "QXD0047", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2019.id },
      { nome: "TRABALHO COOPERATIVO BASEADO EM COMPUTADORES", codigo: "QXD0049", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS ESPECIAIS I", codigo: "QXD0050", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS ESPECIAIS II", codigo: "QXD0051", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007,QXD0013", curriculoId: curriculoSI2019.id },
      { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0020", curriculoId: curriculoSI2019.id },
      { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2019.id },
      { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021,QXD0011", curriculoId: curriculoSI2019.id },
      { nome: "PROJETO SOCIAL", codigo: "QXD0080", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2019.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0102", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007,QXD0021", curriculoId: curriculoSI2019.id },
      { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0154", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0226,QXD0227", curriculoId: curriculoSI2019.id },
      { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DA PRODUÇÃO", codigo: "QXD0234", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "GESTÃO DE PESSOAS", codigo: "QXD0235", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
      { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2019.id },
    ];
    await prisma.disciplina.createMany({ data: optativasSI2019 });
  
    console.log("Curso SI, currículo 2019.1 e disciplinas criados!");

        // Cria o currículo 2023.1 de Sistemas de Informação
    const curriculoSI2023 = await prisma.curriculo.create({
      data: {
        nome: "Currículo 2023.1",
        ano: 2023,
        curso: { connect: { id: cursoSI.id } },
      }
    });

    // Disciplinas obrigatórias do currículo SI 2023.1
    const obrigatoriasSI2023 = [
    // 1º Semestre
      { nome: "FUNDAMENTOS DE PROGRAMAÇÃO", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "MATEMÁTICA BÁSICA", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "PRÉ-CÁLCULO", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "INTRODUÇÃO A ADMINISTRAÇÃO", codigo: "QXD0227", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "INTRODUÇÃO A SISTEMAS DE INFORMAÇÃO", codigo: "QXD0247", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    // 2º Semestre
      { nome: "ARQUITETURA DE COMPUTADORES", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I", codigo: "QXD0006", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0109", curriculoId: curriculoSI2023.id },
      { nome: "PROGRAMAÇÃO ORIENTADA A OBJETOS", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2023.id },
      { nome: "MATEMÁTICA DISCRETA", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2023.id },
      { nome: "SISTEMAS DE INFORMAÇÃO", codigo: "QXD0228", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0247,QXD0227", curriculoId: curriculoSI2023.id },
    // 3º Semestre
      { nome: "ESTRUTURA DE DADOS", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0001", curriculoId: curriculoSI2023.id },
      { nome: "FUNDAMENTOS DE BANCO DE DADOS", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "SISTEMAS OPERACIONAIS", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0005", curriculoId: curriculoSI2023.id },
      { nome: "ANÁLISE E PROJETO DE SISTEMAS", codigo: "QXD0248", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2023.id },
      { nome: "GESTÃO DE PROCESSOS DE NEGÓCIOS", codigo: "QXD0249", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0247,QXD0227", curriculoId: curriculoSI2023.id },
    // 4º Semestre
      { nome: "PROBABILIDADE E ESTATÍSTICA", codigo: "QXD0012", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0056", curriculoId: curriculoSI2023.id },
      { nome: "REDES DE COMPUTADORES", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA PERSISTENCIA", codigo: "QXD0099", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2023.id },
      { nome: "GESTÃO DA INFORMAÇÃO E DO CONHECIMENTO", codigo: "QXD0229", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0228", curriculoId: curriculoSI2023.id },
      { nome: "ÉTICA, DIREITO E LEGISLAÇÃO", codigo: "QXD0250", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "REQUISITOS DE SOFTWARE", codigo: "QXD0251", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0248", curriculoId: curriculoSI2023.id },
    // 5º Semestre
      { nome: "LÓGICA PARA COMPUTAÇÃO", codigo: "QXD0017", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2023.id },
      { nome: "AUDITORIA E SEGURANÇA DE SISTEMAS DE INFORMAÇÃO", codigo: "QXD0022", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "GESTÃO DA TECNOLOGIA DA INFORMAÇÃO", codigo: "QXD0230", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0229", curriculoId: curriculoSI2023.id },
      { nome: "ENGENHARIA DE SOFTWARE", codigo: "QXD0252", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0248", curriculoId: curriculoSI2023.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA WEB", codigo: "QXD0253", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2023.id },
    // 6º Semestre
      { nome: "GERÊNCIA DE PROJETOS", codigo: "QXD0254", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0248", curriculoId: curriculoSI2023.id },
      { nome: "EMPREENDEDORISMO", codigo: "QXD0255", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0256", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "PROJETO SOCIAL", codigo: "QXD0257", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      // 7º Semestre
      { nome: "ESTÁGIO SUPERVISIONADO I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "PROJETO DE PESQUISA CIENTÍFICA E TECNOLÓGICA", codigo: "QXD0110", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0254,QXD0253,QXD0230", curriculoId: curriculoSI2023.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      // 8º Semestre
      { nome: "UNIDADE CURRICULAR ESPECIAL DE EXTENSÃO", codigo: "EXT0017", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "ESTÁGIO SUPERVISIONADO II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0104", curriculoId: curriculoSI2023.id },
      { nome: "TRABALHO DE CONCLUSÃO DE CURSO II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "QXD0111", curriculoId: curriculoSI2023.id },
      { nome: "ATIVIDADES COMPLEMENTARES", codigo: "SIQXD0002", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    ];
    await prisma.disciplina.createMany({ data: obrigatoriasSI2023 });

    // Disciplinas optativas do currículo SI 2023.1 (8º semestre)
    const optativasSI2023 = [
      { nome: "LINGUAGENS DE PROGRAMAÇÃO", codigo: "QXD0016", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007", curriculoId: curriculoSI2023.id },
      { nome: "CONSTRUÇÃO DE SISTEMAS DE GERÊNCIA DE BANCO DE DADOS", codigo: "QXD0018", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011", curriculoId: curriculoSI2023.id },
      { nome: "COMPILADORES", codigo: "QXD0025", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0016", curriculoId: curriculoSI2023.id },
      { nome: "CONTABILIDADE E CUSTOS", codigo: "QXD0026", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "E-BUSINESS", codigo: "QXD0027", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "GERÊNCIA DE REDES", codigo: "QXD0033", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2023.id },
      { nome: "INGLÊS INSTRUMENTAL I", codigo: "QXD0035", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "INGLÊS INSTRUMENTAL II", codigo: "QXD0036", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0035", curriculoId: curriculoSI2023.id },
      { nome: "INTELIGÊNCIA ARTIFICIAL", codigo: "QXD0037", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0017", curriculoId: curriculoSI2023.id },
      { nome: "LINGUAGENS FORMAIS E AUTOMATOS", codigo: "QXD0040", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2023.id },
      { nome: "PROJETO E ANÁLISE DE ALGORITMOS", codigo: "QXD0041", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0010", curriculoId: curriculoSI2023.id },
      { nome: "QUALIDADE DE SOFTWARE", codigo: "QXD0259", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0252", curriculoId: curriculoSI2023.id },
      { nome: "SISTEMAS DISTRIBUÍDOS", codigo: "QXD0043", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0013,QXD0021", curriculoId: curriculoSI2023.id },
      { nome: "TEORIA DA COMPUTAÇÃO", codigo: "QXD0046", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0008", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS AVANÇADOS EM BANCO DE DADOS", codigo: "QXD0047", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0011,QXD0248", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS AVANÇADOS EM REDES DE COMPUTADORES", codigo: "QXD0048", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0021", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS ESPECIAIS I", codigo: "QXD0050", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS ESPECIAIS II", codigo: "QXD0051", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS ESPECIAIS III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "TÓPICOS ESPECIAIS IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE CONCORRENTE", codigo: "QXD0074", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0007,QXD0013", curriculoId: curriculoSI2023.id },
      { nome: "REDES SOCIAIS", codigo: "QXD0075", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0253", curriculoId: curriculoSI2023.id },
      { nome: "SISTEMAS MULTIAGENTES", codigo: "QXD0076", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS", codigo: "QXD0078", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "COMPUTAÇÃO EM NUVEM", codigo: "QXD0079", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "LÍNGUA BRASILEIRA DE SINAIS - LIBRAS", codigo: "QXD0113", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "ÁLGEBRA LINEAR", codigo: "QXD0116", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II", codigo: "QXD0134", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0006", curriculoId: curriculoSI2023.id },
      { nome: "APRENDIZADO DE MÁQUINA", codigo: "QXD0176", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "MINERAÇÃO DE DADOS", codigo: "QXD0178", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "MARKETING", codigo: "QXD0206", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "SOCIOLOGIA E ANTROPOLOGIA", codigo: "QXD0210", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "SISTEMAS COLABORATIVOS", codigo: "QXD0231", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "EDUCAÇÃO AMBIENTAL", codigo: "QXD0232", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "FINANÇAS", codigo: "QXD0233", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "GESTÃO DA PRODUÇÃO", codigo: "QXD0234", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "GESTÃO DE PESSOAS", codigo: "QXD0235", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "EDUCAÇÃO EM DIREITOS HUMANOS", codigo: "QXD0245", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "RELAÇÕES ÉTNICO-RACIAIS E AFRICANIDADES", codigo: "QXD0246", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA DISPOSITIVOS MÓVEIS", codigo: "QXD0276", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
      { nome: "DESENVOLVIMENTO DE SOFTWARE PARA A WEB 2", codigo: "QXD0279", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "QXD0253,QXD0011", curriculoId: curriculoSI2023.id },
      { nome: "AVALIAÇÃO DA INTERAÇÃO HUMANO-COMPUTADOR", codigo: "QXD0505", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    ];
    await prisma.disciplina.createMany({ data: optativasSI2023 });

    console.log("Curso SI, currículo 2023.1 e disciplinas criados!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 