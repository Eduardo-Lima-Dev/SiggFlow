'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { Switch, Dialog } from '@headlessui/react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
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
  curriculo: string;
  completas: DisciplinasPorSemestre;
  pendentes: DisciplinasPorSemestre;
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

  const totalCompletas = Object.values(disciplinas?.completas || {}).reduce((acc, arr) => acc + arr.length, 0);
  const totalPendentes = Object.values(disciplinas?.pendentes || {}).reduce((acc, arr) => acc + arr.length, 0);

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
        <aside className="w-64 bg-slate-800/80 backdrop-blur-md rounded-xl m-4 p-6 flex flex-col space-y-6 sticky top-4 h-[calc(100vh-2rem)] overflow-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide">Filtros</h2>
            <FunnelIcon className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(filtros).map(([key, val]) => (
              <Switch.Group key={key} as="div" className="flex items-center justify-between">
                <span className="font-medium capitalize">{key}</span>
                <Switch
                  checked={val}
                  onChange={() => setFiltros(f => ({ ...f, [key]: !f[key as keyof typeof filtros] }))}
                  className={`${val ? 'bg-indigo-500' : 'bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition`}
                >
                  <span
                    className={`${val ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
                  />
                </Switch>
              </Switch.Group>
            ))}
          </div>
          <button className="mt-auto flex items-center justify-center gap-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition-shadow shadow-md hover:shadow-lg">
            <PlusIcon className="h-5 w-5" />
            Adicionar Optativas
          </button>
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
              }
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
              { label: 'Matérias Pendentes', value: totalPendentes, color: 'yellow' }
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

          {/* GRID DE SEMESTRES COM SCROLL HORIZONTAL */}
          <div className="overflow-x-auto py-4">
            <div className="grid grid-flow-col auto-cols-fr gap-20 px-4">
              {semestres.map(sem => (
                <SemesterColumn
                  key={sem}
                  numero={sem}
                  disciplinas={[
                    ...(disciplinas!.completas[sem]?.map(d => ({ ...d, status: 'CONCLUIDA' as const })) || []),
                    ...(disciplinas!.pendentes[sem]?.map(d => ({ ...d, status: 'PENDENTE' as const })) || [])
                  ]}
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
        </main>
      </div>
    </ProtectedRoute>
  );
}
