import Link from 'next/link';
import { formatarPreco, Restaurant } from '@/data/restaurants';

interface RestaurantCardProps {
  restaurante: Restaurant;
}

export default function RestaurantCard({ restaurante }: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurante/${restaurante.id}`}
      className="group block rounded-3xl border border-[#f4c6b2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#ffd9ca] to-[#ffe9df] h-40 flex items-center justify-center mb-4">
        <span className="text-5xl">{restaurante.emoji}</span>
      </div>

      <p className="text-sm font-semibold text-[#ea5b2a] uppercase tracking-wide">
        {restaurante.categoria}
      </p>
      <h2 className="mt-2 text-xl font-bold text-[#2f2019]">{restaurante.nome}</h2>
      <p className="mt-2 text-sm text-[#7b675c] line-clamp-2">{restaurante.descricao}</p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[#7b675c]">
            ⏱️ {restaurante.tempo}
          </span>
          <span className="flex items-center gap-1 text-[#ea5b2a] font-semibold">
            ⭐ {restaurante.nota}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm">
        <span className="text-[#7b675c]">Taxa</span>
        <strong className="text-[#ea5b2a]">{formatarPreco(restaurante.taxa)}</strong>
      </div>
    </Link>
  );
}