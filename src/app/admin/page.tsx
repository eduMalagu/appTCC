/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminMenu() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario || JSON.parse(usuario).role !== "admin") {
      router.push("/login");
      return;
    }
    setAutorizado(true);
  }, [router]);

  if (!autorizado) return null;

  return (
    <main className="min-h-screen bg-[#ffffff] px-4 py-8 text-[#2f2019]">
      <section className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="rounded-3xl bg-[#000000] p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em]">Os Guri Delivery</p>
          <h1 className="mt-2 text-3xl font-bold">Menu do administrador</h1>
        </div>

        <Link
          href="/admin/criar-restaurante"
          className="rounded-3xl border border-[#f4c6b2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">+ Criar restaurante</h2>
          <p className="mt-2 text-sm text-[#7b675c]">Cadastre um novo restaurante no sistema.</p>
        </Link>

        <Link
          href="/restaurantes"
          className="rounded-3xl border border-[#f4c6b2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Ver restaurantes</h2>
          <p className="mt-2 text-sm text-[#7b675c]">Veja a lista de restaurantes disponiveis.</p>
        </Link>
      </section>
    </main>
  );
}