"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

function EyeIcon({ open }: { open: boolean }) {
  return open ? <FiEye size={20} /> : <FiEyeOff size={20} />;
}

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

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!token) {
      setError("Token inválido ou ausente.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erro ao redefinir senha");
      } else {
        setSuccess("Senha redefinida com sucesso! Você pode fazer login.");
        setTimeout(() => router.push("/login?message=Senha redefinida com sucesso!"), 2000);
      }
    } catch (err) {
      setError("Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131a1b]">
      <div className="w-full max-w-md bg-[#181f20] rounded-2xl shadow-lg p-8 border border-[#222b2c]">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Redefinir senha</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Nova senha</label>
              <InputIcon
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Digite a nova senha"
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
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-300 mb-1">Confirmar senha</label>
              <InputIcon
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                required
                minLength={6}
                value={confirm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
                placeholder="Confirme a nova senha"
                icon={
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2m12 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m12 0H6"/></svg>
                }
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm(v => !v)}
                    className="text-gray-400 hover:text-[#219EBC] focus:outline-none"
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <EyeIcon open={showConfirm} />
                  </button>
                }
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">{success}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md text-white bg-[#219EBC] hover:bg-[#126782] font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Redefinindo..." : "Redefinir senha"}
          </button>
        </form>
      </div>
    </div>
  );
} 