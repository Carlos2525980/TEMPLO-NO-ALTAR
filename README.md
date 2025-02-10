# Passo a Passo para Rodar o Projeto de Cronômetro de Culto

Este guia explica como configurar e executar o projeto que cronometra cultos de igrejas. Ele é dividido em duas partes: **Backend (API)** e **Frontend (Interface do Usuário)**.

---

## Parte 1: Configuração do Backend (API)

### 1. Instalar Dependências
1. **Instale o Node.js** no seu computador.
2. **Instale o MySQL**.

### 2. Configuração do Banco de Dados
1. Crie um banco de dados no MySQL chamado `cadastro`.
2. Dentro desse banco, crie uma tabela `usuarios` com os seguintes campos:
   - `id` (PRIMARY KEY, AUTO_INCREMENT)
   - `Primeiro_Evento` (VARCHAR)
   - `Primeiro_Duracao` (TIME)
   - `Segundo_Evento` (VARCHAR)
   - `Segundo_Duracao` (TIME)
   - `Terceiro_Evento` (VARCHAR)
   - `Terceiro_Duracao` (TIME)
   - `Quarto_Evento` (VARCHAR)
   - `Quarto_Duracao` (TIME)



### 3. Executar o Servidor Backend
No terminal, dentro da pasta **API**, execute:
```bash
yarn start
```
O servidor estará rodando em `http://localhost:3000`.

---

## Parte 4: Execusao do Frontend (Interface do Usuário)


2. Para rodar o projeto, use:
```bash
npm run dev
```
A aplicação estará funcionando, com a possibilidade de **cadastrar**, **listar** e **excluir** usuários!

