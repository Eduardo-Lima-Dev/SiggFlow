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

  // Criação do curso de Sistemas de Informação
  const cursoSI = await prisma.curso.create({
    data: {
      nome: "Sistemas de Informação",
      codigo: "SI"
    }
  });

  // Criação do curso de Design Digital
  const cursoDD = await prisma.curso.create({
    data: {
      nome: "Design Digital",
      codigo: "DD"
    }
  });

  // Criação do curso de Engenharia de Computação
  const cursoEC = await prisma.curso.create({
    data: {
      nome: "Engenharia de Computação",
      codigo: "EC"
    }
  });

  // Criação do curso de Redes de Computadores
  const cursoRC = await prisma.curso.create({
    data: {
      nome: "Redes de Computadores",
      codigo: "RC"
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

  // Currículo 2023.1 de SI
  const curriculoSI2023 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2023.1",
      ano: 2023,
      curso: { connect: { id: cursoSI.id } },
    }
  });

  // Currículo 2018.2 de SI
  const curriculoSI2018 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2018.2",
      ano: 2018,
      curso: { connect: { id: cursoSI.id } },
    }
  });

  // Currículo 2018.2 de Design Digital
  const curriculoDD2018 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2018.2",
      ano: 2018,
      curso: { connect: { id: cursoDD.id } },
    }
  });

  // Currículo 2018.2 de Engenharia de Computação
  const curriculoEC2018 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2018.2",
      ano: 2018,
      curso: { connect: { id: cursoEC.id } },
    }
  });

  // Currículo 2018.2 de Redes de Computadores
  const curriculoRC2018 = await prisma.curriculo.create({
    data: {
      nome: "Currículo 2018.2",
      ano: 2018,
      curso: { connect: { id: cursoRC.id } },
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

  // Disciplinas obrigatórias de SI 2023.1
  const obrigatoriasSI2023 = [
    // 1º Semestre
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Introdução à Administração", codigo: "QXD0227", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Introdução a Sistemas de Informação", codigo: "QXD0247", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Pré-Cálculo", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Básica", curriculoId: curriculoSI2023.id },
    { nome: "Matemática Básica", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    // 2º Semestre
    { nome: "Arquitetura de Computadores", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Programação Orientada a Objetos", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Fundamentos de Programação", curriculoId: curriculoSI2023.id },
    { nome: "Sistemas de Informação", codigo: "QXD0228", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Introdução a Sistemas de Informação", curriculoId: curriculoSI2023.id },
    { nome: "Cálculo Diferencial e Integral I", codigo: "QXD0066", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Pré-Cálculo", curriculoId: curriculoSI2023.id },
    { nome: "Matemática Discreta", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Básica", curriculoId: curriculoSI2023.id },
    // 3º Semestre
    { nome: "Estrutura de Dados", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Programação Orientada a Objetos", curriculoId: curriculoSI2023.id },
    { nome: "Sistemas Operacionais", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Arquitetura de Computadores", curriculoId: curriculoSI2023.id },
    { nome: "Análise e Projeto de Sistemas", codigo: "QXD0248", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados; Sistemas de Informação", curriculoId: curriculoSI2023.id },
    { nome: "Fundamentos de Banco de Dados", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Gestão de Processos de Negócios", codigo: "QXD0249", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Introdução à Administração", curriculoId: curriculoSI2023.id },
    // 4º Semestre
    { nome: "Ética, Direito e Legislação", codigo: "QXD0250", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Redes de Computadores", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Sistemas Operacionais", curriculoId: curriculoSI2023.id },
    { nome: "Requisitos de Software", codigo: "QXD0251", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2023.id },
    { nome: "Desenvolvimento de Software para Persistência", codigo: "QXD0009", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Fundamentos de Banco de Dados", curriculoId: curriculoSI2023.id },
    { nome: "Gestão da Informação e do Conhecimento", codigo: "QXD0229", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2023.id },
    { nome: "Probabilidade e Estatística", codigo: "QXD0012", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Discreta", curriculoId: curriculoSI2023.id },
    // 5º Semestre
    { nome: "Auditoria e Segurança de SI", codigo: "QXD0022", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Gestão de Processos de Negócios", curriculoId: curriculoSI2023.id },
    { nome: "Educação Ambiental", codigo: "PRG0003", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Desenvolvimento de Software para Web", codigo: "QXD0253", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2023.id },
    { nome: "Engenharia de Software", codigo: "QXD0252", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2023.id },
    { nome: "Gestão da TI", codigo: "QXD0230", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Gestão da Informação e do Conhecimento", curriculoId: curriculoSI2023.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasSI2023 });

  // Disciplinas optativas de SI 2023.1
  const optativasSI2023 = [
    // 5º Semestre
    { nome: "Optativa", codigo: "OPTSI-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    // 6º Semestre
    { nome: "Desenvolvimento para Dispositivos Móveis", codigo: "QXD0258", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Programação Orientada a Objetos", curriculoId: curriculoSI2023.id },
    { nome: "Desenvolvimento de Software Concorrente", codigo: "QXD0074", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Linguagens de Programação", curriculoId: curriculoSI2023.id },
    // 7º Semestre
    { nome: "Projeto e Análise de Algoritmos", codigo: "QXD0041", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados Avançada", curriculoId: curriculoSI2023.id },
    { nome: "Tópicos Avançados em Redes de Computadores", codigo: "QXD0048", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Redes de Computadores", curriculoId: curriculoSI2023.id },
    { nome: "Sistemas Distribuídos", codigo: "QXD0043", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Redes de Computadores", curriculoId: curriculoSI2023.id },
    // 8º Semestre
    { nome: "Sistemas Multimídia", codigo: "QXD0044", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Computação Gráfica / Redes de Computadores", curriculoId: curriculoSI2023.id },
    { nome: "Tópicos Especiais III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Variações conforme o tópico", curriculoId: curriculoSI2023.id },
    { nome: "Tópicos Especiais IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Variações conforme o tópico", curriculoId: curriculoSI2023.id },
  ];
  await prisma.disciplina.createMany({ data: optativasSI2023 });

  // Disciplinas obrigatórias finais de SI (6º, 7º e 8º semestres)
  const obrigatoriasFinaisSI2023 = [
    // 6º Semestre
    { nome: "Interação Humano-Computador", codigo: "QXD0256", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2023.id },
    { nome: "Gerência de Projetos de Software", codigo: "QXD0254", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Engenharia de Software", curriculoId: curriculoSI2023.id },
    { nome: "Linguagens de Programação", codigo: "QXD0016", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados", curriculoId: curriculoSI2023.id },
    { nome: "Compiladores", codigo: "QXD0025", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Teoria da Computação", curriculoId: curriculoSI2023.id },
    // 7º Semestre
    { nome: "Avaliação da Interação Humano-Computador", codigo: "QXD0260", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Interação Humano-Computador", curriculoId: curriculoSI2023.id },
    { nome: "TCC I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    { nome: "Estágio Supervisionado I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2023.id },
    // 8º Semestre
    { nome: "TCC II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "TCC I", curriculoId: curriculoSI2023.id },
    { nome: "Estágio Supervisionado II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estágio I", curriculoId: curriculoSI2023.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasFinaisSI2023 });

  // Disciplinas obrigatórias de SI 2018.2
  const obrigatoriasSI2018 = [
    // 1º Semestre
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Introdução à Administração", codigo: "QXD0227", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Introdução a Sistemas de Informação", codigo: "QXD0247", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Pré-Cálculo", codigo: "QXD0109", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Básica", curriculoId: curriculoSI2018.id },
    { nome: "Matemática Básica", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    // 2º Semestre
    { nome: "Arquitetura de Computadores", codigo: "QXD0005", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Programação Orientada a Objetos", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Fundamentos de Programação", curriculoId: curriculoSI2018.id },
    { nome: "Sistemas de Informação", codigo: "QXD0228", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Introdução a Sistemas de Informação", curriculoId: curriculoSI2018.id },
    { nome: "Cálculo Diferencial e Integral I", codigo: "QXD0066", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Pré-Cálculo", curriculoId: curriculoSI2018.id },
    { nome: "Matemática Discreta", codigo: "QXD0008", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Básica", curriculoId: curriculoSI2018.id },
    // 3º Semestre
    { nome: "Estrutura de Dados", codigo: "QXD0010", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Programação Orientada a Objetos", curriculoId: curriculoSI2018.id },
    { nome: "Sistemas Operacionais", codigo: "QXD0013", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Arquitetura de Computadores", curriculoId: curriculoSI2018.id },
    { nome: "Análise e Projeto de Sistemas", codigo: "QXD0248", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados; Sistemas de Informação", curriculoId: curriculoSI2018.id },
    { nome: "Fundamentos de Banco de Dados", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Gestão de Processos de Negócios", codigo: "QXD0249", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Introdução à Administração", curriculoId: curriculoSI2018.id },
    // 4º Semestre
    { nome: "Ética, Direito e Legislação", codigo: "QXD0250", cargaHoraria: 32, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Redes de Computadores", codigo: "QXD0021", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Sistemas Operacionais", curriculoId: curriculoSI2018.id },
    { nome: "Requisitos de Software", codigo: "QXD0251", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2018.id },
    { nome: "Desenvolvimento de Software para Persistência", codigo: "QXD0009", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Fundamentos de Banco de Dados", curriculoId: curriculoSI2018.id },
    { nome: "Gestão da Informação e do Conhecimento", codigo: "QXD0229", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2018.id },
    { nome: "Probabilidade e Estatística", codigo: "QXD0012", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Matemática Discreta", curriculoId: curriculoSI2018.id },
    // 5º Semestre
    { nome: "Auditoria e Segurança de SI", codigo: "QXD0022", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Gestão de Processos de Negócios", curriculoId: curriculoSI2018.id },
    { nome: "Educação Ambiental", codigo: "PRG0003", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Desenvolvimento de Software para Web", codigo: "QXD0020", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2018.id },
    { nome: "Engenharia de Software", codigo: "QXD0019", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2018.id },
    { nome: "Gestão da TI", codigo: "QXD0230", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Gestão da Informação e do Conhecimento", curriculoId: curriculoSI2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasSI2018 });

  // Disciplinas optativas de SI 2018.2
  const optativasSI2018 = [
    // 5º Semestre
    { nome: "Optativa", codigo: "OPTSI18-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    // 6º Semestre
    { nome: "Desenvolvimento para Dispositivos Móveis", codigo: "QXD0102", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Programação Orientada a Objetos", curriculoId: curriculoSI2018.id },
    { nome: "Desenvolvimento de Software Concorrente", codigo: "QXD0074", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Linguagens de Programação", curriculoId: curriculoSI2018.id },
    { nome: "Compiladores", codigo: "QXD0025", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Teoria da Computação", curriculoId: curriculoSI2018.id },
    // 7º Semestre
    { nome: "Projeto e Análise de Algoritmos", codigo: "QXD0041", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados Avançada", curriculoId: curriculoSI2018.id },
    { nome: "Tópicos Avançados em Redes de Computadores", codigo: "QXD0048", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Redes de Computadores", curriculoId: curriculoSI2018.id },
    { nome: "Sistemas Distribuídos", codigo: "QXD0043", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Redes de Computadores", curriculoId: curriculoSI2018.id },
    // 8º Semestre
    { nome: "Sistemas Multimídia", codigo: "QXD0044", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Computação Gráfica / Redes de Computadores", curriculoId: curriculoSI2018.id },
    { nome: "Tópicos Especiais III", codigo: "QXD0052", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Variações conforme o tópico", curriculoId: curriculoSI2018.id },
    { nome: "Tópicos Especiais IV", codigo: "QXD0053", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoSI.id, preRequisitos: "Variações conforme o tópico", curriculoId: curriculoSI2018.id },
  ];
  await prisma.disciplina.createMany({ data: optativasSI2018 });

  // Disciplinas obrigatórias finais de SI 2018.2
  const obrigatoriasFinaisSI2018 = [
    // 6º Semestre
    { nome: "Interação Humano-Computador", codigo: "QXD0221", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Análise e Projeto de Sistemas", curriculoId: curriculoSI2018.id },
    { nome: "Gerência de Projetos de Software", codigo: "QXD0023", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Engenharia de Software", curriculoId: curriculoSI2018.id },
    { nome: "Linguagens de Programação", codigo: "QXD0016", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estrutura de Dados", curriculoId: curriculoSI2018.id },
    // 7º Semestre
    { nome: "Avaliação da Interação Humano-Computador", codigo: "QXD0189", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Interação Humano-Computador", curriculoId: curriculoSI2018.id },
    { nome: "TCC I", codigo: "QXD0111", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    { nome: "Estágio Supervisionado I", codigo: "QXD0104", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "", curriculoId: curriculoSI2018.id },
    // 8º Semestre
    { nome: "TCC II", codigo: "QXD0112", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "TCC I", curriculoId: curriculoSI2018.id },
    { nome: "Estágio Supervisionado II", codigo: "QXD0105", cargaHoraria: 160, semestre: 8, obrigatoria: true, cursoId: cursoSI.id, preRequisitos: "Estágio Supervisionado I", curriculoId: curriculoSI2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasFinaisSI2018 });

  // Disciplinas obrigatórias de Design Digital 2018.2
  const obrigatoriasDD2018 = [
    // 1º Semestre
    { nome: "Desenho I", codigo: "QXD0121", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Psicologia e Percepção", codigo: "QXD0126", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "História da Arte", codigo: "QXD0122", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Introdução à Programação para Design", codigo: "QXD0125", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Multimídia", codigo: "QXD0124", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 2º Semestre
    { nome: "Comunicação Visual I", codigo: "QXD0127", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Desenho II", codigo: "QXD0128", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0121", curriculoId: curriculoDD2018.id },
    { nome: "História do Design", codigo: "QXD0130", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0122", curriculoId: curriculoDD2018.id },
    { nome: "Programação para Design", codigo: "QXD0129", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0125", curriculoId: curriculoDD2018.id },
    { nome: "Edição Digital de Imagens", codigo: "QXD-01", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 3º Semestre
    { nome: "Interação Humano-Computador", codigo: "QXD-02", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Modelagem Tridimensional", codigo: "QXD-03", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0128", curriculoId: curriculoDD2018.id },
    { nome: "Projeto Integrado I", codigo: "QXD-04", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Semiótica", codigo: "QXD0161", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Sociedade, Culturas e Tecnologias", codigo: "QXD0162", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 4º Semestre
    { nome: "Avaliação da Interação Humano-Computador", codigo: "QXD-05", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD-02", curriculoId: curriculoDD2018.id },
    { nome: "Comunicação Visual II", codigo: "QXD0163", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2018.id },
    { nome: "Direção de Arte", codigo: "QXD-06", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0127", curriculoId: curriculoDD2018.id },
    { nome: "Linguagens de Marcação e Scripts", codigo: "QXD0164", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0129", curriculoId: curriculoDD2018.id },
    { nome: "Projeto Integrado II", codigo: "QXD-07", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD-04", curriculoId: curriculoDD2018.id },
    // 5º Semestre
    { nome: "Ética e Legislação", codigo: "QXD-08", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Processos de Criação", codigo: "QXD0192", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Projeto Integrado III", codigo: "QXD-09", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD-07", curriculoId: curriculoDD2018.id },
    { nome: "Projeto de Interfaces Web", codigo: "QXD0193", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2018.id },
    { nome: "Tipografia", codigo: "QXD0191", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 6º Semestre
    { nome: "Design e Inovação", codigo: "QXD0195", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0192", curriculoId: curriculoDD2018.id },
    { nome: "Concepção e Desenvolvimento de Produtos", codigo: "QXD0198", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Empreendedorismo", codigo: "QXD-10", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Projeto de Interfaces para Dispositivos Móveis", codigo: "QXD0197", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0164", curriculoId: curriculoDD2018.id },
    { nome: "Projeto Integrado IV", codigo: "QXD-11", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD-09", curriculoId: curriculoDD2018.id },
    // 7º Semestre
    { nome: "Projeto Técnico-Científico em Design Digital", codigo: "QXD0215", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD-11", curriculoId: curriculoDD2018.id },
    { nome: "Trabalho de Conclusão de Curso I", codigo: "QXD0216", cargaHoraria: 32, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Estágio Supervisionado I", codigo: "QXD0213", cargaHoraria: 160, semestre: 7, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 8º Semestre
    { nome: "Trabalho de Conclusão de Curso II", codigo: "QXD0217", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoDD.id, preRequisitos: "QXD0216", curriculoId: curriculoDD2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasDD2018 });

  // Disciplinas optativas de Design Digital 2018.2
  const optativasDD2018 = [
    // 7º Semestre
    { nome: "Optativa 1", codigo: "OPTDD-7-1", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 2", codigo: "OPTDD-7-2", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 3", codigo: "OPTDD-7-3", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 4", codigo: "OPTDD-7-4", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    // 8º Semestre
    { nome: "Optativa 5", codigo: "OPTDD-8-1", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 6", codigo: "OPTDD-8-2", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 7", codigo: "OPTDD-8-3", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 8", codigo: "OPTDD-8-4", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
    { nome: "Optativa 9", codigo: "OPTDD-8-5", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoDD.id, preRequisitos: "", curriculoId: curriculoDD2018.id },
  ];
  await prisma.disciplina.createMany({ data: optativasDD2018 });

  // Disciplinas obrigatórias de Engenharia de Computação 2018.2
  const obrigatoriasEC2018 = [
    // 1º Semestre
    { nome: "Introdução à Engenharia de Computação", codigo: "QXD0118", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 144, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Circuitos Digitais", codigo: "QXD0117", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Ética, Direito e Legislação", codigo: "QXD0103", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Matemática Básica", codigo: "QXD0056", cargaHoraria: 128, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Pré-Cálculo", codigo: "QXD0109", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    // 2º Semestre
    { nome: "Álgebra Linear", codigo: "QXD0116", cargaHoraria: 80, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Introdução à Arquitetura de Computadores", codigo: "QXD0142", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2018.id },
    { nome: "Estrutura de Dados", codigo: "QXD0010", cargaHoraria: 96, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0001", curriculoId: curriculoEC2018.id },
    { nome: "Cálculo Diferencial e Integral I", codigo: "QXD0006", cargaHoraria: 128, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0109", curriculoId: curriculoEC2018.id },
    { nome: "Matemática Discreta", codigo: "QXD0008", cargaHoraria: 128, semestre: 2, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2018.id },
    // 3º Semestre
    { nome: "Arquitetura e Organização de Computadores I", codigo: "QXD0132", cargaHoraria: 80, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0142", curriculoId: curriculoEC2018.id },
    { nome: "Técnicas de Programação para Sistemas Embarcados I", codigo: "QXD0149", cargaHoraria: 96, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0010", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas Operacionais I", codigo: "QXD0147", cargaHoraria: 80, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0010", curriculoId: curriculoEC2018.id },
    { nome: "Cálculo Diferencial e Integral II", codigo: "QXD0134", cargaHoraria: 128, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0006", curriculoId: curriculoEC2018.id },
    { nome: "Probabilidade e Estatística", codigo: "QXD0012", cargaHoraria: 128, semestre: 3, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0056", curriculoId: curriculoEC2018.id },
    // 4º Semestre
    { nome: "Arquitetura e Organização de Computadores II", codigo: "QXD0133", cargaHoraria: 80, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0132", curriculoId: curriculoEC2018.id },
    { nome: "Técnicas de Programação para Sistemas Embarcados II", codigo: "QXD0150", cargaHoraria: 96, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0149", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas Operacionais II", codigo: "QXD0148", cargaHoraria: 80, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0147", curriculoId: curriculoEC2018.id },
    { nome: "Equações Diferenciais", codigo: "QXD0140", cargaHoraria: 128, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0116", curriculoId: curriculoEC2018.id },
    { nome: "Cálculo Diferencial e Integral III", codigo: "QXD0135", cargaHoraria: 128, semestre: 4, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0134", curriculoId: curriculoEC2018.id },
    // 5º Semestre
    { nome: "Microcontroladores", codigo: "QXD0143", cargaHoraria: 48, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0133", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas Digitais para Computadores", codigo: "QXD0146", cargaHoraria: 80, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2018.id },
    { nome: "Análise de Circuitos", codigo: "QXD0131", cargaHoraria: 80, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0117", curriculoId: curriculoEC2018.id },
    { nome: "Lógica para Computação", codigo: "QXD0017", cargaHoraria: 80, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2018.id },
    { nome: "Eletricidade e Magnetismo", codigo: "QXD0136", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0135", curriculoId: curriculoEC2018.id },
    { nome: "Engenharia de Software", codigo: "QXD0139", cargaHoraria: 80, semestre: 5, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0150", curriculoId: curriculoEC2018.id },
    // 6º Semestre
    { nome: "Redes de Computadores", codigo: "QXD0021", cargaHoraria: 80, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Sinais e Sistemas", codigo: "QXD0144", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2018.id },
    { nome: "Eletrônica Fundamental I", codigo: "QXD0137", cargaHoraria: 80, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0131", curriculoId: curriculoEC2018.id },
    { nome: "Linguagens Formais e Autômatos", codigo: "QXD0040", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0008", curriculoId: curriculoEC2018.id },
    // 7º Semestre
    { nome: "Eletrônica Fundamental II", codigo: "QXD0138", cargaHoraria: 96, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0137", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas Distribuídos", codigo: "QXD0043", cargaHoraria: 96, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0021", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas de Automação e Controle", codigo: "QXD0151", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0144", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas de Tempo-Real", codigo: "QXD0145", cargaHoraria: 64, semestre: 7, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0148", curriculoId: curriculoEC2018.id },
    // 8º Semestre
    { nome: "Instrumentação", codigo: "QXD0141", cargaHoraria: 96, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0137", curriculoId: curriculoEC2018.id },
    { nome: "Sistemas Embarcados", codigo: "QXD0214", cargaHoraria: 64, semestre: 8, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145", curriculoId: curriculoEC2018.id },
    // 9º Semestre
    { nome: "Trabalho de Conclusão de Curso I", codigo: "QXD0219", cargaHoraria: 48, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Projeto de Pesquisa Científica e Tecnológica", codigo: "QXD0110", cargaHoraria: 48, semestre: 9, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0145;QXD0141", curriculoId: curriculoEC2018.id },
    // 10º Semestre
    { nome: "Trabalho de Conclusão de Curso II", codigo: "QXD0220", cargaHoraria: 144, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "QXD0219", curriculoId: curriculoEC2018.id },
    { nome: "Atividades Complementares", codigo: "ENCQ0001", cargaHoraria: 192, semestre: 10, obrigatoria: true, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasEC2018 });

  // Disciplinas optativas de Engenharia de Computação 2018.2
  const optativasEC2018 = [
    // 6º Semestre
    { nome: "Optativa", codigo: "OPTEC-6-1", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    // 7º Semestre
    { nome: "Optativa", codigo: "OPTEC-7-1", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-7-2", cargaHoraria: 64, semestre: 7, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    // 8º Semestre
    { nome: "Optativa", codigo: "OPTEC-8-1", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-8-2", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-8-3", cargaHoraria: 64, semestre: 8, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    // 9º Semestre
    { nome: "Optativa", codigo: "OPTEC-9-1", cargaHoraria: 64, semestre: 9, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-9-2", cargaHoraria: 64, semestre: 9, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-9-3", cargaHoraria: 64, semestre: 9, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-9-4", cargaHoraria: 64, semestre: 9, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    // 10º Semestre
    { nome: "Optativa", codigo: "OPTEC-10-1", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
    { nome: "Optativa", codigo: "OPTEC-10-2", cargaHoraria: 64, semestre: 10, obrigatoria: false, cursoId: cursoEC.id, preRequisitos: "", curriculoId: curriculoEC2018.id },
  ];
  await prisma.disciplina.createMany({ data: optativasEC2018 });

  // Disciplinas obrigatórias de Redes de Computadores 2018.2
  const obrigatoriasRC2018 = [
    // 1º Semestre
    { nome: "Fundamentos de Programação", codigo: "QXD0001", cargaHoraria: 96, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Informática e Organização de Computadores", codigo: "QXD0014", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Matemática Básica", codigo: "QXD0056", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Redes de Computadores I", codigo: "QXD0201", cargaHoraria: 64, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Matemática Básica", curriculoId: curriculoRC2018.id },
    { nome: "Ética, Direito e Legislação", codigo: "QXD0103", cargaHoraria: 32, semestre: 1, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    // 2º Semestre
    { nome: "Programação Orientada a Objetos", codigo: "QXD0007", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Fundamentos de Programação", curriculoId: curriculoRC2018.id },
    { nome: "Sistemas Operacionais", codigo: "QXD0013", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Informática e Organização de Computadores", curriculoId: curriculoRC2018.id },
    { nome: "Probabilidade e Estatística", codigo: "QXD0012", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Matemática Básica", curriculoId: curriculoRC2018.id },
    { nome: "Redes de Computadores II", codigo: "QXD0202", cargaHoraria: 64, semestre: 2, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Redes de Computadores I", curriculoId: curriculoRC2018.id },
    // 3º Semestre
    { nome: "Fundamentos de Banco de Dados", codigo: "QXD0011", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Programação Orientada a Objetos", curriculoId: curriculoRC2018.id },
    { nome: "Administração de Sistemas Operacionais", codigo: "QXD004X", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Sistemas Operacionais", curriculoId: curriculoRC2018.id },
    { nome: "Segurança da Informação", codigo: "QXD0203", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Probabilidade e Estatística", curriculoId: curriculoRC2018.id },
    { nome: "Laboratório em Infraestrutura de Redes de Computadores", codigo: "QXD0204", cargaHoraria: 64, semestre: 3, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Redes de Computadores II", curriculoId: curriculoRC2018.id },
    // 4º Semestre
    { nome: "Programação de Scripts", codigo: "QXD0040", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Fundamentos de Banco de Dados", curriculoId: curriculoRC2018.id },
    { nome: "Serviços de Redes de Computadores", codigo: "QXD0205", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Administração de Sistemas Operacionais", curriculoId: curriculoRC2018.id },
    { nome: "Redes de Alta Velocidade", codigo: "QXD0206", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Segurança da Informação", curriculoId: curriculoRC2018.id },
    { nome: "Gerência de Redes de Computadores", codigo: "QXD0207", cargaHoraria: 64, semestre: 4, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Laboratório em Infraestrutura de Redes de Computadores", curriculoId: curriculoRC2018.id },
    // 5º Semestre
    { nome: "Sistemas Distribuídos", codigo: "QXD0043", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Programação de Scripts", curriculoId: curriculoRC2018.id },
    { nome: "Análise de Desempenho de Redes de Computadores", codigo: "QXD0208", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Serviços de Redes de Computadores", curriculoId: curriculoRC2018.id },
    { nome: "Virtualização e Redes Definidas por Software", codigo: "QXD0209", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Redes de Alta Velocidade", curriculoId: curriculoRC2018.id },
    { nome: "Redes Móveis e Sem Fio", codigo: "QXD0210", cargaHoraria: 64, semestre: 5, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Gerência de Redes de Computadores", curriculoId: curriculoRC2018.id },
    // 6º Semestre
    { nome: "Desenvolvimento de Software para Web", codigo: "QXD0020", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Gerência de Projetos", codigo: "QXD0023", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "Gerência de Redes de Computadores", curriculoId: curriculoRC2018.id },
    { nome: "Projeto Integrado em Redes de Computadores", codigo: "QXD0211", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Empreendedorismo", codigo: "QXD0251", cargaHoraria: 64, semestre: 6, obrigatoria: true, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
  ];
  await prisma.disciplina.createMany({ data: obrigatoriasRC2018 });

  // Disciplinas optativas de Redes de Computadores 2018.2
  const optativasRC2018 = [
    // 2º ao 6º Semestre (1 optativa por semestre)
    { nome: "Optativa", codigo: "OPTRC-2-1", cargaHoraria: 64, semestre: 2, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Optativa", codigo: "OPTRC-3-1", cargaHoraria: 64, semestre: 3, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Optativa", codigo: "OPTRC-4-1", cargaHoraria: 64, semestre: 4, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Optativa", codigo: "OPTRC-5-1", cargaHoraria: 64, semestre: 5, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
    { nome: "Optativa", codigo: "OPTRC-6-1", cargaHoraria: 64, semestre: 6, obrigatoria: false, cursoId: cursoRC.id, preRequisitos: "", curriculoId: curriculoRC2018.id },
  ];
  await prisma.disciplina.createMany({ data: optativasRC2018 });

  console.log("Cursos, currículos e disciplinas criados!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 