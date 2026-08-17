'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/lib/admin';
import { criarRestaurante } from '@/lib/restaurante';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CATEGORIAS_SUGERIDAS = [
  'Comida brasileira',
  'Pizzaria',
  'Hamburgueria',
  'Japonesa',
  'Massas',
  'Açai e sobremesas',
  'Mexicana',
  'Hot Dogs',
];

export default function CriarRestaurantePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const admin = isAdmin(user?.email);

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [emoji, setEmoji] = useState('🍽️');
  const [descricao, setDescricao] = useState('');
  const [tempo, setTempo] = useState('30-40 min');
  const [taxa, setTaxa] = useState('6');
  const [nota, setNota] = useState('4.8');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!admin) {
      router.push('/');
    }
  }, [isAuthenticated, admin, router]);

  if (!isAuthenticated || !admin) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !categoria.trim()) {
      setErro('Preencha ao menos o nome e a categoria do restaurante.');
      return;
    }

    const novoRestaurante = criarRestaurante({
      nome: nome.trim(),
      categoria: categoria.trim(),
      descricao: descricao.trim() || 'Sem descrição.',
      tempo: tempo.trim() || '30-40 min',
      taxa: Number(taxa) || 0,
      nota: Number(nota) || 5,
      emoji: emoji || '🍽️',
    });

    // Vai direto pro restaurante recém-criado, já pronto pra adicionar pratos
    router.push(`/restaurante/${novoRestaurante.id}`);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex-1 bg-linear-to-br from-[#ffd9ca] via-[#fff8f3] to-[#ffe9df] px-4 py-8 text-[#2f2019]">
        <section className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ea5b2a] hover:text-[#d94a1a] transition mb-6"
          >
            <ArrowLeft size={16} />
            Voltar aos restaurantes
          </Link>

          <div className="rounded-3xl bg-linear-to-r from-[#000000] to-[#2f2019] p-8 text-white shadow-lg mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ea5b2a] font-bold">
              Área do administrador
            </p>
            <h1 className="mt-3 text-4xl font-bold flex items-center gap-3">
              <Store className="text-[#ea5b2a]" size={34} />
              Criar Restaurante
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/85 leading-relaxed">
              Preencha as informações abaixo. Depois de criar, você poderá
              adicionar os pratos do cardápio direto na página do restaurante.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border-2 border-[#f4c6b2] bg-white p-8 shadow-sm space-y-6"
          >
            {erro && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {erro}
              </p>
            )}

            {/* Informações básicas */}
            <div>
              <h2 className="text-lg font-bold text-[#2f2019] mb-4">
                Informações básicas
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Nome do restaurante
                  </label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Sabor da Casa"
                    required
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Emoji
                  </label>
                  <input
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    placeholder="🍕"
                    maxLength={4}
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Categoria
                  </label>
                  <input
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ex: Pizzaria"
                    required
                    list="categorias-sugeridas"
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                  <datalist id="categorias-sugeridas">
                    {CATEGORIAS_SUGERIDAS.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h2 className="text-lg font-bold text-[#2f2019] mb-4">
                Descrição
              </h2>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Uma frase curta contando o que o restaurante oferece"
                rows={3}
                className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
              />
            </div>

            {/* Detalhes de entrega */}
            <div>
              <h2 className="text-lg font-bold text-[#2f2019] mb-4">
                Detalhes de entrega e avaliação
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Tempo de entrega
                  </label>
                  <input
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    placeholder="Ex: 30-40 min"
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Taxa de entrega (R$)
                  </label>
                  <input
                    value={taxa}
                    onChange={(e) => setTaxa(e.target.value)}
                    type="number"
                    step="0.5"
                    min="0"
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b675c] mb-1.5">
                    Nota (0 a 5)
                  </label>
                  <input
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full rounded-xl border border-[#f4c6b2] px-4 py-3 text-sm outline-none focus:border-[#ea5b2a]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#ea5b2a] py-4 text-lg font-bold text-white transition-all hover:bg-[#d94a1a] hover:scale-[1.01] active:scale-95"
            >
              Criar restaurante
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}