# Projeto de Avaliação CloudPark - Desenvolvedor FullStack Pleno

Este repositório contém dois exercícios destinados a avaliar habilidades específicas em programação e desenvolvimento de software. 

## Exercício 1 - Programa de leitura e gravação em arquivo .json

O Exercício 1 é construído para avaliar como o candidato trabalha com regras e processos definidos, junto com leitura e gravação de arquivos.

### Descrição

Elabore um programa que consiga, através de dois passos base, modificar ou ler as informações de um arquivo no formato JSON. O nome do arquivo deverá ser "config.json". 

- Caso o arquivo não exista, ele deverá ser criado na pasta onde o programa está sendo executado.
- Ao executar, o programa deverá perguntar ao usuário o que ele deseja fazer, com as seguintes opções:
  1. **Read configuration** - Ler o arquivo
  2. **Write configuration** - Escrever no arquivo

#### Opções

1. **Read configuration**

    - Se o arquivo existir, o programa deve exibir o conteúdo JSON na tela.
    - Se o arquivo estiver vazio ou não existir, o programa deve informar que o arquivo não contém informações.

2. **Write configuration**

    - O programa deve fazer três perguntas ao usuário e guardar suas respectivas respostas:
      1. Informe o nome do servidor:
      2. Informe o IP do servidor:
      3. Informe a senha do servidor:

    - As respostas devem ser salvas no arquivo JSON no seguinte formato:
      ```json
      {
        "server_name": "Nome do Servidor",
        "server_ip": "IP do Servidor",
        "server_password": "Senha do Servidor"
      }
      ```

    - Após salvar, o programa deve exibir uma mensagem confirmando que as informações foram salvas com sucesso e exibir o conteúdo JSON salvo.

### Como executar

1. Navegue até o diretório do Exercício 1:
   ```sh
   cd Exercicio1
   ```

2. Siga as instruções presentes no README.md do diretório

## Exercício 2 - Programa de gerenciamento de estacionamento

Elabore um programa de cadastro e operação de estacionamentos simples usando API REST

### End points

  - api/v1/customer - Para cadastro e edição de clientes
  - api/v1/plan - Para cadastro e edição de planos
  - api/v1/vehicle - Para cadastro e edição de veículos
  - api/v1/contract - Para cadastro e edição de contratos
  - api/v1/customervehicle - Para cadastro de veículos
  - api/v1/customerplan - Para efetuar o vínculo do plano com o cliente
  - api/v1/parkmovement - Para dar entrada/saída em movimentos do pátio

### Telas
  - Operações (pátio)
  - Cadastro e edição de Veículos
  - Cadastro e edição de Clientes
  - Cadastro e edição de Planos
  - Cadastro e edição do Contrato

### Como executar

1. Navegue até o diretório do Exercício 1:
   ```sh
   cd Exercicio1
   ```

2. Siga as instruções presentes no README.md do diretório