import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Restaurant } from '@/data/restaurants';

export function useFetchRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarRestaurantes = async () => {
    try {
      setLoading(true);
      const dados = await api.restaurantes.getAll();
      setRestaurantes(dados);
      setError(null);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao carregar restaurantes';
      setError(mensagem);
      console.error(mensagem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarRestaurantes();
  }, []);

  return { restaurantes, loading, error, recarregar: carregarRestaurantes };
}
