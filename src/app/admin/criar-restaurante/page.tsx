"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarRestaurante() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario || JSON.parse(usuario).role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch("http://localhost:8080/restaurantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, endereco, telefone }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.error || "Erro ao criar restaurante.");
        return;
      }

      setSucesso("Restaurante criado com sucesso!");
      setNome("");
      setEndereco("");
      setTelefone("");
    } catch {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ffffff] px-4 text-[#2f2019]">
      <form
        onSubmit={handleCriar}
        className="w-full max-w-sm rounded-3xl border border-[#f4c6b2] bg-white p-8 shadow-sm"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[#ea5b2a]">Os Guri Delivery</p>
        <h1 className="mt-2 text-2xl font-bold">Novo restaurante</h1>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do restaurante"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="rounded-2xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
          />
          <input
            type="text"
            placeholder="Endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="rounded-2xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="rounded-2xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
          />
        </div>

        {erro && <p className="mt-4 text-sm text-red-600">{erro}</p>}
        {sucesso && <p className="mt-4 text-sm text-green-600">{sucesso}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="mt-6 w-full rounded-2xl bg-[#ea5b2a] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {carregando ? "Criando..." : "Criar restaurante"}
        </button>
      </form>
    </main>
  );
}