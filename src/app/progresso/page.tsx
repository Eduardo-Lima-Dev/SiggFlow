"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "next-auth/react";

const STATUS = [
  { value: "CONCLUIDA", label: "Concluída" },
  { value: "EM_ANDAMENTO", label: "Em andamento" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "ATRASADO", label: "Atrasado" },
  { value: "REPROVADA", label: "Reprovada" },
];

export default function ProgressoPage() {
  const { data: session, status, update } = useSession();
  const [semestres, setSemestres] = useState<number[]>([]);
  const [semestreSelecionado, setSemestreSelecionado] = useState<number | null>(null);
  const [disciplinas, setDisciplinas] = useState<Record<number, any[]>>({});
  const [progresso, setProgresso] = useState<Record<string, { status: string; semestre: number }>>({});
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return;
    // Busca o usuário atualizado do banco
    setLoadingUser(true);
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        setLoadingUser(false);
        if (data.user && data.user.completedOnboarding === true) {
          router.replace("/dashboard");
        }
      })
      .catch(() => setLoadingUser(false));
  }, [session, status, router]);

  useEffect(() => {
    fetch("/api/disciplinas")
      .then(res => res.json())
      .then(data => {
        setDisciplinas(data.disciplinas);
        const semestres = Object.keys(data.disciplinas).map(Number).sort((a, b) => a - b);
        setSemestres(semestres);
        setSemestreSelecionado(semestres[0] || null);
      });
  }, []);

  function handleStatusChange(disciplinaId: string, status: string, semestre: number) {
    setProgresso(prev => ({
      ...prev,
      [disciplinaId]: { status, semestre },
    }));
  }

  async function handleSalvar() {
    setLoading(true);
    const payload = Object.entries(progresso).map(([disciplinaId, { status, semestre }]) => ({
      disciplinaId,
      status,
      semestre,
    }));
    const res = await fetch("/api/disciplinas/progresso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      await update();
      router.replace("/dashboard");
    } else {
      alert("Erro ao salvar progresso");
    }
  }

  if (status === "loading" || loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a2324]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-[#1a2324]">
        <div className="w-full max-w-2xl bg-[#192223] rounded-2xl shadow-lg p-8 border border-[#222b2c]">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Progresso Acadêmico</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Semestre</label>
            <select
              className="w-full py-2 px-3 rounded bg-[#181f20] text-white border border-gray-700 focus:outline-none"
              value={semestreSelecionado ?? ''}
              onChange={e => setSemestreSelecionado(Number(e.target.value))}
            >
              {semestres.map(sem => (
                <option key={sem} value={sem}>{sem}º Semestre</option>
              ))}
            </select>
          </div>
          {semestreSelecionado && (
            <div className="bg-[#20292a] rounded-lg p-6 mb-6">
              {(disciplinas[semestreSelecionado] || []).map((disc: any) => (
                <div key={disc.id} className="flex items-center justify-between mb-4">
                  <span className="text-lg text-white font-semibold">{disc.nome}</span>
                  <select
                    className="py-1 px-2 rounded bg-[#181f20] text-white border border-gray-700 focus:outline-none"
                    value={progresso[disc.id]?.status || "PENDENTE"}
                    onChange={e => handleStatusChange(disc.id, e.target.value, semestreSelecionado)}
                  >
                    {STATUS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleSalvar}
            disabled={loading}
            className="w-full py-2 px-4 rounded-md text-white bg-[#219EBC] hover:bg-[#126782] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
} 