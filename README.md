# 🍔 Os Guri Delivery

Sistema de delivery desenvolvido como **Trabalho de Conclusão de Curso (TCC)**.

O **Os Guri Delivery** é uma aplicação desenvolvida para permitir que usuários encontrem restaurantes, visualizem seus cardápios, selecionem produtos, utilizem um carrinho e realizem pedidos.

O sistema também possui uma área administrativa para gerenciamento de restaurantes, produtos e pedidos.

---

## 🎯 Objetivo

O principal objetivo do projeto é desenvolver uma solução de delivery aplicando conhecimentos adquiridos durante o curso de Desenvolvimento de Sistemas.

O projeto trabalha principalmente com:

- Desenvolvimento Frontend;
- Desenvolvimento Backend;
- API REST;
- Autenticação;
- Controle de acesso;
- Componentização;
- Organização de código;
- Comunicação entre aplicações.

---

## 👥 Público-alvo

O sistema possui dois principais tipos de usuários:

### 👤 Cliente

Usuário que utiliza a plataforma para encontrar restaurantes, consultar produtos e realizar pedidos.

### 👨‍💼 Administrador

Usuário responsável pelo gerenciamento dos restaurantes, produtos e demais recursos administrativos do sistema.

---

# 🚀 Funcionalidades

## 👤 Funcionalidades do Cliente

O cliente pode:

- Criar uma conta;
- Realizar login;
- Encerrar a sessão;
- Visualizar restaurantes;
- Acessar o cardápio de um restaurante;
- Visualizar produtos;
- Adicionar produtos ao carrinho;
- Remover produtos do carrinho;
- Alterar quantidades;
- Visualizar o resumo do pedido;
- Realizar pedidos;
- Consultar informações do pedido.

---

## 👨‍💼 Funcionalidades do Administrador

O administrador possui acesso a uma área específica do sistema.

Entre suas funcionalidades estão:

- Acessar o painel administrativo;
- Criar restaurantes;
- Editar restaurantes;
- Gerenciar restaurantes;
- Adicionar produtos;
- Editar produtos;
- Gerenciar cardápios;
- Gerenciar pedidos;
- Controlar acesso às funcionalidades administrativas.

---

# 🛠️ Tecnologias Utilizadas

## Frontend

O Frontend é responsável pela interface visual e pela interação do usuário com o sistema.

Tecnologias utilizadas:

- **Next.js** — framework utilizado na aplicação web;
- **React** — construção dos componentes da interface;
- **TypeScript** — tipagem e organização do código;
- **Tailwind CSS** — estilização da aplicação;
- **Lucide React** — biblioteca de ícones.

## Backend

O Backend é responsável pelas regras do sistema e pela comunicação através da API.

Tecnologias utilizadas:

- **Node.js** — ambiente de execução;
- **Express** — criação da API;
- **TypeScript** — desenvolvimento do código;
- **JWT** — autenticação;
- **bcryptjs** — proteção de senhas.

## Ferramentas

- Git;
- GitHub;
- npm;
- Visual Studio Code;
- ESLint.

---

# 🏗️ Arquitetura do Sistema

O projeto é dividido em duas partes principais:

```text
┌──────────────────┐
│      USUÁRIO     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     FRONTEND     │
│     Next.js      │
│      React       │
└────────┬─────────┘
         │
      HTTP/JSON
         │
         ▼
┌──────────────────┐
│     BACKEND      │
│     Express      │
│     REST API     │
└──────────────────┘









