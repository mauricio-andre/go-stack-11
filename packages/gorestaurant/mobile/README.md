<h1 align="center">
  GORESTAURANT
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>
</p>

---
<br />

## Lista de correspondências
* [Desafio 11: GoRestaurant Mobile](./_instruction/Desafio11.md)

## Sobre o projeto
Após a criação do projeto GoRestaurant construido para a Web, chegou a hora de desenvolver uma versão mobile deste mesmo sistema. Este projeto conta com uma tela de listagem dos pratos cadastrados, a consulta dos detalhes de cada prato com as funcionalidades de acrescentar itens extras ao seu prato antes de finalizar a compra, também é possível adicionar pratos a uma listagem de favoritos e visualizar o histórico de compras realizada.


## Execução
Para executar este projeto acesse o diretório do mesmo por meio do terminal e execute os comandos abaixo:
- `yarn install`
- `yarn json-server server.json -p 3333` Este comando serve para iniciar o servidor da aplicação
- `yarn start`
- `yarn android` ou `yarn ios`

Pode ser necessário acessar o arquivo [api](./src/services/api.ts) e alterar o parâmetro baseURL para o correspondente ao seu endereço de execução do backend.

Este projeto não foi testado em dispositivos IOS.
