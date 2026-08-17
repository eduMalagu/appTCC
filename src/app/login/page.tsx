'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Unbounded, Plus_Jakarta_Sans } from 'next/font/google';

const display = Unbounded({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, registrar } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, senha);
      } else {
        await registrar(nome, email, senha);
      }
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} flex min-h-screen bg-[#FAFAFA]`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* ---------- painel lateral (some no mobile) ---------- */}
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-[#FFC61A] px-12 py-12 lg:flex">
        {/* padrão de pontinhos decorativo */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
          aria-hidden="true"
        >
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#1A1A1A" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* blobs decorativos, bem sutis */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FFB300]/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#FF7A00]/20 blur-3xl" />

        {/* marca-d'água tipográfica gigante */}
        <span
          className="pointer-events-none absolute -bottom-10 -right-10 select-none text-[13rem] font-extrabold leading-none tracking-tight text-black/6"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-hidden="true"
        >
          FOOD
        </span>

        {/* topo: marca */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/images/logo-os-delivery.png"
            alt="Os Delivery"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full ring-2 ring-black/10"
          />
          <span
            className="text-sm font-bold uppercase tracking-[0.2em] text-black/70"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Os Delivery
          </span>
        </div>

        {/* meio: mensagem */}
        <div className="relative z-10">
          <h2
            className="max-w-sm text-[2.65rem] font-bold leading-[1.15] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sua fome não espera. A gente também não.
          </h2>
          <p className="mt-5 max-w-xs text-[15px] font-medium leading-relaxed text-black/60">
            Peça seus favoritos e acompanhe cada etapa até a sua porta, em tempo real.
          </p>
        </div>

        {/* rodapé do painel */}
        <p className="relative z-10 text-xs font-semibold text-black/45">
          + de 10 mil entregas feitas com o carinho de sempre
        </p>
      </div>

      {/* ---------- painel do formulário ---------- */}
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 lg:w-[54%]">
        {/* logo só aparece no mobile, já que some no painel lateral */}
        <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
          <Image
            src="/images/logo-os-delivery.png"
            alt="Os Delivery"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
          />
          <p
            className="text-sm font-bold uppercase tracking-[0.2em] text-black/50"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Os Bigode
          </p>
        </div>

        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]">
            <h1
              className="text-2xl font-bold tracking-tight text-black"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {isLogin ? 'Entrar na sua conta' : 'Criar uma conta'}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-black/50">
              {isLogin
                ? 'Use seu e-mail e senha para continuar'
                : 'Leva menos de um minuto'}
            </p>

            {error && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-black/70">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-black/40 focus:ring-4 focus:ring-[#FFC61A]/25"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-black/70">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-black/40 focus:ring-4 focus:ring-[#FFC61A]/25"
                  required
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-semibold text-black/70">Senha</label>
                  
                </div>
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 pr-11 text-sm outline-none transition focus:border-black/40 focus:ring-4 focus:ring-[#FFC61A]/25"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-black/40 hover:text-black/70"
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarSenha ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-2.5 text-sm font-bold text-white transition hover:bg-black/85 disabled:opacity-50"
              >
                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar conta'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-black/50">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-black hover:underline"
            >
              {isLogin ? 'Cadastre-se' : 'Entrar agora'}
            </button>
          </p>

          <p className="mt-10 text-center text-xs text-black/30">
            Os Delivery © {new Date().getFullYear()} — todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}