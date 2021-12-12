<h1 align="center">
  <img src="./assets/logo.png" alt="GoRestaurante" />
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>
</p>

---
<br />

## Lista de correspondências
* [Desafio 10: GoRestaurant Web](./_instruction/Desafio10.md)
* [Desafio 11: GoRestaurant Mobile](./_instruction/Desafio11.md)

## Sobre o projeto
Sistema Web e mobile para encomendar um delicioso prato de comida italiana!
Por meio do sistema Web é possível cadastrar novos pratos, editar os pratos existentes e controlar a sua disponibilidade, e por meio do sistema mobile é possível encomendar os seus pratos favoritos e incluir adicionais aos seus pratos.

<img src="./assets/print.png" width="800px" style="max-width: 100%" alt="Print da tela inicial" />

## Execução
Para executar este projeto siga as etapas listadas abaixo

### Iniciando o backend
Este projeto não possui um backend criado, os dados da API são simulados por meio do json-server, antes de executar o projeto web ou mobile, acesse o diretório do projeto desejado e executa o comando `yarn json-server server.json -p 3333` para simular a existência de uma API.

### Iniciando o aplicativo web
- Acesse o diretório [web](./web) por meio do terminal
- Execute os comandos `yarn install` e `yarn start` para colocar o frontend no ar

### Iniciando o aplicativo mobile
- Abra o arquivo [api.js](./mobile/src/services/api.js) localizado em `mobile/src/services` e edite o endereço IP do parâmetro baseURL para corresponder ao endereço IP do seu computador
- Em seguida acesse o diretório [mobile](./mobile) por meio do terminal
- Execute os comandos `yarn install` e `yarn start` para baixar as dependências e executar o bundle server
- Execute o comando `yarn android` ou `yarn ios` dependendo do seu ambiente

É necessário ter um emulador de celular Android ou IOS instalado, ou um dispositivo físico com permissões de desenvolvedor ligados a maquina.
