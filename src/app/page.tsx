/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Unbounded, Plus_Jakarta_Sans } from 'next/font/google';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/data/restaurants';
import { getTodosRestaurantes, removerRestaurante } from '@/lib/restaurante';
import { isAdmin } from '@/lib/admin';
// Local lightweight SVG icon components to avoid requiring 'lucide-react'
const Trash2 = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Sparkles = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l1.5 3L17 7l-3.5 1L12 12l-1.5-4L7 7l3.5-2L12 2z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UtensilsCrossed = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2l6 10M17 2l-6 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 20l4-4M18 20l-4-4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Zap = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Wallet = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
  </svg>
);

const Heart = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.76L5.82 21z" />
  </svg>
);

const Plus = ({ className, strokeWidth = 2.5 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [restaurantes, setRestaurantes] = useState<Restaurant[]>([]);
  const admin = isAdmin(user?.email);

  const carregarRestaurantes = () => setRestaurantes(getTodosRestaurantes());

  const handleRemoverRestaurante = (id: number, nome: string) => {
    const confirmado = window.confirm(
      `Remover o restaurante "${nome}"? Isso também remove todos os pratos dele.`
    );
    if (!confirmado) return;

    removerRestaurante(id);
    carregarRestaurantes();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    carregarRestaurantes();

    window.addEventListener('restaurantes:atualizado', carregarRestaurantes);
    window.addEventListener('storage', carregarRestaurantes);

    return () => {
      window.removeEventListener('restaurantes:atualizado', carregarRestaurantes);
      window.removeEventListener('storage', carregarRestaurantes);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const categorias = Array.from(
    new Set(restaurantes.map((r) => r.categoria))
  );

  return (
    <>
      <Header />
      <main
        className={`${display.variable} ${body.variable} min-h-screen flex-1 bg-[#FAFAFA] text-black`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* HERO */}
        <section className="relative isolate min-h-70 overflow-hidden bg-[#FFC61A] sm:min-h-85">
          {/* padrão de pontinhos decorativo */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
            aria-hidden="true"
          >
            <pattern id="dots-home" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#1A1A1A" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots-home)" />
          </svg>

          {/* blobs decorativos */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FFB300]/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#FF7A00]/20 blur-3xl" />

          {/* marca-d'água tipográfica */}
          <span
            className="pointer-events-none absolute -bottom-10 -right-10 select-none text-[13rem] font-extrabold leading-none tracking-tight text-black/6"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            OS
          </span>

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4 px-4 py-14 sm:py-20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-black/70">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Bem-vindo
                </p>
                <h1
                  className="mt-3 max-w-lg text-4xl leading-[1.1] tracking-tight text-black sm:text-5xl"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  Peça sua comida aqui.
                </h1>
                <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-black/60 sm:text-base">
                  Escolha entre os melhores restaurantes, veja os cardápios
                  completos e finalize seu pedido em poucos cliques. Comida
                  fresca entregue rápido na sua casa!
                </p>
              </div>

              <div className="hidden shrink-0 rotate-[-8deg] rounded-full border-2 border-dashed border-black/25 bg-white/40 px-4 py-3 text-center sm:block">
                <p className="text-[11px] font-bold uppercase leading-tight tracking-[0.15em] text-black/70">
                  Aberto
                  <br />
                  agora
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-sm">
              <div className="text-center">
                <p
                  className="text-3xl text-black"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {restaurantes.length}+
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                  Restaurantes
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl text-black"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {restaurantes.reduce((acc, r) => acc + r.menu.length, 0)}+
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                  Pratos
                </p>
              </div>
              <div className="text-center">
                <p
                  className="flex items-center justify-center gap-1 text-3xl text-black"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  4.7
                  <Star className="h-5 w-5 fill-black text-black" />
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                  Avaliação
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative z-10 -mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-black/10 bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]">
            {categorias.map((c) => (
              <span
                key={c}
                className="shrink-0 cursor-pointer rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-black/50 transition hover:bg-[#FFC61A]/25 hover:text-black"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* GRID DE RESTAURANTES */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFC61A]/30">
                <UtensilsCrossed className="h-4.5 w-4.5 text-black/70" strokeWidth={2.2} />
              </span>
              <h2
                className="text-2xl tracking-tight text-black"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Restaurantes Disponíveis
              </h2>
            </div>

            {/* Só aparece para o admin */}
            {admin && (
              <Link
                href="/restaurante/criar"
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] active:scale-95"
              >
                <Plus className="h-4 w-4" />
                Criar restaurante
              </Link>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurantes.map((restaurante) => (
              <div key={restaurante.id} className="relative">
                {admin && (
                  <button
                    onClick={() =>
                      handleRemoverRestaurante(restaurante.id, restaurante.nome)
                    }
                    className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-110 hover:bg-red-600 active:scale-95"
                    aria-label={`Remover ${restaurante.nome}`}
                    title="Remover restaurante"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <RestaurantCard restaurante={restaurante} />
              </div>
            ))}
          </div>
        </section>

        {/* INFO SECTION */}
        <section className="mx-auto max-w-5xl px-4 pb-20">
          <div className="overflow-hidden rounded-3xl bg-black">
            <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="group flex flex-col gap-3 p-7 transition hover:bg-white/3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFC61A] transition group-hover:scale-105">
                  <Zap className="h-5 w-5 text-black" strokeWidth={2.3} />
                </span>
                <h3
                  className="text-lg text-white"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  Rápido
                </h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  Entrega expressa em até 45 minutos
                </p>
              </div>

              <div className="group flex flex-col gap-3 p-7 transition hover:bg-white/3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFC61A] transition group-hover:scale-105">
                  <Wallet className="h-5 w-5 text-black" strokeWidth={2.3} />
                </span>
                <h3
                  className="text-lg text-white"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  Barato
                </h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  Melhor relação preço e qualidade
                </p>
              </div>

              <div className="group flex flex-col gap-3 p-7 transition hover:bg-white/3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFC61A] transition group-hover:scale-105">
                  <Heart className="h-5 w-5 text-black" strokeWidth={2.3} />
                </span>
                <h3
                  className="text-lg text-white"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  Saboroso
                </h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  Comida fresca e de qualidade garantida
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}