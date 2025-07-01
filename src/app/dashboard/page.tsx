"use client";

import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const cursoLabels = {
  CIENCIA_COMPUTACAO: "Ciência da Computação",
  DESIGN_DIGITAL: "Design Digital",
  ENGENHARIA_COMPUTACAO: "Engenharia de Computação",
  ENGENHARIA_SOFTWARE: "Engenharia de Software",
  REDES_COMPUTADORES: "Redes de Computadores",
  SISTEMAS_INFORMACAO: "Sistemas de Informação"
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [disciplinas, setDisciplinas] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return;
    // Busca o usuário atualizado do banco
    setLoadingUser(true);
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        setLoadingUser(false);
        if (data.user && data.user.completedOnboarding === false) {
          router.replace("/progresso");
        }
      })
      .catch(() => setLoadingUser(false));
  }, [session, status, router]);

  async function handleVerDisciplinas() {
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("/api/disciplinas");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao buscar disciplinas");
      setDisciplinas(data);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading" || loadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Bem-vindo, {session?.user?.name}!
                  </h1>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                  >
                    Sair
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Informações do Aluno
                    </h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Nome</dt>
                        <dd className="text-sm text-gray-900">{session?.user?.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{session?.user?.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Curso</dt>
                        <dd className="text-sm text-gray-900">
                          {session?.user?.curso ? cursoLabels[session.user.curso as keyof typeof cursoLabels] : "N/A"}
                        </dd>
                      </div>
                      {/* <div>
                        <dt className="text-sm font-medium text-gray-500">Semestre</dt>
                        <dd className="text-sm text-gray-900">{session?.user?.semestre}º</dd>
                      </div> */}
                    </dl>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Ações Rápidas
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out" onClick={handleVerDisciplinas}>
                        Ver Disciplinas
                      </button>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                        Ver Notas
                      </button>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                        Ver Horário
                      </button>
                    </div>
                  </div>
                </div>

                {disciplinas && (
                  <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    <h4 className="text-xl font-bold mb-4">Disciplinas do Currículo: {disciplinas.curriculo}</h4>
                    {Object.keys(disciplinas.disciplinas).sort((a, b) => Number(a) - Number(b)).map(semestre => (
                      <div key={semestre} className="mb-6">
                        <h5 className="text-lg font-semibold mb-2">{semestre}º Semestre</h5>
                        <ul className="list-disc ml-6">
                          {disciplinas.disciplinas[semestre].map((disc: any) => (
                            <li key={disc.id} className="mb-1">
                              <span className="font-medium">{disc.nome}</span> ({disc.codigo}) - {disc.cargaHoraria}h {disc.obrigatoria ? "[Obrigatória]" : "[Optativa]"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {loading && <div className="mt-4 text-blue-600">Carregando disciplinas...</div>}
                {erro && <div className="mt-4 text-red-600">{erro}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 