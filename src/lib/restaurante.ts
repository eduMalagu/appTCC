import {
  Restaurant,
  MenuItem,
  restaurantes as restaurantesPadrao,
} from '@/data/restaurants';

const CHAVE_RESTAURANTES = 'restaurantes_admin';
const CHAVE_MENU_EXTRA = 'menu_extra_admin';
const CHAVE_RESTAURANTES_OCULTOS = 'restaurantes_ocultos';
const CHAVE_ITENS_OCULTOS = 'itens_ocultos_admin';

type MenuExtra = Record<string, MenuItem[]>;
type ItensOcultos = Record<string, number[]>;

/** Restaurantes criados pelo admin (além dos fixos do data/restaurants.ts) */
export function getRestaurantesCriados(): Restaurant[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE_RESTAURANTES);
    return bruto ? (JSON.parse(bruto) as Restaurant[]) : [];
  } catch {
    return [];
  }
}

function salvarRestaurantesCriados(lista: Restaurant[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAVE_RESTAURANTES, JSON.stringify(lista));
  window.dispatchEvent(new Event('restaurantes:atualizado'));
}

/** Pratos adicionados pelo admin a QUALQUER restaurante (fixo ou criado), por id do restaurante */
function getMenuExtra(): MenuExtra {
  if (typeof window === 'undefined') return {};
  try {
    const bruto = window.localStorage.getItem(CHAVE_MENU_EXTRA);
    return bruto ? (JSON.parse(bruto) as MenuExtra) : {};
  } catch {
    return {};
  }
}

function salvarMenuExtra(extra: MenuExtra) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAVE_MENU_EXTRA, JSON.stringify(extra));
  window.dispatchEvent(new Event('restaurantes:atualizado'));
}

/** IDs de restaurantes removidos pelo admin (fixos, já que os criados são apagados de verdade) */
function getRestaurantesOcultos(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE_RESTAURANTES_OCULTOS);
    return bruto ? (JSON.parse(bruto) as string[]) : [];
  } catch {
    return [];
  }
}

function salvarRestaurantesOcultos(ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAVE_RESTAURANTES_OCULTOS, JSON.stringify(ids));
  window.dispatchEvent(new Event('restaurantes:atualizado'));
}

/** IDs de pratos removidos pelo admin, por restaurante (fixos, já que os extras são apagados de verdade) */
function getItensOcultos(): ItensOcultos {
  if (typeof window === 'undefined') return {};
  try {
    const bruto = window.localStorage.getItem(CHAVE_ITENS_OCULTOS);
    return bruto ? (JSON.parse(bruto) as ItensOcultos) : {};
  } catch {
    return {};
  }
}

function salvarItensOcultos(ocultos: ItensOcultos) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAVE_ITENS_OCULTOS, JSON.stringify(ocultos));
  window.dispatchEvent(new Event('restaurantes:atualizado'));
}

/** Lista completa: restaurantes fixos + criados pelo admin, já sem os removidos e com os pratos extras juntados */
export function getTodosRestaurantes(): Restaurant[] {
  const criados = getRestaurantesCriados();
  const extras = getMenuExtra();
  const restaurantesOcultos = getRestaurantesOcultos();
  const itensOcultos = getItensOcultos();

  const juntarExtras = (r: Restaurant): Restaurant => {
    const idsOcultosDesseRestaurante = itensOcultos[String(r.id)] || [];

    const menuBase = r.menu.filter(
      (item) => !idsOcultosDesseRestaurante.includes(item.id)
    );

    return {
      ...r,
      menu: [...menuBase, ...(extras[String(r.id)] || [])],
    };
  };

  return [...restaurantesPadrao, ...criados]
    .filter((r) => !restaurantesOcultos.includes(String(r.id)))
    .map(juntarExtras);
}

export function buscarRestaurantePorId(id: string | number): Restaurant | undefined {
  return getTodosRestaurantes().find((r) => String(r.id) === String(id));
}

/** Cria um novo restaurante (admin). Começa sem pratos no cardápio. */
export function criarRestaurante(
  dados: Omit<Restaurant, 'id' | 'menu'>
): Restaurant {
  const novo: Restaurant = {
    ...dados,
    id: Date.now(),
    menu: [],
  };

  salvarRestaurantesCriados([...getRestaurantesCriados(), novo]);
  return novo;
}

/** Adiciona um prato ao cardápio de qualquer restaurante (fixo ou criado pelo admin). */
export function adicionarItemMenu(
  restauranteId: string | number,
  item: Omit<MenuItem, 'id'>
): MenuItem {
  const novoItem: MenuItem = { ...item, id: Date.now() };
  const extras = getMenuExtra();
  const chave = String(restauranteId);

  extras[chave] = [...(extras[chave] || []), novoItem];
  salvarMenuExtra(extras);

  return novoItem;
}

/**
 * Remove um restaurante. Se ele foi criado pelo admin, apaga de vez.
 * Se for um dos restaurantes fixos, apenas esconde (fica salvo que foi removido).
 */
export function removerRestaurante(restauranteId: string | number) {
  const chave = String(restauranteId);
  const criados = getRestaurantesCriados();
  const eraCriadoPeloAdmin = criados.some((r) => String(r.id) === chave);

  if (eraCriadoPeloAdmin) {
    salvarRestaurantesCriados(criados.filter((r) => String(r.id) !== chave));
  } else {
    const ocultos = getRestaurantesOcultos();
    if (!ocultos.includes(chave)) {
      salvarRestaurantesOcultos([...ocultos, chave]);
    }
  }

  // Limpa também os pratos extras e os pratos escondidos desse restaurante
  const extras = getMenuExtra();
  if (extras[chave]) {
    delete extras[chave];
    salvarMenuExtra(extras);
  }

  const itensOcultos = getItensOcultos();
  if (itensOcultos[chave]) {
    delete itensOcultos[chave];
    salvarItensOcultos(itensOcultos);
  }
}

/**
 * Remove um prato do cardápio. Se foi adicionado pelo admin (extra), apaga de vez.
 * Se for um prato fixo do restaurante, apenas esconde.
 */
export function removerItemMenu(
  restauranteId: string | number,
  itemId: number
) {
  const chave = String(restauranteId);
  const extras = getMenuExtra();
  const eraExtra = (extras[chave] || []).some((item) => item.id === itemId);

  if (eraExtra) {
    extras[chave] = extras[chave].filter((item) => item.id !== itemId);
    salvarMenuExtra(extras);
  } else {
    const ocultos = getItensOcultos();
    const listaAtual = ocultos[chave] || [];
    if (!listaAtual.includes(itemId)) {
      ocultos[chave] = [...listaAtual, itemId];
      salvarItensOcultos(ocultos);
    }
  }
}