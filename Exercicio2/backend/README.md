# Exercício 2 - backend

Este projeto é uma API Node.js + Prisma com Typescript para gerenciamento de um estacionamento.

## Pré-requisitos

Certifique-se de ter o Node.js e um gerenciador de pacotes (npm ou yarn) instalados na sua máquina.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (versões novas do docker já vêm com Docker Compose)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) [pnpm](https://pnpm.io/)

## Configuração

### 1. Arquivo .env

Certifique-se de que existe um arquivo `.env` na raiz do projeto com a variável `DATABASE_URL` configurada corretamente. A `DATABASE_URL` deve corresponder às informações do banco de dados PostgreSQL fornecidas no arquivo `docker-compose.yml`.

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

## Execução

### Criação do container

Utilize o Docker Compose para criar o container do banco Postgres

```sh
docker compose up -d
### -d para dettach, caso queira ver os logs do banco não utilize a flag
```

ou em versões mais antigas

```sh
docker-compose up -d
```

### Criar as tabelas

Para essa etapa certifica-se de que fez as instalações dos pacotes corretamente e o container está executando.

Utilize o comando
```sh
npm run prisma migrate deploy

# ou

yarn prisma migrate deploy

# ou

pnpm prisma migrate deploy
```

### Popular o banco

Agora com as tabelas do banco criadas. Execute o seed para ter dados para teste.

```sh
npm run seed

# ou

yarn seed

# ou

pnpm seed
```


### Rodar a API

Com todas as etapas concluídas, podemos agora rodar nossa API com o comando:

```sh
npm run start

#ou 

yarn start

# ou

pnpm start
```

Caso queira rodar a API com watch mode: 
```sh
npm run start:dev

#ou 

yarn start:dev

# ou

pnpm start:dev
```

E caso queira rodar a API no modo de produção:
```sh
npm run build && npm run build:run

#ou 

yarn build && yarn build:run

# ou

pnpm build && pnpm build:run
```

