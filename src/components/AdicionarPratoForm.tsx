'use client';

import { useState } from 'react';
import { Plus, UtensilsCrossed, X } from 'lucide-react';
import { adicionarItemMenu } from '@/lib/restaurante';

interface AdicionarPratoFormProps {
  restauranteId: number;
  onAdicionado?: () => void;
}

export default function AdicionarPratoForm({
  restauranteId,
  onAdicionado,
}: AdicionarPratoFormProps) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [emoji, setEmoji] = useState('🍽️');

  const limpar = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setEmoji('🍽️');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !preco) return;

    adicionarItemMenu(restauranteId, {
      nome: nome.trim(),
      descricao: descricao.trim() || 'Sem descrição.',
      preco: Number(preco),
      emoji: emoji || '🍽️',
    });

    limpar();
    setAberto(false);
    onAdicionado?.();
  };

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:scale-[1.02] active:scale-95"
      >
        <Plus size={16} />
        Adicionar prato
      </button>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-[#ea5b2a]/40 bg-[#fff8f3] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-bold text-[#2f2019]">
          <UtensilsCrossed size={18} className="text-[#ea5b2a]" />
          Novo prato
        </h4>
        <button
          onClick={() => setAberto(false)}
          className="text-black/40 hover:text-black transition"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do prato"
          required
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a] sm:col-span-2"
        />

        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji (ex: 🍔)"
          maxLength={4}
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <input
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço (ex: 24.90)"
          type="number"
          step="0.10"
          min="0"
          required
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a]"
        />

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição curta"
          rows={2}
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#ea5b2a] sm:col-span-2"
        />

        <button
          type="submit"
          className="rounded-xl bg-[#ea5b2a] py-2.5 text-sm font-bold text-white transition hover:bg-[#d94a1a] sm:col-span-2"
        >
          Adicionar ao cardápio
        </button>
      </form>
    </div>
  );
}