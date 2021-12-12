<h1 align="center">
  REPOSITORY-MANAGER
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#testando-os-projetos">Testando os projetos</a>
</p>

---
<br />

## Lista de correspondências
* [Desafio 02: Conceitos do Node.js](./_instruction/Desafio02.md)
* [Desafio 03: Conceitos do ReactJS](./_instruction/Desafio03.md)
* [Desafio 04: Conceitos do React Native](./_instruction/Desafio04.md)

## Sobre o projeto
Este projeto corresponde a fusão do conteúdo desenvolvido nos desafios 02, 03 e 04 do Bootcamp, esse oferece uma api que manipula uma listagem de repositórios do github e um front-end web que consome essa api assim como um aplicativo mobile que possi a mesma finalidade.

## Execução
Para executar este projeto siga as etapas listadas abaixo

### Iniciando o backend
- Acesse o diretório [backend](./backend) por meio do terminal
- Execute os comandos `yarn install` e `yarn dev` para baixar as dependências e iniciar o servidor respectivamente

### Iniciando o aplicativo web
- Acesse o diretório [web](./web) por meio do terminal
- Execute os comandos `yarn install` e `yarn start` para colocar o frontend no ar

### Iniciando o aplicativo mobile
- Abra o arquivo [api.js](./mobile/src/services/api.js) localizado em `mobile/src/services` e edite o endereço IP do parâmetro baseURL para corresponder ao endereço IP do seu computador
- Em seguida acesse o diretório [mobile](./mobile) por meio do terminal
- Execute os comandos `yarn install` e `yarn start` para baixar as dependências e executar o bundle server
- Execute o comando `yarn android` ou `yarn ios` dependendo do seu ambiente

É necessário ter um emulador de celular Android ou IOS instalado, ou um dispositivo físico com permissões de desenvolvedor ligados a maquina.

## Testando os projetos
Todos os três projetos possuem testes automatizados, para executar esses testes execute o comando `yarn test` após instalar as dependências do mesmo.

Os testes para as rotas da API podem ser realizados manualmente por meio de qualquer ferramenta que teste rotas de uma API REST. Dentro da pasta [client](./backend/client) do projeto backend você encontrará esquemas de requisição http que podem ser enviados diretamente por meio de sua IDE, se você estiver usando VS Code, instale a extensão *REST Client* para fazer uso deste recurso.
