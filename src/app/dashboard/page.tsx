'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { Switch, Dialog } from '@headlessui/react';
import { PlusIcon, FunnelIcon, ChevronRightIcon, ChevronLeftIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import SemesterColumn from '@/components/SemesterColumn';
import DisciplinaModal from '@/components/DisciplinaModal';
import toast from 'react-hot-toast';

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
    optativas: false,
    atrasadas: false
  });
  const [disciplinas, setDisciplinas] = useState<DisciplinasAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalDisciplina, setModalDisciplina] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPreRequisitos, setModalPreRequisitos] = useState<any[]>([]);
  const [modalDependentes, setModalDependentes] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
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
  const [termoBusca, setTermoBusca] = useState('');
  const [modalSemestre, setModalSemestre] = useState<{semestre: string, disciplinas: any[]} | null>(null);
  const [confirmandoSemestre, setConfirmandoSemestre] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarAberta(true);
      } else {
        setSidebarAberta(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated') return;
    setLoading(true);
    fetch('/api/disciplinas')
      .then(res => res.json())
      .then((data: DisciplinasAPIResponse & { error?: string }) => {
        if (data.error) {
          toast.error(data.error);
          setErro(data.error);
          setDisciplinas(null);
        } else {
          setDisciplinas(data);
        }
      })
      .catch(() => {
        toast.error('Erro ao buscar disciplinas');
        setErro('Erro ao buscar disciplinas');
      })
      .finally(() => setLoading(false));
  }, [status]);

  const carregarOptativas = async () => {
    setLoadingOptativas(true);
    try {
      const response = await fetch('/api/disciplinas/optativas');
      const data = await response.json();
      if (data.error) {
        toast.error('Erro ao carregar optativas: ' + data.error);
      } else {
        setOptativas(data.optativas);
      }
    } catch (error) {
      toast.error('Erro ao carregar optativas');
    } finally {
      setLoadingOptativas(false);
    }
  };

  const optativasFiltradas = optativas.filter(optativa => {
    if (!termoBusca) return true;
    const termo = termoBusca.toLowerCase();
    return (
      optativa.nome.toLowerCase().includes(termo) ||
      optativa.codigo.toLowerCase().includes(termo)
    );
  });

  const optativasUnicas = Object.values(
    optativasFiltradas.reduce((acc, opt) => {
      if (!acc[opt.codigo] || opt.adicionada) {
        acc[opt.codigo] = opt;
      }
      return acc;
    }, {} as Record<string, any>)
  );

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

  const semestres = Array.from(
    new Set([
      ...Object.keys(disciplinas?.completas || {}),
      ...Object.keys(disciplinas?.pendentes || {})
    ])
  ).sort((a, b) => Number(a) - Number(b));

  const getDisciplinasFiltradas = (semestre: string) => {
    const disciplinasSemestre = [
      ...(disciplinas?.completas[semestre] || []),
      ...(disciplinas?.pendentes[semestre] || [])
    ];

    return disciplinasSemestre.filter((disc: any) => {
      const isCompleta = disc.status === 'CONCLUIDA';
      const isPendente = disc.status !== 'CONCLUIDA';
      const isOptativa = disc.obrigatoria === false;
      const isAtrasada = disc.status === 'ATRASADO';

      if (!filtros.completos && !filtros.pendentes && !filtros.optativas && !filtros.atrasadas) {
        return true;
      }

      let mostrar = true;
      
      if (filtros.completos && !isCompleta) mostrar = false;
      if (filtros.pendentes && !isPendente) mostrar = false;
      if (filtros.optativas && !isOptativa) mostrar = false;
      if (filtros.atrasadas && !isAtrasada) mostrar = false;
      
      return mostrar;
    });
  };

  const totalCompletas = semestres.reduce((acc, sem) => acc + getDisciplinasFiltradas(sem).filter((d: any) => d.status === 'CONCLUIDA').length, 0);
  const totalPendentes = semestres.reduce((acc, sem) => acc + getDisciplinasFiltradas(sem).filter((d: any) => d.status !== 'CONCLUIDA').length, 0);

  function getPreRequisitosAndDependentes(disciplina: any) {
    if (!disciplinas) return { preRequisitos: [], dependentes: [] };
    const todasDisciplinas = [
      ...Object.values(disciplinas.completas || {}).flat(),
      ...Object.values(disciplinas.pendentes || {}).flat()
    ];
    const mapCodigo = Object.fromEntries(todasDisciplinas.map(d => [(d as any).codigo, d]));
    const progresso: Record<string, string> = {};
    todasDisciplinas.forEach(d => {
      if ((d as any).id && (d as any).status) progresso[(d as any).id] = (d as any).status;
    });
    const codigosPre = ((disciplina.preRequisitos || '') as string).split(/[;,]/).map((s: any) => s.trim()).filter(Boolean);
    const preRequisitos = codigosPre.map((codigo: any) => {
      const d = mapCodigo[codigo] as any;
      return d ? {
        codigo,
        nome: d.nome,
        completa: d.status === 'CONCLUIDA',
      } : { codigo, nome: codigo, completa: false };
    });
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
      toast.success(`Progresso da disciplina '${modalDisciplina.nome}' salvo como ${modalDisciplina.status}${modalDisciplina.semestre ? ` no ${modalDisciplina.semestre}º semestre` : ''}.`);
      setLoading(true);
      fetch('/api/disciplinas')
        .then(res => res.json())
        .then((data: DisciplinasAPIResponse & { error?: string }) => {
          if (data.error) {
            toast.error(`Erro ao recarregar disciplinas: ${data.error}`);
            setErro(data.error);
            setDisciplinas(null);
          } else {
            setDisciplinas(data);
          }
        })
        .catch(() => {
          toast.error('Erro ao recarregar disciplinas.');
          setErro('Erro ao buscar disciplinas');
        })
        .finally(() => setLoading(false));
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoverOptativa() {
    if (!modalDisciplina) return;
    setRemoving(true);
    try {
      const response = await fetch('/api/disciplinas/optativa/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disciplinaId: modalDisciplina.id,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast.error(`Erro ao remover optativa: ${data.error}`);
      } else {
        toast.success(`Optativa '${modalDisciplina.nome}' removida com sucesso!`);
        setModalOpen(false);
        
        setLoading(true);
        fetch('/api/disciplinas')
          .then(res => res.json())
          .then((data: DisciplinasAPIResponse & { error?: string }) => {
            if (data.error) {
              toast.error(`Erro ao recarregar disciplinas: ${data.error}`);
              setErro(data.error);
              setDisciplinas(null);
            } else {
              setDisciplinas(data);
            }
          })
          .catch(() => {
            toast.error('Erro ao recarregar disciplinas.');
            setErro('Erro ao buscar disciplinas');
          })
          .finally(() => setLoading(false));
      }
    } catch (error) {
      toast.error('Erro ao remover optativa');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col lg:flex-row">
        <aside className={`hidden lg:flex flex-col bg-slate-800/80 backdrop-blur-md rounded-xl m-4 sticky top-4 h-[calc(100vh-2rem)] transition-all duration-300 z-20 ${sidebarAberta ? 'w-64' : 'w-20'}`}>
          {!sidebarAberta && (
            <div className="flex items-center justify-center mt-4 mb-2">
              <FunnelIcon className="h-6 w-6 text-indigo-400" />
            </div>
          )}
                      {sidebarAberta && (
              <div className="flex flex-col h-full p-6">
                <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-semibold tracking-wide">Filtros</span>
                  <FunnelIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'completos', label: 'Completas', value: filtros.completos },
                    { key: 'pendentes', label: 'Pendentes', value: filtros.pendentes },
                    { key: 'optativas', label: 'Optativas', value: filtros.optativas },
                    { key: 'atrasadas', label: 'Atrasadas', value: filtros.atrasadas }
                  ].map(({ key, label, value }) => (
                    <Switch.Group key={key} as="div" className="flex items-center justify-between">
                      <span className="font-medium">{label}</span>
                      <Switch
                        checked={value}
                        onChange={() => setFiltros(f => ({ ...f, [key as keyof typeof filtros]: !f[key as keyof typeof filtros] }))}
                        className={`${value ? 'bg-indigo-500' : 'bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition`}
                      >
                        <span
                          className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
                        />
                      </Switch>
                    </Switch.Group>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="space-y-2 w-full">
                  <div className="text-xs text-slate-400 font-semibold mb-1">Legenda:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-green-700 border border-green-800"></span>
                      <span className="text-sm text-slate-200">Concluída</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm" style={{ background: '#f4b400' }}></span>
                      <span className="text-sm text-slate-200">Em andamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-yellow-700 border border-yellow-800"></span>
                      <span className="text-sm text-slate-200">Pendente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-gray-600 border border-gray-700"></span>
                      <span className="text-sm text-slate-200">Atrasado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-red-700 border border-red-800"></span>
                      <span className="text-sm text-slate-200">Reprovada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex-1" />
          <div className="flex items-center justify-center h-20 border-t border-slate-700 p-2">
            {sidebarAberta ? (
              <div className="flex w-full">
                <button
                  className="flex items-center justify-center flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl px-4 py-3 transition-all shadow-md"
                  onClick={async () => {
                    await carregarOptativas();
                    setModalOptativaOpen(true);
                    setModoAdicionar(false);
                    setOptativaSelecionada(null);
                    setOptativaParaAdicionar(null);
                    setTermoBusca('');
                  }}
                >
                  <span className="flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" />
                    <span>Adicionar Optativas</span>
                  </span>
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setSidebarAberta(false); }}
                  className="flex items-center justify-center pl-3 ml-3 p-1 rounded hover:bg-indigo-700 transition-colors"
                  title="Fechar sidebar"
                  style={{ minWidth: 44 }}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            ) : (
              <button
                className="flex items-center justify-center w-16 h-12 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all shadow-md"
                onClick={() => setSidebarAberta(true)}
                title="Abrir sidebar"
              >
                <PlusIcon className="h-5 w-5" />
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1 flex flex-col space-y-3 lg:space-y-6 m-2 lg:m-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <h1 className="text-2xl lg:text-4xl font-extrabold">Bem-vindo, {session?.user?.name}!</h1>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="block lg:hidden px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md font-medium transition-colors text-sm flex items-center gap-2 w-full justify-center"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Sair
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="hidden lg:flex px-4 lg:px-5 py-2 bg-red-500 hover:bg-red-600 rounded-md font-medium transition-colors text-sm lg:text-base items-center gap-2"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Sair
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 lg:p-5 flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0">
            {[
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
              {
                label: 'Ano de Ingresso',
                value: session?.user?.anoIngresso || 'N/A',
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs lg:text-sm text-slate-400">{label}</span>
                <span className="font-semibold text-sm lg:text-base">{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6">
            {[
              { label: 'Matérias Completas', value: totalCompletas, color: 'green' },
              { label: 'Matérias Pendentes', value: totalPendentes, color: 'yellow' },
            ].map(card => (
              <div
                key={card.label}
                className="bg-slate-800 rounded-2xl p-4 lg:p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl lg:text-4xl font-bold">{card.value}</span>
                <span className={`mt-2 text-${card.color}-400 font-medium text-sm lg:text-base`}>{card.label}</span>
              </div>
            ))}
          </div>

          <div className="block lg:hidden">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl my-2 flex flex-col transition-all duration-300 z-20">
              <div className="p-4 flex-1 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold tracking-wide">Filtros</h2>
                  <FunnelIcon className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'semestre', label: 'Por Semestre', value: filtros.semestre },
                    { key: 'completos', label: 'Completas', value: filtros.completos },
                    { key: 'pendentes', label: 'Pendentes', value: filtros.pendentes },
                    { key: 'optativas', label: 'Optativas', value: filtros.optativas },
                    { key: 'atrasadas', label: 'Atrasadas', value: filtros.atrasadas }
                  ].map(({ key, label, value }) => (
                    <Switch.Group key={key} as="div" className="flex items-center justify-between">
                      <span className="font-medium">{label}</span>
                      <Switch
                        checked={value}
                        onChange={() => setFiltros(f => ({ ...f, [key as keyof typeof filtros]: !f[key as keyof typeof filtros] }))}
                        className={`${value ? 'bg-indigo-500' : 'bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition`}
                      >
                        <span
                          className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
                        />
                      </Switch>
                    </Switch.Group>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <div className="text-xs text-slate-400 font-semibold mb-1">Legenda:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-green-700 border border-green-800"></span>
                      <span className="text-sm text-slate-200">Concluída</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm" style={{ background: '#f4b400' }}></span>
                      <span className="text-sm text-slate-200">Em andamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-yellow-700 border border-yellow-800"></span>
                      <span className="text-sm text-slate-200">Pendente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-gray-600 border border-gray-700"></span>
                      <span className="text-sm text-slate-200">Atrasado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-sm bg-red-700 border border-red-800"></span>
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
                      setTermoBusca('');
                    }}
                  >
                    <PlusIcon className="h-5 w-5" />
                    Adicionar Optativas
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2 lg:py-4">
            <div className="flex flex-col gap-4 lg:gap-8">
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
                  onCardClick={() => {
                    const disciplinasSemestre = [
                      ...(disciplinas?.completas[sem] || []),
                      ...(disciplinas?.pendentes[sem] || [])
                    ];
                    setModalSemestre({ semestre: sem, disciplinas: disciplinasSemestre });
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
            onRemover={handleRemoverOptativa}
            saving={saving}
            removing={removing}
          />

          {modalOptativaOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-slate-800/80 transition-opacity" aria-hidden="true" />
              <div className="relative bg-slate-900 rounded-2xl shadow-xl max-w-4xl w-full mx-auto p-4 sm:p-8 z-10 max-h-[80vh] overflow-y-auto">
                <button className="absolute top-2 sm:top-4 right-2 sm:right-4 text-slate-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => {
                  setModalOptativaOpen(false);
                  setTermoBusca('');
                }}>×</button>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Gerenciar Optativas</h2>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base"
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Adicionar Nova Optativa</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input className="w-full rounded p-2 sm:p-3 bg-slate-800 text-white text-sm sm:text-base" placeholder="Nome" value={novaOptativa.nome} onChange={e => setNovaOptativa(o => ({ ...o, nome: e.target.value }))} />
                      <input className="w-full rounded p-2 sm:p-3 bg-slate-800 text-white text-sm sm:text-base" placeholder="Código" value={novaOptativa.codigo} onChange={e => setNovaOptativa(o => ({ ...o, codigo: e.target.value }))} />
                      <input className="w-full rounded p-2 sm:p-3 bg-slate-800 text-white text-sm sm:text-base" placeholder="Carga Horária" value={novaOptativa.cargaHoraria} onChange={e => setNovaOptativa(o => ({ ...o, cargaHoraria: e.target.value }))} />
                      <select className="w-full rounded p-2 sm:p-3 bg-slate-800 text-white text-sm sm:text-base" value={novaOptativa.status} onChange={e => setNovaOptativa(o => ({ ...o, status: e.target.value }))}>
                        <option value="PENDENTE">Pendente</option>
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="CONCLUIDA">Concluída</option>
                        <option value="REPROVADA">Reprovada</option>
                      </select>
                      <select className="w-full rounded p-2 sm:p-3 bg-slate-800 text-white text-sm sm:text-base" value={novaOptativa.semestre} onChange={e => setNovaOptativa(o => ({ ...o, semestre: e.target.value }))}>
                        <option value="">Selecione o semestre</option>
                        {semestres.map(sem => (
                          <option key={sem} value={sem}>{sem}º Semestre</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
                      <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base" onClick={() => setModoAdicionar(false)}>Cancelar</button>
                      <button
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base"
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
                                toast.error(data.error);
                                setErro(data.error);
                                setDisciplinas(null);
                              } else {
                                toast.success('Optativa adicionada com sucesso!');
                                setDisciplinas(data);
                              }
                            })
                            .catch(() => {
                              toast.error('Erro ao buscar disciplinas');
                              setErro('Erro ao buscar disciplinas');
                            })
                            .finally(() => setLoading(false));
                          
                          setModalOptativaOpen(false);
                        }}
                      >Salvar</button>
                    </div>
                  </div>
                ) : optativaParaAdicionar ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Selecionar Semestre para: {optativaParaAdicionar.nome}</h3>
                    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-sm text-slate-400">Nome</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaParaAdicionar.nome}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Código</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaParaAdicionar.codigo}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Carga Horária</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaParaAdicionar.cargaHoraria}h</div>
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
                      <div>
                        <label className="text-sm text-slate-400">Selecione o status:</label>
                        <select
                          className="w-full rounded p-3 bg-slate-700 text-white mt-2"
                          value={optativaParaAdicionar.statusSelecionado || 'PENDENTE'}
                          onChange={e => setOptativaParaAdicionar({
                            ...optativaParaAdicionar,
                            statusSelecionado: e.target.value
                          })}
                        >
                          <option value="PENDENTE">Pendente</option>
                          <option value="EM_ANDAMENTO">Em andamento</option>
                          <option value="CONCLUIDA">Concluída</option>
                          <option value="REPROVADA">Reprovada</option>
                          <option value="ATRASADO">Atrasado</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
                      <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base" onClick={() => setOptativaParaAdicionar(null)}>Cancelar</button>
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!optativaParaAdicionar.semestreSelecionado}
                        onClick={async () => {
                          if (!optativaParaAdicionar.semestreSelecionado) return;
                          
                          const res = await fetch('/api/disciplinas/optativa', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              nome: optativaParaAdicionar.nome,
                              codigo: optativaParaAdicionar.codigo,
                              cargaHoraria: optativaParaAdicionar.cargaHoraria,
                              status: optativaParaAdicionar.statusSelecionado || 'PENDENTE',
                              semestre: optativaParaAdicionar.semestreSelecionado,
                              preRequisitos: '',
                              curso: session?.user?.curso ? cursoMapping[session.user.curso as keyof typeof cursoMapping] : '',
                            }),
                          });
                          const data = await res.json();
                          if (data.error) {
                            toast.error(`Erro ao adicionar optativa: ${data.error}`);
                          } else {
                            toast.success(`Optativa '${optativaParaAdicionar.nome}' adicionada ao ${optativaParaAdicionar.semestreSelecionado}º semestre com status ${optativaParaAdicionar.statusSelecionado || 'PENDENTE'}.`);
                          }
                          setOptativaParaAdicionar(null);
                          await carregarOptativas();
                          setLoading(true);
                          fetch('/api/disciplinas')
                            .then(res => res.json())
                            .then((data: DisciplinasAPIResponse & { error?: string }) => {
                              if (data.error) {
                                toast.error(`Erro ao recarregar disciplinas: ${data.error}`);
                                setErro(data.error);
                                setDisciplinas(null);
                              } else {
                                toast.success('Disciplinas recarregadas com sucesso.');
                                setDisciplinas(data);
                              }
                            })
                            .catch(() => {
                              toast.error('Erro ao recarregar disciplinas.');
                              setErro('Erro ao buscar disciplinas');
                            })
                            .finally(() => setLoading(false));
                          setModalOptativaOpen(false);
                        }}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : optativaSelecionada ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Editar Optativa: {optativaSelecionada.nome}</h3>
                    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-sm text-slate-400">Nome</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaSelecionada.nome}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Código</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaSelecionada.codigo}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Carga Horária</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaSelecionada.cargaHoraria}h</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-400">Status Atual</label>
                          <div className="text-white font-medium text-sm sm:text-base">{optativaSelecionada.status}</div>
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
                                  toast.error(data.error);
                                  setErro(data.error);
                                  setDisciplinas(null);
                                } else {
                                  setDisciplinas(data);
                                }
                              })
                              .catch(() => {
                                toast.error('Erro ao buscar disciplinas');
                                setErro('Erro ao buscar disciplinas');
                              })
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
                                      <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Optativas Disponíveis</h3>
                      
                      <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar por nome ou código..."
                          value={termoBusca}
                          onChange={(e) => setTermoBusca(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {termoBusca && (
                          <button
                            onClick={() => setTermoBusca('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {termoBusca && (
                        <div className="mt-2 text-sm text-slate-400">
                          {optativasFiltradas.length} resultado(s) encontrado(s)
                        </div>
                      )}
                    </div>
                    
                    {loadingOptativas ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-2 text-slate-400">Carregando optativas...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {optativasUnicas.map((optativa: any) => (
                          <div key={optativa.id} className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                            <div className="flex justify-between items-start mb-2 sm:mb-3">
                              <h4 className="font-semibold text-white text-sm sm:text-base">{optativa.nome}</h4>
                              <span className="bg-purple-600 text-white text-xs px-1 sm:px-2 py-1 rounded-full">OPT</span>
                            </div>
                            <div className="text-xs sm:text-sm text-slate-400 space-y-1">
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

        {modalSemestre && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-slate-800/80 transition-opacity" 
              aria-hidden="true" 
              onClick={() => setModalSemestre(null)}
            />
            <div className="relative bg-slate-900 rounded-2xl shadow-xl max-w-sm w-full mx-auto p-6 z-10">
              <h2 className="text-lg font-bold text-white mb-4">Concluir todas as matérias?</h2>
              <p className="text-slate-300 mb-6">Deseja marcar todas as matérias do <b>{modalSemestre.semestre}º semestre</b> como <b>concluídas</b>? Esta ação não pode ser desfeita.</p>
              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-700 text-white font-semibold" onClick={() => setModalSemestre(null)}>Cancelar</button>
                <button
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
                  disabled={confirmandoSemestre}
                  onClick={async () => {
                    if (!modalSemestre) return;
                    setConfirmandoSemestre(true);
                    try {
                      await fetch('/api/disciplinas/progresso', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                          modalSemestre.disciplinas.map((d: any) => ({
                            disciplinaId: d.id,
                            status: 'CONCLUIDA',
                            semestre: d.semestre
                          }))
                        ),
                      });
                      toast.success(`Todas as matérias do ${modalSemestre.semestre}º semestre foram marcadas como concluídas!`);
                      setModalSemestre(null);
                      setLoading(true);
                      fetch('/api/disciplinas')
                        .then(res => res.json())
                        .then((data: DisciplinasAPIResponse & { error?: string }) => {
                          if (data.error) {
                            toast.error(data.error);
                            setErro(data.error);
                            setDisciplinas(null);
                          } else {
                            setDisciplinas(data);
                          }
                        })
                        .catch(() => {
                          toast.error('Erro ao buscar disciplinas');
                          setErro('Erro ao buscar disciplinas');
                        })
                        .finally(() => setLoading(false));
                    } finally {
                      setConfirmandoSemestre(false);
                    }
                  }}
                >Sim, concluir todas</button>
              </div>
            </div>
          </div>
        )}
    </ProtectedRoute>
  );
}
