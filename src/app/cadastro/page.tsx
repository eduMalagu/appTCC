"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fraunces, DM_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:8080/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.error || "Erro ao cadastrar.");
        return;
      }

      router.push("/login");
    } catch {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main
      className={`${display.variable} ${body.variable} flex min-h-screen items-center justify-center bg-[#FBF3E7] px-4 text-[#241812]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <form
        onSubmit={handleCadastro}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_20px_45px_-20px_rgba(36,24,18,0.45)]"
      >
        {/* faixa de topo, mesma linguagem do header/hero */}
        <div className="relative overflow-hidden bg-[#241812] p-7 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #fff 0px, transparent 1px, transparent 3px)",
            }}
          />
          <p className="relative text-xs font-bold uppercase tracking-[0.35em] text-[#E8AA3D]">
            Os Guri Delivery
          </p>
          <h1
            className="relative mt-2 text-2xl text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Criar conta<span className="text-[#E8542A]">.</span>
          </h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#7A6857]">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e7d9c9] bg-[#FFF6EC] px-4 py-3 text-sm outline-none transition focus:border-[#E8542A]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#7A6857]">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e7d9c9] bg-[#FFF6EC] px-4 py-3 text-sm outline-none transition focus:border-[#E8542A]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#7A6857]">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e7d9c9] bg-[#FFF6EC] px-4 py-3 text-sm outline-none transition focus:border-[#E8542A]"
              />
            </div>
          </div>

          {erro && (
            <div className="mt-4 rounded-xl border-l-4 border-[#E8542A] bg-[#E8542A]/10 p-3 text-sm text-[#241812]">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="mt-6 w-full rounded-xl bg-[#E8542A] py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="mt-4 text-center text-sm text-[#7A6857]">
            Já tem conta?{" "}
            <Link href="/login" className="font-bold text-[#E8542A] hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        <div className="border-t border-dashed border-[#e7d9c9] bg-[#FFF6EC] px-8 py-4 text-center text-xs text-[#7A6857]">
          Seus dados estão protegidos com a gente
        </div>
      </form>
    </main>
  );
}