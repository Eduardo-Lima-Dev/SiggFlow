"use client";

import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

const cursoLabels = {
  CIENCIA_COMPUTACAO: "Ciência da Computação",
  DESIGN_DIGITAL: "Design Digital",
  ENGENHARIA_COMPUTACAO: "Engenharia de Computação",
  ENGENHARIA_SOFTWARE: "Engenharia de Software",
  REDES_COMPUTADORES: "Redes de Computadores",
  SISTEMAS_INFORMACAO: "Sistemas de Informação"
};

export default function DashboardPage() {
  const { data: session } = useSession();

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
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Semestre</dt>
                        <dd className="text-sm text-gray-900">{session?.user?.semestre}º</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Ações Rápidas
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 