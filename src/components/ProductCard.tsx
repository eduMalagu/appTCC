'use client';

import { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { formatarPreco, MenuItem } from '@/data/restaurants';
import { adicionarItemCarrinho } from '@/lib/carrinho';

interface ProductCardProps {
  item: MenuItem;
  podeRemover?: boolean;
  onRemover?: () => void;
}

export default function ProductCard({
  item,
  podeRemover = false,
  onRemover,
}: ProductCardProps) {
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = () => {
    adicionarItemCarrinho({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
    });

    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  const handleRemover = () => {
    const confirmado = window.confirm(`Remover "${item.nome}" do cardápio?`);
    if (!confirmado) return;
    onRemover?.();
  };

  return (
    <article className="relative rounded-2xl bg-white border border-[#f4c6b2] p-4 shadow-sm hover:shadow-md transition">
      {podeRemover && (
        <button
          onClick={handleRemover}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-110 hover:bg-red-600 active:scale-95"
          aria-label={`Remover ${item.nome}`}
          title="Remover prato"
        >
          <Trash2 size={14} />
        </button>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-[#2f2019]">{item.nome}</h3>
          <p className="mt-1 text-sm text-[#7b675c]">{item.descricao}</p>
        </div>
        <span className="text-2xl">{item.emoji}</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={handleAdicionar}
          disabled={adicionado}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold transition ${
            adicionado
              ? 'bg-green-100 text-green-700'
              : 'bg-[#fff4ec] text-[#ea5b2a] hover:bg-[#ea5b2a] hover:text-white'
          }`}
        >
          {adicionado ? (
            <>
              <Check size={14} />
              Adicionado
            </>
          ) : (
            <>
              <Plus size={14} />
              Adicionar
            </>
          )}
        </button>

        <strong className="text-lg text-[#ea5b2a]">
          {formatarPreco(item.preco)}
        </strong>
      </div>
    </article>
  );
}