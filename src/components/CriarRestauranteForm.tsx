'use client';

import { useState } from 'react';
import { Plus, Store, X } from 'lucide-react';
import { criarRestaurante } from '@/lib/restaurante';

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

export default function CriarRestauranteForm() {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tempo, setTempo] = useState('30-40 min');
  const [taxa, setTaxa] = useState('6');
  const [nota, setNota] = useState('4.8');
  const [emoji, setEmoji] = useState('🍽️');

  const limpar = () => {
    setNome('');
    setCategoria('');
    setDescricao('');
    setTempo('30-40 min');
    setTaxa('6');
    setNota('4.8');
    setEmoji('🍽️');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !categoria.trim()) return;

    criarRestaurante({
      nome: nome.trim(),
      categoria: categoria.trim(),
      descricao: descricao.trim() || 'Sem descrição.',
      tempo: tempo.trim() || '30-40 min',
      taxa: Number(taxa) || 0,
      nota: Number(nota) || 5,
      emoji: emoji || '🍽️',
    });

    limpar();
    setAberto(false);
  };

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] active:scale-95"
      >
        <Plus size={18} />
        Criar restaurante
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-black">
          <Store size={20} className="text-[#ea5b2a]" />
          Novo restaurante
        </h3>
        <button
          onClick={() => setAberto(false)}
          className="text-black/40 hover:text-black transition"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do restaurante"
          required
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a] sm:col-span-2"
        />

        <input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoria (ex: Pizzaria)"
          required
          list="categorias-sugeridas"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />
        <datalist id="categorias-sugeridas">
          {CATEGORIAS_SUGERIDAS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji (ex: 🍕)"
          maxLength={4}
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição curta"
          rows={2}
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a] sm:col-span-2"
        />

        <input
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
          placeholder="Tempo de entrega (ex: 30-40 min)"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <input
          value={taxa}
          onChange={(e) => setTaxa(e.target.value)}
          placeholder="Taxa de entrega (R$)"
          type="number"
          step="0.5"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <input
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Nota (ex: 4.8)"
          type="number"
          step="0.1"
          min="0"
          max="5"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <button
          type="submit"
          className="rounded-xl bg-[#ea5b2a] py-2.5 text-sm font-bold text-white transition hover:bg-[#d94a1a] sm:col-span-2"
        >
          Criar restaurante
        </button>
      </form>
    </div>
  );
}