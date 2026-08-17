/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  ShoppingCart,
  LogOut,
} from 'lucide-react';
import { getCarrinho } from '@/lib/carrinho';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [show, setShow] = useState(true);

  // quantidade de itens do carrinho, lida do carrinho salvo no navegador
  const [cartCount, setCartCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Soma a quantidade de cada item para saber o total de produtos no carrinho
  const atualizarCartCount = () => {
    const itens = getCarrinho();
    const total = itens.reduce((acc, item) => acc + item.quantidade, 0);
    setCartCount(total);
  };

  useEffect(() => {
    atualizarCartCount();

    // Atualiza quando o carrinho muda nesta mesma aba (ex: clicou em "Adicionar")
    window.addEventListener('carrinho:atualizado', atualizarCartCount);
    // Atualiza quando o carrinho muda em outra aba
    window.addEventListener('storage', atualizarCartCount);

    return () => {
      window.removeEventListener('carrinho:atualizado', atualizarCartCount);
      window.removeEventListener('storage', atualizarCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const showHeader = () => {
    setShow(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShow(false);
    }, 10000);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Área para reabrir o header */}
      {!show && (
        <div
          onMouseEnter={showHeader}
          className="fixed top-0 left-0 w-full h-4 z-40"
        />
      )}

      <header
        className={`
          fixed
          left-1/2
          -translate-x-1/2
          z-50
          w-full
          transition-all
          duration-700
          ease-in-out
          ${
            show
              ? 'top-2 sm:top-4 opacity-100'
              : '-top-20 sm:-top-15 opacity-100'
          }
        `}
      >
        <div
          className="
            mx-auto
            w-[95vw]
            sm:w-[92vw]
            lg:w-275
            max-w-275
            px-3
            sm:px-6
            md:px-8
            py-2.5
            sm:py-3
            md:py-4
            rounded-xl
            sm:rounded-2xl
            bg-white/80
            backdrop-blur-xl
            border
            border-gray-200
            shadow-2xl
            flex
            items-center
            justify-between
            gap-2
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              text-base
              sm:text-xl
              md:text-2xl
              font-black
              text-[#ea5b2a]
              hover:scale-105
              transition
              whitespace-nowrap
              shrink-0
            "
          >
            🍔 <span className="hidden xs:inline">A Gurizada do </span>FOOD
          </Link>

          {isAuthenticated && user && (
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

              {/* Carrinho */}
              <Link
                href="/carrinho"
                className="
                  relative
                  flex
                  items-center
                  gap-1.5
                  sm:gap-2
                  px-2.5
                  sm:px-4
                  py-1.5
                  sm:py-2
                  rounded-lg
                  sm:rounded-xl
                  hover:bg-orange-100
                  transition
                  font-medium
                  text-gray-700
                  text-sm
                  sm:text-base
                "
              >
                <ShoppingCart size={18} className="sm:w-5.25 sm:h-5.25" />

                <span className="hidden sm:inline">Carrinho</span>

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-1.5
                      -right-1.5
                      sm:-top-2
                      sm:-right-2
                      w-5
                      h-5
                      sm:w-6
                      sm:h-6
                      rounded-full
                      bg-red-500
                      text-white
                      text-[10px]
                      sm:text-xs
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Usuário */}
              <span className="hidden md:inline font-medium text-gray-700 truncate max-w-35">
                Olá,
                <span className="text-[#ea5b2a] ml-1">
                  {user.nome}
                </span>
              </span>

              {/* Botão sair */}
              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-1.5
                  sm:gap-2
                  px-3
                  sm:px-5
                  py-1.5
                  sm:py-2
                  rounded-lg
                  sm:rounded-xl
                  bg-[#ea5b2a]
                  text-white
                  font-semibold
                  shadow-lg
                  hover:bg-[#d94a1a]
                  hover:scale-105
                  active:scale-95
                  transition-all
                  text-sm
                  sm:text-base
                "
              >
                <LogOut size={16} className="sm:w-4.5 sm:h-4.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}