/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatarPreco, restaurantes } from "@/data/restaurants";

export default function Restaurantes() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      router.push("/login");
      return;
    }
    setRole(JSON.parse(usuario).role);
  }, [router]);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#ffffff] px-4 py-8 text-[#2f2019]">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-3xl bg-[#000000] p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.2em]">Os Guri Delivery</p>
            <div className="flex gap-4 text-sm">
              {role === "admin" && (
                <Link href="/admin" className="underline">MENU</Link>
              )}
              <button onClick={sair} className="underline">Sair</button>
            </div>
          </div>
          <h1 className="mt-2 text-3xl font-bold">Peca sua comida aqui</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85">
            Escolha um restaurante, veja o cardapio e finalize o pedido.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {restaurantes.map((restaurante) => (
            <Link
              key={restaurante.id}
              href={`/restaurante/${restaurante.id}`}
              className="rounded-3xl border border-[#f4c6b2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-[#ea5b2a]">{restaurante.categoria}</p>
              <h2 className="mt-1 text-xl font-semibold">{restaurante.nome}</h2>
              <p className="mt-2 text-sm text-[#7b675c]">{restaurante.descricao}</p>
              <div className="mt-4 flex justify-between text-sm text-[#7b675c]">
                <span>{restaurante.tempo}</span>
                <span>{restaurante.nota} estrela</span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm">
                <span className="text-[#7b675c]">Taxa de entrega</span>
                <strong className="text-[#ea5b2a]">{formatarPreco(restaurante.taxa)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}