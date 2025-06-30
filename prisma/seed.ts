import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Limpa o banco antes de popular
  await prisma.disciplina.deleteMany();
  await prisma.curriculo.deleteMany();
  await prisma.curso.deleteMany();

  // Cria o curso de Engenharia de Software
  const cursoES = await prisma.curso.create({
    data: {
      nome: "Engenharia de Software",
      codigo: "ES"
    }
  });

  // Cria o curso de Ciência da Computação
  const cursoCC = await prisma.curso.create({
    data: {
      nome: "Ciência da Computação",
      codigo: "CC"
    }
  });

  // Currículos de CC
  const curriculoCC2024 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2024",
      ano: 2024,
      curso: { connect: { id: cursoCC.id } },
    }
  });
  const curriculoCC2013 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2013.1",
      ano: 2013,
      curso: { connect: { id: cursoCC.id } },
    }
  });

  // Currículo de ES
  const curriculoES = await prisma.curriculo.create({
    data: {
      nome: "Currículo ES",
      ano: 2024,
      curso: { connect: { id: cursoES.id } },
    }
  });

  // Disciplinas obrigatórias do currículo ES
  const obrigatoriasES = [
    // 1º Semestre
    { nome: "Introdução à Engenharia de Software", codigo: "QXD0236", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Matemática Básica", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Fundamentos de Banco de Dados", codigo: "QXD0011", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Ética, Direito e Legislação", codigo: "QXD0103", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 2º Semestre
    { nome: "Programação Orientada a Objetos", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES.id },
    { nome: "Arquitetura de Computadores", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Processos de Software", codigo: "QXD0060", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0001", curriculoId: curriculoES.id },
    { nome: "Matemática Discreta", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES.id },
    { nome: "Probabilidade e Estatística", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0056", curriculoId: curriculoES.id },
    // 3º Semestre
    { nome: "Lógica para Computação", codigo: "QXD0017", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0008", curriculoId: curriculoES.id },
    { nome: "Estrutura de Dados", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES.id },
    { nome: "Linguagens de Programação", codigo: "QXD0016", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010", curriculoId: curriculoES.id },
    { nome: "Análise e Projeto de Sistemas", codigo: "QXD0014", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010", curriculoId: curriculoES.id },
    { nome: "Desenvolvimento de Software para Web", codigo: "QXD0020", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES.id },
    { nome: "Redes de Computadores", codigo: "QXD0021", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0005", curriculoId: curriculoES.id },
    // 4º Semestre
    { nome: "Projeto Detalhado de Software", codigo: "QXD0058", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0014", curriculoId: curriculoES.id },
    { nome: "Projeto e Análise de Algoritmos", codigo: "QXD0041", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0010", curriculoId: curriculoES.id },
    { nome: "Desenvolvimento de Software para Dispositivos Móveis", codigo: "QXD0102", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0007", curriculoId: curriculoES.id },
    { nome: "Qualidade de Software", codigo: "QXD0042", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Gerência de Projetos de Software", codigo: "QXD0023", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Verificação e Validação", codigo: "QXD0063", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 5º Semestre
    { nome: "Requisitos de Software", codigo: "QXD0061", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Interação Humano-Computador", codigo: "QXD0221", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Sistemas Operacionais", codigo: "QXD0013", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0005", curriculoId: curriculoES.id },
    { nome: "Arquitetura de Software", codigo: "QXD0064", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Empreendedorismo", codigo: "QXD0029", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 6º Semestre
    { nome: "Compiladores", codigo: "QXD0025", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0046", curriculoId: curriculoES.id },
    { nome: "Teoria da Computação", codigo: "QXD0046", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0016", curriculoId: curriculoES.id },
    { nome: "Reuso de Software", codigo: "QXD0068", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0023", curriculoId: curriculoES.id },
    { nome: "Manutenção de Software", codigo: "QXD0062", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 7º Semestre
    { nome: "Projeto de Pesquisa Científica e Tecnológica (TCC I)", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Estágio Supervisionado I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Gerência de Configuração", codigo: "QXD0066", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 8º Semestre
    { nome: "TCC II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0111", curriculoId: curriculoES.id },
    { nome: "Estágio Supervisionado II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoES.id, preRequisitos: "QXD0104", curriculoId: curriculoES.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasES });

  // Disciplinas optativas de ES
  const optativasES = [
    // 5º Semestre
    { nome: "Optativa ES 1", codigo: "OPTES-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 2", codigo: "OPTES-6-1", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 3", codigo: "OPTES-7-1", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 4", codigo: "OPTES-7-2", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 5", codigo: "OPTES-7-3", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    // 8º Semestre
    { nome: "Optativa ES 6", codigo: "OPTES-8-1", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 7", codigo: "OPTES-8-2", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 8", codigo: "OPTES-8-3", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
    { nome: "Optativa ES 9", codigo: "OPTES-8-4", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoES.id, preRequisitos: "", curriculoId: curriculoES.id },
  ];
  await prisma.disciplina.createMany({ data: optativasES });

  // Disciplinas obrigatórias do currículo 2024 de CC (exemplo)
  const obrigatoriasCC2024 = [
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Introdução à Ciência da Computação", codigo: "QXD0108", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Arquitetura de Computadores", codigo: "QXD0005", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Matemática Básica", codigo: "QXD0065", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Pré-Cálculo", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0065", curriculoId: curriculoCC2024.id },
    { nome: "Ética, Direito e Legislação", codigo: "QXD0013", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    // ... adicione mais disciplinas conforme sua grade real ...
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasCC2024 });

  // Disciplinas obrigatórias do currículo 2013.1 de CC (exemplo)
  const obrigatoriasCC2013 = [
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "Introdução à Ciência da Computação", codigo: "QXD0108", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "Arquitetura de Computadores", codigo: "QXD0005", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "Matemática Básica", codigo: "QXD0065", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "Pré-Cálculo", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "QXD0065", curriculoId: curriculoCC2013.id },
    { nome: "Ética, Direito e Legislação", codigo: "QXD0013", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    // ... adicione mais disciplinas conforme sua grade real ...
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasCC2013 });

  // Disciplinas optativas de CC (exemplo)
  const optativasCC2024 = [
    { nome: "Optativa CC 1", codigo: "OPTCC-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Optativa CC 2", codigo: "OPTCC-6-1", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Optativa CC 3", codigo: "OPTCC-7-1", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
    { nome: "Optativa CC 4", codigo: "OPTCC-8-1", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2024.id },
  ];
  await prisma.disciplina.createMany({ data: optativasCC2024 });

  const optativasCC2013 = [
    { nome: "Optativa CC 2013 1", codigo: "OPTCC13-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
    { nome: "Optativa CC 2013 2", codigo: "OPTCC13-6-1", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoCC.id, preRequisitos: "", curriculoId: curriculoCC2013.id },
  ];
  await prisma.disciplina.createMany({ data: optativasCC2013 });

  console.log("Cursos, currículos e disciplinas criados!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 