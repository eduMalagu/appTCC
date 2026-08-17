export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

const CHAVE_CARRINHO = 'carrinho';

/** Lê o carrinho salvo no navegador. Retorna [] se não houver nada ainda. */
export function getCarrinho(): ItemCarrinho[] {
  if (typeof window === 'undefined') return [];

  try {
    const bruto = window.localStorage.getItem(CHAVE_CARRINHO);
    return bruto ? (JSON.parse(bruto) as ItemCarrinho[]) : [];
  } catch {
    return [];
  }
}

/** Salva a lista completa do carrinho e avisa outras abas/páginas que ele mudou. */
export function salvarCarrinho(itens: ItemCarrinho[]) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  // Dispara um evento customizado para páginas abertas na mesma aba (o evento
  // nativo "storage" só dispara em outras abas).
  window.dispatchEvent(new Event('carrinho:atualizado'));
}

/**
 * Adiciona um produto ao carrinho. Se o produto já existir, soma a
 * quantidade em vez de duplicar a linha. Use isso na página de cardápio/produto
 * quando o usuário clicar em "Adicionar ao carrinho".
 */
export function adicionarItemCarrinho(
  produto: Omit<ItemCarrinho, 'quantidade'>,
  quantidade: number = 1
) {
  const itensAtuais = getCarrinho();
  const jaExiste = itensAtuais.find((item) => item.id === produto.id);

  const novosItens = jaExiste
    ? itensAtuais.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      )
    : [...itensAtuais, { ...produto, quantidade }];

  salvarCarrinho(novosItens);
  return novosItens;
}

/** Esvazia o carrinho, usado depois que o pedido é finalizado. */
export function limparCarrinho() {
  salvarCarrinho([]);
}