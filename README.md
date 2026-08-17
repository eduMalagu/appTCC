# 🍔 Os Guri Delivery

Sistema de delivery desenvolvido como **Trabalho de Conclusão de Curso (TCC)** em Desenvolvimento de Sistemas.

O projeto integra **Frontend Web, Aplicativo Mobile e Backend**, permitindo que clientes encontrem restaurantes, visualizem cardápios, adicionem produtos ao carrinho e realizem pedidos.

---

## 🎯 Objetivo

Desenvolver uma solução de delivery completa, aplicando conhecimentos de desenvolvimento Web, Mobile e Backend, além de integração entre sistemas, autenticação e API REST.

### Público-alvo

- 👤 Clientes: realizam pedidos e acompanham suas informações.
- 👨‍💼 Administradores: gerenciam restaurantes, produtos e pedidos.

---

## 🚀 Funcionalidades

### Cliente
- Cadastro e login;
- Visualização de restaurantes;
- Visualização de cardápios;
- Adição e remoção de produtos;
- Carrinho de compras;
- Realização de pedidos;
- Consulta de pedidos.

### Administrador
- Área administrativa;
- Cadastro e edição de restaurantes;
- Gerenciamento de produtos;
- Gerenciamento de cardápios;
- Gerenciamento de pedidos.

---

## 🧩 Categorias do TCC

O projeto utiliza as três categorias escolhidas:

- 🌐 **Frontend Web**
- 📱 **Aplicativo Mobile**
- ⚙️ **Backend**

```
        USUÁRIO
           │
     ┌─────┴─────┐
     ▼           ▼
   WEB          MOBILE
     │           │
     └─────┬─────┘
           ▼
        BACKEND
        REST API
````

O Frontend Web e o aplicativo Mobile se comunicam com o Backend através de requisições HTTP/JSON.

---

## 🛠️ Tecnologias

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* JWT
* bcryptjs

### Mobile

* Aplicativo Mobile integrado à API do Backend.

### Ferramentas

* Git
* GitHub
* npm
* VS Code
* ESLint

---

## 🏗️ Arquitetura

```text
┌──────────────────┐
│   FRONTEND WEB   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     BACKEND      │
│     REST API     │
└────────┬─────────┘
         ▲
         │
┌────────┴─────────┐
│   APP MOBILE     │
└──────────────────┘
```

### Fluxo principal

```text
Login
  ↓
Restaurantes
  ↓
Cardápio
  ↓
Carrinho
  ↓
Pedido
```

---

## 📁 Estrutura

```text
appTCC/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       └── styles/
│
├── mobile/
│   └── aplicativo mobile
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── middleware/
│
└── README.md
```

### Organização

| Pasta         | Responsabilidade              |
| ------------- | ----------------------------- |
| `frontend`    | Aplicação Web                 |
| `mobile`      | Aplicativo Mobile             |
| `backend`     | API e regras de negócio       |
| `components`  | Componentes reutilizáveis     |
| `routes`      | Rotas da API                  |
| `controllers` | Processamento das requisições |
| `services`    | Regras de negócio             |
| `middleware`  | Autenticação e validações     |

---

## 🌐 Frontend Web

O Frontend é responsável pela interface do sistema e pela interação com o usuário.

Principais telas:

* `/` — Página inicial
* `/login` — Login
* `/cadastro` — Cadastro
* `/restaurantes` — Lista de restaurantes
* `/restaurante/[id]` — Restaurante e cardápio
* `/carrinho` — Carrinho
* `/admin` — Área administrativa

---

## 📱 Aplicativo Mobile

O aplicativo disponibiliza as principais funções do sistema em dispositivos móveis.

Fluxo:

```text
Login/Cadastro
      ↓
Restaurantes
      ↓
Cardápio
      ↓
Produto
      ↓
Carrinho
      ↓
Pedido
```

O aplicativo se comunica com o Backend através da API REST.

---

## ⚙️ Backend

O Backend centraliza as regras de negócio e fornece a API utilizada pelo Web e Mobile.

Responsabilidades:

* Autenticação;
* Usuários;
* Restaurantes;
* Produtos;
* Pedidos;
* Validação de dados;
* Controle de acesso.

Estrutura:

```text
backend/
└── src/
    ├── controllers/
    ├── routes/
    ├── services/
    ├── middleware/
    └── index.ts
```

---

## 🔐 Autenticação

A autenticação utiliza **JWT**.

```text
Login
  ↓
Backend
  ↓
Validação
  ↓
JWT
  ↓
Requisições protegidas
```

O token é enviado nas requisições através de:

```http
Authorization: Bearer TOKEN
```

Existem níveis de acesso como:

```text
USER
ADMIN
```

As senhas são protegidas com `bcryptjs`.

---

## 🌐 API

Principais endpoints:

| Método | Rota                     | Função              |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/auth/register`     | Cadastro            |
| POST   | `/api/auth/login`        | Login               |
| GET    | `/api/users/me`          | Usuário logado      |
| GET    | `/api/restaurants`       | Listar restaurantes |
| GET    | `/api/restaurants/:id`   | Restaurante         |
| POST   | `/api/orders`            | Criar pedido        |
| GET    | `/api/orders/:id`        | Consultar pedido    |
| PATCH  | `/api/orders/:id/status` | Atualizar pedido    |

---

## 🔄 Fluxo de Pedido

```text
Cliente
   ↓
Restaurante
   ↓
Cardápio
   ↓
Carrinho
   ↓
Pedido
   ↓
Backend
   ↓
Status do pedido
```

---

## ▶️ Como Executar

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Configure o `.env` conforme o Backend.

Exemplo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
```

### Mobile

Entre na pasta do aplicativo, instale as dependências e execute conforme a tecnologia utilizada.

---

## 📊 Status

| Recurso           | Status |
| ----------------- | ------ |
| Frontend Web      | ✅      |
| Aplicativo Mobile | ✅      |
| Backend           | ✅      |
| API REST          | ✅      |
| Login/Cadastro    | ✅      |
| Restaurantes      | ✅      |
| Cardápio          | ✅      |
| Carrinho          | ✅      |
| Administração     | ✅      |
| Pedidos           | ✅      | 
| Testes            | ✅      |
| Deploy            | ✅      |

---

## 📦 Entregáveis

O projeto contempla:

* Código-fonte;
* Frontend Web;
* Aplicativo Mobile;
* Backend;
* API REST;
* Documentação;
* Diagramas;
* Apresentação;
* Vídeo de demonstração.

---

## 🎓 TCC

O **Os Guri Delivery** atende à proposta do TCC através da integração de:

* 🌐 **Frontend Web**
* 📱 **Aplicativo Mobile**
* ⚙️ **Backend**

O projeto demonstra conhecimentos de arquitetura, desenvolvimento de sistemas, integração entre aplicações, API REST, autenticação e organização de software.

---

## 👨‍💻 Equipe

| Integrante   | Responsabilidade |
| ----------   | ---------------- |
| Nome Juan    | Frontend         |
| Nome Eduardo |  Mobile         |
| Nome Nathan  | Backend          |

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

# 🍔 Os Guri Delivery

**TCC — Desenvolvimento de Sistemas**

**Frontend Web + Mobile + Backend**

```

