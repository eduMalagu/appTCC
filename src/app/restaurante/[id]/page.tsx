/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatarPreco, Restaurant } from "@/data/restaurants";
import { buscarRestaurantePorId, removerItemMenu } from "@/lib/restaurante";
import { isAdmin } from "@/lib/admin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AdicionarPratoForm from "@/components/AdicionarPratoForm";

export default function RestaurantePage() {
  const params = useParams();
  const id = params.id as string;

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [restaurante, setRestaurante] = useState<Restaurant | undefined>(
    undefined
  );

  const admin = isAdmin(user?.email);

  const carregarRestaurante = () => {
    setRestaurante(buscarRestaurantePorId(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    carregarRestaurante();

    window.addEventListener("restaurantes:atualizado", carregarRestaurante);
    window.addEventListener("storage", carregarRestaurante);

    return () => {
      window.removeEventListener("restaurantes:atualizado", carregarRestaurante);
      window.removeEventListener("storage", carregarRestaurante);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!isAuthenticated) {
    return null;
  }

  if (!restaurante) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Restaurante não encontrado</h1>
            <Link href="/" className="text-[#ea5b2a] font-semibold hover:underline">
              Voltar aos restaurantes
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex-1 bg-linear-to-br from-[#ffd9ca] via-[#fff8f3] to-[#ffe9df] px-4 py-8 text-[#2f2019]">
        <section className="mx-auto max-w-5xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ea5b2a] hover:text-[#d94a1a] transition mb-6"
          >
            ← Voltar aos restaurantes
          </Link>

          {/* Hero Section */}
          <div className="rounded-3xl bg-linear-to-r from-[#000000] to-[#2f2019] p-8 text-white shadow-lg mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#ea5b2a] font-bold">
                  {restaurante.categoria}
                </p>
                <h1 className="mt-3 text-4xl font-bold flex items-center gap-3">
                  {restaurante.emoji} {restaurante.nome}
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-white/85 leading-relaxed">
                  {restaurante.descricao}
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl">
                <p className="text-xs text-white/70">Tempo de entrega</p>
                <p className="text-lg font-bold">⏱️ {restaurante.tempo}</p>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl">
                <p className="text-xs text-white/70">Avaliação</p>
                <p className="text-lg font-bold">⭐ {restaurante.nota}</p>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl">
                <p className="text-xs text-white/70">Taxa de entrega</p>
                <p className="text-lg font-bold text-[#ea5b2a]">
                  {formatarPreco(restaurante.taxa)}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <section className="rounded-3xl border-2 border-[#f4c6b2] bg-white p-8 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#2f2019]">
                  🍽️ Cardápio
                </h2>
                <p className="text-sm text-[#7b675c] mt-1">
                  {restaurante.menu.length} itens disponíveis
                </p>
              </div>

              {/* Só aparece para o admin */}
              {admin && (
                <AdicionarPratoForm
                  restauranteId={restaurante.id}
                  onAdicionado={carregarRestaurante}
                />
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {restaurante.menu.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  podeRemover={admin}
                  onRemover={() => {
                    removerItemMenu(restaurante.id, item.id);
                    carregarRestaurante();
                  }}
                />
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 mb-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#ea5b2a]">
              <h3 className="font-bold text-[#2f2019]">📍 Localização</h3>
              <p className="text-sm text-[#7b675c] mt-2">
                Rua das Flores, 123 - Centro
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#ea5b2a]">
              <h3 className="font-bold text-[#2f2019]">📞 Contato</h3>
              <p className="text-sm text-[#7b675c] mt-2">
                (11) 98765-4321
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}