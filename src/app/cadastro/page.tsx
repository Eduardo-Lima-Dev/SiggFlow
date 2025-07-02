"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const cursos = [
  { value: "CIENCIA_COMPUTACAO", label: "Ciência da Computação" },
  { value: "DESIGN_DIGITAL", label: "Design Digital" },
  { value: "ENGENHARIA_COMPUTACAO", label: "Engenharia de Computação" },
  { value: "ENGENHARIA_SOFTWARE", label: "Engenharia de Software" },
  { value: "REDES_COMPUTADORES", label: "Redes de Computadores" },
  { value: "SISTEMAS_INFORMACAO", label: "Sistemas de Informação" }
];

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    curso: "",
    anoIngresso: new Date().getFullYear().toString(),
    // semestre: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // semestre: parseInt(formData.semestre)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro no cadastro");
      }

      // Redirecionar para login após cadastro bem-sucedido
      router.push("/login?message=Cadastro realizado com sucesso! Faça login para continuar.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cadastro de Aluno
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crie sua conta para acessar o sistema
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="curso" className="block text-sm font-medium text-gray-700">
                Curso
              </label>
              <select
                id="curso"
                name="curso"
                required
                value={formData.curso}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                  <option key={curso.value} value={curso.value}>
                    {curso.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="anoIngresso" className="block text-sm font-medium text-gray-700">
                Ano de Ingresso
              </label>
              <select
                id="anoIngresso"
                name="anoIngresso"
                required
                value={formData.anoIngresso}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione o ano</option>
                {Array.from({ length: new Date().getFullYear() - 2009 }, (_, i) => 2010 + i).map(ano => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>

            {/* <div>
              <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">
                Semestre
              </label>
              <input
                id="semestre"
                name="semestre"
                type="number"
                min="1"
                max="10"
                required
                value={formData.semestre}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="1-10"
              />
            </div> */}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>

          <div className="text-center">
            <Link 
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 