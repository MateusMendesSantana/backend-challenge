# 4All

> Você irá criar um sistema de uma locadora de filmes. O sistema deve permitir a  criação de usuários (clientes), logon e logoff de um usuário, listagem de filmes  disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título.

### Tecnologias

As seguintes tecnologias foram utilizadas no projeto:

* [NodeJS] - Requisitado no desafio;
* [MySQL] - Banco de dados relacional requisitado no desafio;
* [NestJS] - Para uma rápida construção de Apis com typescript em Node, com injeção de dependências, separação em módulos e de fácil aplicação de padrões de projeto, Plus;
* [Docker] - Conteinerização do ambiente para a rápida testagem, Plus;
* [Docker-compose] - Composição do MySQL e Node APP, Plus;
* [Typeorm] - ORM com foco em banco de dados relacionais para typescript, Plus;
* [Class-validator] - Para validação de requisições;
* [Passport] - Autenticação e aplicação de estratégia JWT;
* [Jest] - Testes unitários;

### Princípios aplicados

Os seguintes princípios foram utilizadas no projeto:

* Early return
* Clean code
* Single responsibility, Dependency Inversion Principle (SOLID)

### Script de inserts SQL

Os arquivos de criação de tabelas e inserção de filmes solicitado está presente no caminho "docker_db/init.sql" do repositório, o mesmo é executado quando o banco inicia dentro do contêiner do Docker.

### Postman

A documentação da api pode ser acessada por link ou importada no postman pelo arquivo no repositorio "4all.postman_collection.json". https://documenter.getpostman.com/view/4151466/TVsvfRwN (utilize o seletor no canto superior direito para selecionar os exemplos)

### Instalação e uso
O arquivo .env contém as configurações de variáveis de ambientes, pode modificá-lo como quiser ou utilizar o que já está definido.
```
$ # Rodar a aplicação
$ npm install
$ npm run start:docker
$ # Testes unitários
$ npm run test
```
