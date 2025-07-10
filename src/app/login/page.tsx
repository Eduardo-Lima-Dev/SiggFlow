"use client";

import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const cursos = [
  "Ciência da Computação",
  "Engenharia de Software",
  "Sistemas de Informação"
];

// Mapeamento de código para enum do curso
const codigoToEnum: Record<string, string> = {
  CC: "CIENCIA_COMPUTACAO",
  DD: "DESIGN_DIGITAL",
  EC: "ENGENHARIA_COMPUTACAO",
  ES: "ENGENHARIA_SOFTWARE",
  RC: "REDES_COMPUTADORES",
  SI: "SISTEMAS_INFORMACAO"
};

function InputIcon({ icon, rightIcon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        {icon}
      </span>
      <input
        {...props}
        className={
          "pl-10 pr-10 py-2 w-full rounded-md bg-[#181f20] border border-[#2c3536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm " +
          (props.className || "")
        }
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </span>
      )}
    </div>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? <FiEye size={20} /> : <FiEyeOff size={20} />;
}

function LoginForm({ onSwitch, onForgotPassword }: { onSwitch: () => void, onForgotPassword: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, [searchParams]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <InputIcon
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M3 7.5V17a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0021 17V7.5m-18 0A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5m-18 0l9 6 9-6"/></svg>
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Senha
          </label>
          <InputIcon
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Sua senha"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2m12 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m12 0H6"/></svg>
            }
            rightIcon={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                className="text-gray-400 hover:text-[#219EBC] focus:outline-none"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />
        </div>
      </div>
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md text-white bg-[#219EBC] hover:bg-[#126782] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Entrando..." : "Login"}
      </button>
      <div className="flex flex-col items-center gap-1 mt-4">
        <button
          type="button"
          className="text-[#219EBC] text-sm hover:underline"
          tabIndex={-1}
          onClick={onForgotPassword}
        >
          Não consigo realizar o login
        </button>
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#219EBC] text-sm hover:underline"
        >
          Não possuo cadastro
        </button>
      </div>
    </form>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    curso: "",
    anoIngresso: new Date().getFullYear().toString(),
  });
  const [cursos, setCursos] = useState<{ id: string, nome: string, codigo: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("/api/cursos")
      .then(res => res.json())
      .then(data => setCursos(data));
  }, []);

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
    setSuccess("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erro ao cadastrar");
      } else {
        setSuccess("Cadastro realizado com sucesso! Faça login.");
        setTimeout(() => {
          onSwitch();
        }, 1500);
      }
    } catch (err) {
      setError("Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nome
          </label>
          <InputIcon
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z"/></svg>
            }
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <InputIcon
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M3 7.5V17a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0021 17V7.5m-18 0A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5m-18 0l9 6 9-6"/></svg>
            }
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Senha
          </label>
          <InputIcon
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Sua senha"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2m12 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m12 0H6"/></svg>
            }
            rightIcon={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                className="text-gray-400 hover:text-[#219EBC] focus:outline-none"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />
        </div>
        <div>
          <label htmlFor="curso" className="block text-sm font-medium text-gray-300 mb-1">
            Curso
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </span>
            <select
              id="curso"
              name="curso"
              required
              value={Object.entries(codigoToEnum).find(([_, v]) => v === formData.curso)?.[0] || ""}
              onChange={e => setFormData({ ...formData, curso: codigoToEnum[e.target.value] })}
              className="pl-10 pr-3 py-2 w-full rounded-md bg-[#181f20] border border-[#2c3536] text-white focus:outline-none focus:ring-2 focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm"
            >
              <option value="" disabled>Selecione o curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.codigo}>{curso.nome}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="anoIngresso" className="block text-sm font-medium text-gray-300 mb-1">
            Ano de Ingresso
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </span>
            <select
              id="anoIngresso"
              name="anoIngresso"
              required
              value={formData.anoIngresso}
              onChange={handleChange}
              className="pl-10 pr-3 py-2 w-full rounded-md bg-[#181f20] border border-[#2c3536] text-white focus:outline-none focus:ring-2 focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm"
            >
              <option value="" disabled>Selecione o ano</option>
              {Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i).map(ano => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {success}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md text-white bg-[#219EBC] hover:bg-[#126782] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
      <div className="flex flex-col items-center gap-1 mt-4">
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#219EBC] text-sm hover:underline"
        >
          Já possuo cadastro
        </button>
      </div>
    </form>
  );
}

function ResetPasswordForm({ onSwitchLogin }: { onSwitchLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/reset-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erro ao solicitar redefinição de senha");
      } else {
        setSuccess("Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.");
      }
    } catch (err) {
      setError("Erro ao solicitar redefinição de senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <InputIcon
            id="reset-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M3 7.5V17a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0021 17V7.5m-18 0A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5m-18 0l9 6 9-6"/></svg>
            }
          />
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {success}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md text-white bg-[#219EBC] hover:bg-[#126782] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Enviando..." : "Redefinir senha"}
      </button>
      <div className="flex flex-col items-center gap-1 mt-4">
        <button
          type="button"
          onClick={onSwitchLogin}
          className="text-[#219EBC] text-sm hover:underline"
        >
          Voltar para o login
        </button>
      </div>
    </form>
  );
}

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="min-h-screen w-full flex items-center justify-center bg-[#131a1b] p-4">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-[#222b2c] bg-[#131a1b]" style={{ minHeight: 540 }}>
          {/* Lado esquerdo: Logo */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-[#131a1b] border-b lg:border-b-0 lg:border-r border-[#222b2c] p-6 lg:p-8">
            <div className="rounded-full w-48 h-48 lg:w-68 lg:h-68 flex items-center justify-center mb-4 overflow-hidden">
              <img src="/logo.png" alt="Logo do sistema" className="object-contain w-full h-full" />
            </div>
            {/* <span className="text-2xl font-bold text-white mt-2">Logo</span> */}
          </div>
          {/* Lado direito: Formulário */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-6 lg:p-10 bg-[#181f20] rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl">
            <div className="w-full max-w-md mx-auto">
              {showReset ? (
                <>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">Redefinir senha</h2>
                  <ResetPasswordForm onSwitchLogin={() => setShowReset(false)} />
                </>
              ) : showRegister ? (
                <>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">Cadastro</h2>
                  <RegisterForm onSwitch={() => setShowRegister(false)} />
                </>
              ) : (
                <>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">Login</h2>
                  <LoginForm onSwitch={() => setShowRegister(true)} onForgotPassword={() => setShowReset(true)} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
} 