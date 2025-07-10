'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { Switch, Dialog } from '@headlessui/react';
import { PlusIcon, FunnelIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import SemesterColumn from '@/components/SemesterColumn';
import DisciplinaModal from '@/components/DisciplinaModal';

const cursoLabels: Record<string, string> = {
  CIENCIA_COMPUTACAO: 'Ciência da Computação',
  DESIGN_DIGITAL: 'Design Digital',
  ENGENHARIA_COMPUTACAO: 'Engenharia de Computação',
  ENGENHARIA_SOFTWARE: 'Engenharia de Software',
  REDES_COMPUTADORES: 'Redes de Computadores',
  SISTEMAS_INFORMACAO: 'Sistemas de Informação'
};

type DisciplinasPorSemestre = Record<string, { nome: string }[]>;
type DisciplinasAPIResponse = {
  curriculo: { nome: string; ano: number };
  completas: DisciplinasPorSemestre;
  pendentes: DisciplinasPorSemestre;
};

export interface Disciplina {
  id: string;
  nome: string;
  status?: 'CONCLUIDA' | 'EM_ANDAMENTO' | 'PENDENTE' | 'REPROVADA' | 'ATRASADO';
}

const cursoMapping = {
  ENGENHARIA_SOFTWARE: 'ES',
  CIENCIA_COMPUTACAO: 'CC',
  SISTEMAS_INFORMACAO: 'SI',
  DESIGN_DIGITAL: 'DD',
  ENGENHARIA_COMPUTACAO: 'EC',
  REDES_COMPUTADORES: 'RC',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    semestre: true,
    completos: false,
    pendentes: false,
    optativas: false
  });
  const [disciplinas, setDisciplinas] = useState<DisciplinasAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalDisciplina, setModalDisciplina] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPreRequisitos, setModalPreRequisitos] = useState<any[]>([]);
  const [modalDependentes, setModalDependentes] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [modalOptativaOpen, setModalOptativaOpen] = useState(false);
  const [optativas, setOptativas] = useState<any[]>([]);
  const [loadingOptativas, setLoadingOptativas] = useState(false);
  const [modoAdicionar, setModoAdicionar] = useState(false);
  const [novaOptativa, setNovaOptativa] = useState({
    nome: '',
    codigo: '',
    cargaHoraria: '',
    status: 'PENDENTE',
    semestre: '',
  });
  const [optativaSelecionada, setOptativaSelecionada] = useState<any>(null);
  const [optativaParaAdicionar, setOptativaParaAdicionar] = useState<any>(null);
  const [sidebarAberta, setSidebarAberta] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;
    setLoading(true);
    fetch('/api/disciplinas')
      .then(res => res.json())
      .then((data: DisciplinasAPIResponse & { error?: string }) => {
        if (data.error) {
          setErro(data.error);
          setDisciplinas(null);
        } else {
          setDisciplinas(data);
        }
      })
      .catch(() => setErro('Erro ao buscar disciplinas'))
      .finally(() => setLoading(false));
  }, [status]);

  // Função para carregar optativas
  const carregarOptativas = async () => {
    setLoadingOptativas(true);
    try {
      const response = await fetch('/api/disciplinas/optativas');
      const data = await response.json();
      if (data.error) {
        console.error('Erro ao carregar optativas:', data.error);
      } else {
        setOptativas(data.optativas);
      }
    } catch (error) {
      console.error('Erro ao carregar optativas:', error);
    } finally {
      setLoadingOptativas(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-indigo-500 mx-auto"></div>
          <p className="mt-3 text-slate-400">Carregando disciplinas...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-red-500">{erro}</p>
      </div>
    );
  }

  // reúne todos os semestres presentes em completas e pendentes
  const semestres = Array.from(
    new Set([
      ...Object.keys(disciplinas?.completas || {}),
      ...Object.keys(disciplinas?.pendentes || {})
    ])
  ).sort((a, b) => Number(a) - Number(b));

  // Função para filtrar disciplinas baseado nos filtros ativos
  const getDisciplinasFiltradas = (semestre: string) => {
    const disciplinasSemestre = [
      ...(disciplinas?.completas[semestre] || []),
      ...(disciplinas?.pendentes[semestre] || [])
    ];

    return disciplinasSemestre.filter((disc: any) => {
      const isCompleta = disc.status === 'CONCLUIDA';
      const isPendente = disc.status !== 'CONCLUIDA';
      const isOptativa = disc.obrigatoria === false;

      // Se nenhum filtro está ativo, mostra todas
      if (!filtros.completos && !filtros.pendentes && !filtros.optativas) {
        return true;
      }

      // Aplica filtros
      let mostrar = true;
      
      if (filtros.completos && !isCompleta) mostrar = false;
      if (filtros.pendentes && !isPendente) mostrar = false;
      if (filtros.optativas && !isOptativa) mostrar = false;
      
      return mostrar;
    });
  };

  const totalCompletas = semestres.reduce((acc, sem) => acc + getDisciplinasFiltradas(sem).filter((d: any) => d.status === 'CONCLUIDA').length, 0);
  const totalPendentes = semestres.reduce((acc, sem) => acc + getDisciplinasFiltradas(sem).filter((d: any) => d.status !== 'CONCLUIDA').length, 0);

  // Função para buscar pré-requisitos e dependentes
  function getPreRequisitosAndDependentes(disciplina: any) {
    if (!disciplinas) return { preRequisitos: [], dependentes: [] };
    // Junta todas as disciplinas do curso
    const todasDisciplinas = [
      ...Object.values(disciplinas.completas || {}).flat(),
      ...Object.values(disciplinas.pendentes || {}).flat()
    ];
    // Mapa de código para disciplina
    const mapCodigo = Object.fromEntries(todasDisciplinas.map(d => [(d as any).codigo, d]));
    // Progresso do usuário (por id)
    const progresso: Record<string, string> = {};
    todasDisciplinas.forEach(d => {
      if ((d as any).id && (d as any).status) progresso[(d as any).id] = (d as any).status;
    });
    // Pré-requisitos desta disciplina
    const codigosPre = ((disciplina.preRequisitos || '') as string).split(/[;,]/).map((s: any) => s.trim()).filter(Boolean);
    const preRequisitos = codigosPre.map((codigo: any) => {
      const d = mapCodigo[codigo] as any;
      return d ? {
        codigo,
        nome: d.nome,
        completa: d.status === 'CONCLUIDA',
      } : { codigo, nome: codigo, completa: false };
    });
    // Disciplinas que dependem desta
    const dependentes = todasDisciplinas.filter(d =>
      ((d as any).preRequisitos || '').split(/[;,]/).map((s: any) => s.trim()).includes(disciplina.codigo)
    ).map(d => ({ codigo: (d as any).codigo, nome: (d as any).nome, completa: (d as any).status === 'CONCLUIDA' }));
    return { preRequisitos, dependentes };
  }

  async function handleSalvarDisciplina() {
    if (!modalDisciplina) return;
    setSaving(true);
    try {
      await fetch('/api/disciplinas/progresso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          {
            disciplinaId: modalDisciplina.id,
            status: modalDisciplina.status,
            semestre: modalDisciplina.semestre,
          },
        ]),
      });
      setModalOpen(false);
      // Recarregar disciplinas
      setLoading(true);
      fetch('/api/disciplinas')
        .then(res => res.json())
        .then((data: DisciplinasAPIResponse & { error?: string }) => {
          if (data.error) {
            setErro(data.error);
            setDisciplinas(null);
          } else {
            setDisciplinas(data);
          }
        })
        .catch(() => setErro('Erro ao buscar disciplinas'))
        .finally(() => setLoading(false));
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 text-gray-100 flex">
        {/* SIDEBAR */}
        <aside className={`${sidebarAberta ? 'w-64' : 'w-12'} bg-slate-800/80 backdrop-blur-md rounded-xl m-4 flex flex-col sticky top-4 h-[calc(100vh-2rem)] transition-all duration-300`}>
          {sidebarAberta ? (
            <>
              <div className="p-6 flex-1 overflow-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold tracking-wide">Filtros</h2>
                  <FunnelIcon className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'semestre', label: 'Por Semestre', value: filtros.semestre },
                    { key: 'completos', label: 'Completas', value: filtros.completos },
                    { key: 'pendentes', label: 'Pendentes', value: filtros.pendentes },
                    { key: 'optativas', label: 'Optativas', value: filtros.optativas }
                  ].map(({ key, label, value }) => (
                    <Switch.Group key={key} as="div" className="flex items-center justify-between">
                      <span className="font-medium">{label}</span>
                      <Switch
                        checked={value}
                        onChange={() => setFiltros(f => ({ ...f, [key]: !f[key as keyof typeof filtros] }))}
                        className={`${value ? 'bg-indigo-500' : 'bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition`}
                      >
                        <span
                          className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
                        />
                      </Switch>
                    </Switch.Group>
                  ))}
                </div>
                {/* Legenda de status */}
                <div className="mt-6 space-y-2">
                  <div className="text-xs text-slate-400 font-semibold mb-1">Legenda:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded bg-green-700 border border-green-800"></span>
                      <span className="text-sm text-slate-200">Concluída</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded" style={{ background: '#f4b400' }}></span>
                      <span className="text-sm text-slate-200">Em andamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded bg-yellow-700 border border-yellow-800"></span>
                      <span className="text-sm text-slate-200">Pendente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded bg-gray-600 border border-gray-700"></span>
                      <span className="text-sm text-slate-200">Atrasado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded bg-red-700 border border-red-800"></span>
                      <span className="text-sm text-slate-200">Reprovada</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition-shadow shadow-md hover:shadow-lg"
                    onClick={async () => {
                      await carregarOptativas();
                      setModalOptativaOpen(true);
                      setModoAdicionar(false);
                      setOptativaSelecionada(null);
                      setOptativaParaAdicionar(null);
                    }}
                  >
                    <PlusIcon className="h-5 w-5" />
                    Adicionar Optativas
                  </button>
                  <button
                    onClick={() => setSidebarAberta(false)}
                    className="p-3 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
                    title="Fechar filtros"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-indigo-400" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1"></div>
              <div className="p-1">
                <button
                  onClick={() => setSidebarAberta(!sidebarAberta)}
                  className="w-full p-3 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
                  title="Abrir filtros"
                >
                  <ChevronRightIcon className="h-5 w-5 text-indigo-400" />
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col space-y-6 m-4">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h1 className="text-4xl font-extrabold">Bem-vindo, {session?.user?.name}!</h1>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-full font-medium transition-colors"
            >
              Sair
            </button>
          </div>

          {/* INFO DO ALUNO */}
          <div className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            {[
              { label: 'Nome', value: session?.user?.name },
              { label: 'Email', value: session?.user?.email },
              {
                label: 'Curso',
                value: session?.user?.curso
                  ? cursoLabels[session.user.curso as keyof typeof cursoLabels]
                  : 'N/A'
              },
              {
                label: 'Currículo',
                value: disciplinas?.curriculo ? `${disciplinas.curriculo.nome} (${disciplinas.curriculo.ano})` : 'N/A',
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {/* CARDS DE CONTAGEM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Matérias Completas', value: totalCompletas, color: 'green' },
              { label: 'Matérias Pendentes', value: totalPendentes, color: 'yellow' },
            ].map(card => (
              <div
                key={card.label}
                className="bg-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl font-bold">{card.value}</span>
                <span className={`mt-2 text-${card.color}-400 font-medium`}>{card.label}</span>
              </div>
            ))}
          </div>

          {/* GRID DE SEMESTRES EM LISTA VERTICAL */}
          <div className="py-4">
            <div className="flex flex-col gap-8">
              {semestres.map(sem => (
                <SemesterColumn
                  key={sem}
                  numero={sem}
                  obrigatorias={getDisciplinasFiltradas(sem).length}
                  disciplinas={getDisciplinasFiltradas(sem).map(d => ({
                    ...d,
                    obrigatoria: (d as any).obrigatoria
                  }))}
                  onDisciplinaClick={disc => {
                    const { preRequisitos, dependentes } = getPreRequisitosAndDependentes(disc);
                    setModalDisciplina({ ...disc, semestre: sem });
                    setModalPreRequisitos(preRequisitos);
                    setModalDependentes(dependentes);
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>

          <DisciplinaModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            disciplina={modalDisciplina}
            setDisciplina={setModalDisciplina}
            preRequisitos={modalPreRequisitos}
            dependentes={modalDependentes}
            onSalvar={handleSalvarDisciplina}
            saving={saving}
          />

          {/* Modal de Optativas */}
          {modalOptativaOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay opaco */}
              <div className="fixed inset-0 bg-slate-800/80 transition-opacity" aria-hidden="true" />
              <div className="relative bg-slate-900 rounded-2xl shadow-xl max-w-4xl w-full mx-auto p-8 z-10 max-h-[80vh] overflow-y-auto">
                <button className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setModalOptativaOpen(false)}>×</button>
                
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Gerenciar Optativas</h2>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                    onClick={() => {
                      setModoAdicionar(true);
                      setOptativaSelecionada(null);
                      setNovaOptativa({ nome: '', codigo: '', cargaHoraria: '', status: 'PENDENTE', semestre: '' });
                    }}
                  >
                    + Nova Optativa
                  </button>
                </div>

                {modoAdicionar ? (
                  // Modo de adicionar nova optativa
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Adicionar Nova Optativa</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input className="w-full rounded p-3 bg-slate-800 text-white" placeholder="Nome" value={novaOptativa.nome} onChange={e => setNovaOptativa(o => ({ ...o, nome: e.target.value }))} />
                      <input className="w-full rounded p-3 bg-slate-800 text-white" placeholder="Código" value={novaOptativa.codigo} onChange={e => setNovaOptativa(o => ({ ...o, codigo: e.target.value }))} />
                      <input className="w-full rounded p-3 bg-slate-800 text-white" placeholder="Carga Horária" value={novaOptativa.cargaHoraria} onChange={e => setNovaOptativa(o => ({ ...o, cargaHoraria: e.target.value }))} />
                      <select className="w-full rounded p-3 bg-slate-800 text-white" value={novaOptativa.status} onChange={e => setNovaOptativa(o => ({ ...o, status: e.target.value }))}>
                        <option value="PENDENTE">Pendente</option>
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="CONCLUIDA">Concluída</option>
                        <option value="REPROVADA">Reprovada</option>
                      </select>
                      <select className="w-full rounded p-3 bg-slate-800 text-white" value={novaOptativa.semestre} onChange={e => setNovaOptativa(o => ({ ...o, semestre: e.target.value }))}>
                        <option value="">Selecione o semestre</option>
                        {semestres.map(sem => (
                          <option key={sem} value={sem}>{sem}º Semestre</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded font-semibold" onClick={() => setModoAdicionar(false)}>Cancelar</button>
                      <button
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded font-semibold"
                        onClick={async () => {
                          if (!novaOptativa.nome || !novaOptativa.codigo || !novaOptativa.cargaHoraria || !novaOptativa.semestre) return;
                          await fetch('/api/disciplinas/optativa', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              nome: novaOptativa.nome,
                              codigo: novaOptativa.codigo,
                              cargaHoraria: novaOptativa.cargaHoraria,
                              status: novaOptativa.status,
                              semestre: novaOptativa.semestre,
                              preRequisitos: '',
                              curso: session?.user?.curso ? cursoMapping[session.user.curso as keyof typeof cursoMapping] : '',
                            }),
                          });
                          setModoAdicionar(false);
                          setNovaOptativa({ nome: '', codigo: '', cargaHoraria: '', status: 'PENDENTE', semestre: '' });
                          await carregarOptativas();
                          setLoading(true);
                          fetch('/api/disciplinas')
                            .then(res => res.json())
                            .then((data: DisciplinasAPIResponse & { error?: string }) => {
                              if (data.error) {
                                setErro(data.error);
                                setDisciplinas(null);
                              } else {
                                setDisciplinas(data);
                              }
                            })
                            .catch(() => setErro('Erro ao buscar disciplinas'))
                            .finally(() => setLoading(false));
                          
                          // Fecha o modal após salvar
                          setModalOptativaOpen(false);
                        }}
                      >Salvar</button>
                    </div>
                  </div>
                ) : optativaParaAdicionar ? (
                  // Modo de selecionar semestre para adicionar optativa
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Selecionar Semestre para: {optativaParaAdicionar.nome}</h3>
                    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-400">Nome</label>
                          <div className="text-white font-medium">{optativaParaAdicionar.nome}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Código</label>
                          <div className="text-white font-medium">{optativaParaAdicionar.codigo}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Carga Horária</label>
                          <div className="text-white font-medium">{optativaParaAdicionar.cargaHoraria}h</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Selecione o semestre onde deseja adicionar esta optativa:</label>
                        <select 
                          className="w-full rounded p-3 bg-slate-700 text-white mt-2"
                          value={optativaParaAdicionar.semestreSelecionado || ''}
                          onChange={(e) => {
                            const semestre = parseInt(e.target.value);
                            setOptativaParaAdicionar({
                              ...optativaParaAdicionar,
                              semestreSelecionado: semestre
                            });
                          }}
                        >
                          <option value="">Selecione o semestre</option>
                          {semestres.map(sem => (
                            <option key={sem} value={sem}>{sem}º Semestre</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded font-semibold" onClick={() => setOptativaParaAdicionar(null)}>Cancelar</button>
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!optativaParaAdicionar.semestreSelecionado}
                        onClick={async () => {
                          if (!optativaParaAdicionar.semestreSelecionado) return;
                          
                          await fetch('/api/disciplinas/optativa', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              nome: optativaParaAdicionar.nome,
                              codigo: optativaParaAdicionar.codigo,
                              cargaHoraria: optativaParaAdicionar.cargaHoraria,
                              status: 'PENDENTE',
                              semestre: optativaParaAdicionar.semestreSelecionado,
                              preRequisitos: '',
                              curso: session?.user?.curso ? cursoMapping[session.user.curso as keyof typeof cursoMapping] : '',
                            }),
                          });
                          
                          setOptativaParaAdicionar(null);
                          await carregarOptativas();
                          setLoading(true);
                          fetch('/api/disciplinas')
                            .then(res => res.json())
                            .then((data: DisciplinasAPIResponse & { error?: string }) => {
                              if (data.error) {
                                setErro(data.error);
                                setDisciplinas(null);
                              } else {
                                setDisciplinas(data);
                              }
                            })
                            .catch(() => setErro('Erro ao buscar disciplinas'))
                            .finally(() => setLoading(false));
                          
                          // Fecha o modal após salvar
                          setModalOptativaOpen(false);
                        }}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : optativaSelecionada ? (
                  // Modo de editar optativa selecionada
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Editar Optativa: {optativaSelecionada.nome}</h3>
                    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-400">Nome</label>
                          <div className="text-white font-medium">{optativaSelecionada.nome}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Código</label>
                          <div className="text-white font-medium">{optativaSelecionada.codigo}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Carga Horária</label>
                          <div className="text-white font-medium">{optativaSelecionada.cargaHoraria}h</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Status Atual</label>
                          <div className="text-white font-medium">{optativaSelecionada.status}</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Semestre</label>
                        <select 
                          className="w-full rounded p-3 bg-slate-700 text-white mt-1"
                          value={optativaSelecionada.semestreUsuario || ''}
                          onChange={async (e) => {
                            const novoSemestre = parseInt(e.target.value);
                            await fetch('/api/disciplinas/progresso', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify([{
                                disciplinaId: optativaSelecionada.id,
                                status: optativaSelecionada.status,
                                semestre: novoSemestre,
                              }]),
                            });
                            setOptativaSelecionada({ ...optativaSelecionada, semestreUsuario: novoSemestre });
                            setLoading(true);
                            fetch('/api/disciplinas')
                              .then(res => res.json())
                              .then((data: DisciplinasAPIResponse & { error?: string }) => {
                                if (data.error) {
                                  setErro(data.error);
                                  setDisciplinas(null);
                                } else {
                                  setDisciplinas(data);
                                }
                              })
                              .catch(() => setErro('Erro ao buscar disciplinas'))
                              .finally(() => setLoading(false));
                          }}
                        >
                          <option value="">Selecione o semestre</option>
                          {semestres.map(sem => (
                            <option key={sem} value={sem}>{sem}º Semestre</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded font-semibold" onClick={() => setOptativaSelecionada(null)}>Voltar</button>
                    </div>
                  </div>
                ) : (
                  // Lista de optativas existentes
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Optativas Disponíveis</h3>
                    {loadingOptativas ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-2 text-slate-400">Carregando optativas...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {optativas.map((optativa) => (
                          <div key={optativa.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-white">{optativa.nome}</h4>
                              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">OPT</span>
                            </div>
                            <div className="text-sm text-slate-400 space-y-1">
                              <div>Código: {optativa.codigo}</div>
                              <div>Carga Horária: {optativa.cargaHoraria}h</div>
                              <div>Status: {optativa.status}</div>
                              {optativa.semestreUsuario && (
                                <div>Semestre: {optativa.semestreUsuario}º</div>
                              )}
                            </div>
                            <div className="mt-4 flex gap-2">
                                                             {!optativa.adicionada ? (
                                 <button
                                   className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                                   onClick={() => setOptativaParaAdicionar(optativa)}
                                 >
                                   Adicionar
                                 </button>
                              ) : (
                                <button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                                  onClick={() => setOptativaSelecionada(optativa)}
                                >
                                  Editar
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
