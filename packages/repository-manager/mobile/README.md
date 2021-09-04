<h1 align="center">
  REPOSITORY-MANAGER
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#testando-a-aplicação">Testando a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>
</p>

---
<br />

## Lista de correspondências
* [Desafio 04: Conceitos do React Native](./_instruction/Desafio04.md)

## Sobre o projeto
Este é um projeto React Native simples que implementa uma interface que se comunica com uma API REST, os recursos da interface permitem a manipulação de um array de dados que armazena repositórios e alguns dados do mesmo.

## Testando a aplicação
Este projeto contem testes automatizados de suas funcionalidades, para executar esses testes execute o comando `yarn test` após instalar as dependências do mesmo.

## Execução
Para executar este projeto abra o arquivo [api.js](./src/services/api.js) localizado em `src/services` e edite o endereço IP do parâmetro baseURL para corresponder ao endereço IP do seu computador, em seguida abra o diretório raiz por meio do terminal e execute os comandos abaixo:
- `yarn install`
- `yarn start`
- `yarn android` ou `yarn ios` dependendo do seu ambiente

É necessário ter um emulador de celular Android ou IOS instalado, ou um dispositivo físico com permissões de desenvolvedor ligados a maquina.

Para que o mesmo funcione será necessário executar o back-end disponível no diretório [backend](../backend), as instruções de execução do projeto referenciado estão disponíveis na raiz de seu diretório.
