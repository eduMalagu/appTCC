/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  UtensilsCrossed,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  ItemCarrinho,
  getCarrinho,
  salvarCarrinho,
  limparCarrinho,
} from '@/lib/carrinho';

export default function CarrinhoPage() {
  const router = useRouter();

  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [compraFeita, setCompraFeita] = useState(false);

  // Carrega os pedidos que o usuário selecionou em outras páginas
  useEffect(() => {
    setItens(getCarrinho());
    setCarregando(false);

    // Mantém o carrinho em dia caso um item seja adicionado em outra aba/página
    const sincronizar = () => setItens(getCarrinho());
    window.addEventListener('carrinho:atualizado', sincronizar);
    window.addEventListener('storage', sincronizar);

    return () => {
      window.removeEventListener('carrinho:atualizado', sincronizar);
      window.removeEventListener('storage', sincronizar);
    };
  }, []);

  const atualizar = (novosItens: ItemCarrinho[]) => {
    setItens(novosItens);
    salvarCarrinho(novosItens);
  };

  const aumentar = (id: number) => {
    atualizar(
      itens.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuir = (id: number) => {
    atualizar(
      itens.map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
          : item
      )
    );
  };

  const remover = (id: number) => {
    atualizar(itens.filter((item) => item.id !== id));
  };

  const finalizarPedido = () => {
    limparCarrinho();
    setItens([]);
    setCompraFeita(true);
  };

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const entrega = itens.length > 0 ? 6 : 0;
  const total = subtotal + entrega;

  return (
    <main className="min-h-screen bg-gray-100 py-6 sm:py-10 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com botão de voltar */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#ea5b2a] hover:shadow-lg transition shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft size={18} className="sm:w-5.5 sm:h-5.5" />
          </button>

          <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            <ShoppingCart className="text-[#ea5b2a] w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
            Meu Carrinho
          </h1>
        </div>

        {carregando ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center text-gray-400">
            Carregando seu carrinho...
          </div>
        ) : compraFeita ? (
          /* Mensagem de confirmação após finalizar o pedido */
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={64} className="mx-auto text-green-500 sm:w-20 sm:h-20" />

            <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-700">
              Compra feita!
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Seu pedido foi enviado com sucesso e já está sendo preparado.
            </p>

            <Link
              href="/"
              className="inline-block mt-6 sm:mt-8 bg-[#ea5b2a] hover:bg-[#d94a1a] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base"
            >
              Voltar para o início
            </Link>
          </div>
        ) : itens.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 sm:w-20 sm:h-20" />

            <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-700">
              Seu carrinho está vazio
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Adicione alguns produtos para continuar.
            </p>

            <Link
              href="/"
              className="inline-block mt-6 sm:mt-8 bg-[#ea5b2a] hover:bg-[#d94a1a] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              {itens.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-4
                    sm:p-6
                    flex
                    flex-col
                    xs:flex-row
                    sm:flex-row
                    items-start
                    xs:items-center
                    sm:items-center
                    gap-4
                    sm:gap-5
                  "
                >
                  <div className="flex items-center gap-4 w-full xs:w-auto sm:w-auto">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-[#ea5b2a] flex items-center justify-center shadow-lg shrink-0">
                      <UtensilsCrossed size={26} className="text-white sm:w-10 sm:h-10" />
                    </div>

                    {/* No mobile, preço/total ficam junto do nome numa coluna estreita; escondido aqui e mostrado no bloco principal abaixo */}
                    <div className="flex-1 min-w-0 xs:hidden">
                      <h2 className="text-lg font-bold text-gray-800 truncate">
                        {item.nome}
                      </h2>
                      <p className="text-[#ea5b2a] font-bold mt-1 text-base">
                        R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <h2 className="hidden xs:block text-xl sm:text-2xl font-bold text-gray-800 truncate">
                      {item.nome}
                    </h2>

                    <p className="hidden xs:block text-[#ea5b2a] font-bold mt-2 text-base sm:text-lg">
                      R$ {item.preco.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between xs:justify-start sm:justify-start gap-3 mt-3 xs:mt-5 sm:mt-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => diminuir(item.id)}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                          aria-label={`Diminuir quantidade de ${item.nome}`}
                        >
                          <Minus size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>

                        <span className="text-lg sm:text-xl font-bold w-6 text-center">
                          {item.quantidade}
                        </span>

                        <button
                          onClick={() => aumentar(item.id)}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#ea5b2a] hover:bg-[#d94a1a] text-white transition flex items-center justify-center"
                          aria-label={`Aumentar quantidade de ${item.nome}`}
                        >
                          <Plus size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                      </div>

                      {/* Total e remover no mobile, ao lado dos controles de quantidade */}
                      <div className="flex xs:hidden items-center gap-3">
                        <p className="text-lg font-bold text-gray-800">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p>
                        <button
                          onClick={() => remover(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          aria-label={`Remover ${item.nome} do carrinho`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xs:block text-right shrink-0">
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>

                    <button
                      onClick={() => remover(item.id)}
                      className="mt-3 sm:mt-5 text-red-500 hover:text-red-700 transition"
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 h-fit lg:sticky lg:top-28">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Itens</span>
                  <span>{itens.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>
                  <span>R$ {entrega.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl sm:text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-[#ea5b2a]">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full mt-6 sm:mt-8 bg-[#ea5b2a] hover:bg-[#d94a1a] text-white py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all hover:scale-[1.02] active:scale-95"
              >
                Finalizar Pedido
              </button>

              <Link
                href="/"
                className="block text-center mt-3 sm:mt-4 border-2 border-[#ea5b2a] text-[#ea5b2a] py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-orange-50 transition text-sm sm:text-base"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}