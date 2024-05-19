# Exercício 2 - frontend

Este é um projeto que utiliza Vite e React para implementação de um frontend para gerenciamento de um estacionamento.

## Pré-requisitos

Certifique-se de ter o Node.js e um gerenciador de pacotes (npm ou yarn) instalados na sua máquina.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) [pnpm](https://pnpm.io/)

## Instalação

Para instalar as dependências do projeto, utilize o comando abaixo com seu gerenciador de pacotes preferido.

```sh
### Usando npm
npm install

### Usando yarn

yarn install

### Usando pnpm

pnpm install
```

### 1. Arquivo .env.local

Certifique-se de que existe um arquivo `.env.local` na raiz do projeto com a variável `VITE_API_URL='http://localhost:3333'` para teste local. 

## Execução

Para iniciar a aplicação em modo de desenvolvimento, utilize o comando abaixo. Este comando irá iniciar o servidor de desenvolvimento do Vite.

```sh
### Usando npm
npm run dev

### Usando yarn

yarn dev

### Usando pnpm

pnpm dev
```

Para criar uma build para produção, utilize o comando abaixo. Os arquivos de build serão gerados na pasta dist.

```sh
### Usando npm
npm run build

### Usando yarn

yarn build

### Usando pnpm

pnpm build
```

Para a visualização da versão de produção

```sh
### Usando npm
npm run preview

### Usando yarn

yarn preview

### Usando pnpm

pnpm preview
```