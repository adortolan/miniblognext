This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Miniblog Next – Tecnologias Utilizadas

Este projeto é um miniblog desenvolvido com foco em autenticação, CRUD de postagens e integração com Firebase, utilizando o ecossistema moderno do Next.js.

---

## Principais Tecnologias

### **Next.js (App Router)**

- Framework React para aplicações web modernas.
- Utiliza o novo sistema de rotas baseado em pastas (`app/`).
- Suporte a Server Actions, Server Components e Middleware.

### **React**

- Biblioteca base para construção da interface.
- Uso de hooks modernos (`useState`, `useEffect`, `useActionState`).

### **TypeScript**

- Tipagem estática para maior segurança e produtividade no desenvolvimento.

### **Tailwind CSS**

- Framework utilitário para estilização rápida e responsiva dos componentes.

---

## **Firebase**

### **Firebase Authentication**

- Autenticação de usuários (registro, login, logout).
- Uso do SDK do client (`firebase/auth`) para autenticação no client-side.
- Geração e uso de tokens JWT para autenticação server-side.

### **Firebase Firestore**

- Banco de dados NoSQL em tempo real para armazenar posts do blog.
- Operações CRUD: criação, listagem, atualização e exclusão de posts.

### **Firebase Admin SDK**

- Utilizado no server-side para validação de tokens JWT e obtenção do `uid` do usuário autenticado.
- Configurado via variáveis de ambiente para segurança das credenciais.

---

## **Next.js Middleware**

- Proteção de rotas sensíveis verificando a existência do cookie de autenticação.
- Redirecionamento automático para login caso o usuário não esteja autenticado.

---

## **Outras Bibliotecas e Recursos**

- **Jest**: Testes unitários e mocks de dependências.
- **Testing Library**: Testes de componentes React.
- **jose**: (Opcional) Para validação de JWT no middleware, se necessário.
- **next/headers**: Manipulação de cookies em Server Actions e Middleware.
- **next/image**: Otimização de imagens externas.

---

## **Estrutura de Pastas**

- `/src/app/`: Estrutura principal de rotas e páginas do Next.js.
- `/src/app/lib/firebase/config.js`: Configuração do Firebase Client SDK.
- `/src/app/lib/firebase/admin.ts`: Configuração do Firebase Admin SDK (server-side).
- `/src/app/lib/actions.ts`: Server Actions para autenticação e CRUD de posts.
- `/src/middleware.ts`: Middleware para proteção de rotas.
- `/src/__tests__/`: Testes automatizados.

---

## **Variáveis de Ambiente**

- As credenciais do Firebase (client e admin) são fornecidas via `.env` para segurança.
- O `private_key` do service account deve ser tratado com `.replace(/\\n/g, "\n")` para funcionar corretamente.

---

## **Observações**

- O projeto separa claramente o uso do Firebase Client SDK (client-side) e Admin SDK (server-side).
- Cookies de autenticação são manipulados apenas em Server Actions ou Middleware, conforme exigido pelo Next.js App Router.
- O uso de aliases (`@/`) é configurado no Jest para facilitar os imports nos testes.

---

**Desenvolvido com foco em segurança, performance e boas práticas do ecossistema React/Next.js.**
