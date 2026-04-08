# Desafio FullStack

## Resumo

Aplicação fullstack de gerenciamento de clientes e tarefas. Usuários autenticados podem cadastrar clientes e associar tarefas a eles, acompanhando o status de cada tarefa ao longo do tempo.

---

## Funcionalidades

- Autenticação de usuários com login e geração de token JWT
- Listagem e cadastro de clientes vinculados ao usuário autenticado
- Criação de tarefas associadas a clientes
- Atualização de status das tarefas (Pendente, Em andamento, Concluída)
- Filtro de tarefas por status no frontend

---

## Backend

Localizado em [backend/](backend/).

| Ferramenta | Função |
|---|---|
| **Node.js + TypeScript** | Plataforma de execução e tipagem estática da API |
| **Express** | Framework HTTP para criação das rotas e middlewares |
| **Prisma** | ORM para modelagem e acesso ao banco de dados |
| **MySQL** | Banco de dados relacional onde os dados são persistidos |
| **JWT (jsonwebtoken)** | Geração e validação de tokens de autenticação |
| **bcrypt** | Hash de senhas antes de armazená-las no banco |
| **cors** | Middleware para liberar requisições cross-origin do frontend |
| **ts-node** | Execução direta de arquivos TypeScript em desenvolvimento |

### Como rodar

```bash
cd backend
cp .env.example .env  # configure DATABASE_URL e JWT_SECRET
npm install
npx prisma migrate dev
npm run dev
```

---

## Frontend

Localizado em [frontend/](frontend/).

| Ferramenta | Função |
|---|---|
| **Vue 3** | Framework reativo para construção da interface |
| **TypeScript** | Tipagem estática nos componentes e serviços |
| **Vite** | Bundler e servidor de desenvolvimento com hot reload |
| **Vue Router** | Gerenciamento de rotas entre as páginas da aplicação |
| **Pinia** | Gerenciamento de estado global (ex: token do usuário autenticado) |
| **Axios** | Cliente HTTP para comunicação com a API do backend |
| **Prettier + ESLint + Oxlint** | Formatação e análise estática do código |

### Como rodar

```bash
cd frontend
npm install
npm run dev
```
