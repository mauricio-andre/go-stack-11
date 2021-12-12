<h1 align="center">
  PROJECTS-MANAGER
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#testando-a-API">Testando a API</a>
</p>

---
<br />

## Lista de correspondências
* Modulo 01: Back-end com Node.Js
* Modulo 02: Front-end com ReactJs
* Modulo 03: Mobile com React Native

## Sobre o projeto
Este projeto corresponde a fusão dos conteúdos desenvolvidos nos módulos 01, 02 e 03 do Bootcamp.

No modulo 01 desenvolvemos o primeiro projeto Node, sendo esse um projeto simples apenas para testar os conceitos mais básicos do node, um array de valores é acessado por rotas nos modelos de API Rest.

No modulo 02 contraímos a primeira aplicação com ReactJs, essa é uma aplicação simples que consome os recursos disponíveis pela API criada no modulo 01, permitindo portanto listar, criar e remover itens de uma lista.

O modulo 03 corresponde a criação do primeiro aplicativo mobile desenvolvido, este assim como o projeto web desenvolvido no modulo 02 consome a api desenvolvida no modulo 01 e possui as mesmas funcionalidades da versão web.


## Execução
Para executar este projeto siga as etapas listadas abaixo

### Iniciando o backend
- Acesse o diretório [backend](./backend) por meio do terminal
- Execute os comandos `yarn install` e `yarn dev` para baixar as dependências e iniciar o servidor respectivamente

### Iniciando o aplicativo web
- Acesse o diretório [web](./web) por meio do terminal
- Execute os comandos `yarn install` e `yarn dev` para colocar o frontend no ar

### Iniciando o aplicativo mobile
- Abra o arquivo [api.js](./mobile/src/services/api.js) localizado em `mobile/src/services` e edite o endereço IP do parâmetro baseURL para corresponder ao endereço IP do seu computador
- Em seguida acesse o diretório [mobile](./mobile) por meio do terminal
- Execute os comandos `yarn install` e `yarn start` para baixar as dependências e executar o bundle server
- Execute o comando `yarn android` ou `yarn ios` dependendo do seu ambiente

É necessário ter um emulador de celular Android ou IOS instalado, ou um dispositivo físico com permissões de desenvolvedor ligados a maquina.

## Testando a API
Os testes para as rotas da API podem ser realizados por meio de qualquer ferramenta que teste rotas de uma API REST. Dentro da pasta [backend/client](./backend/client) deste projeto você encontrará esquemas de requisição http que podem ser enviados diretamente por meio de sua IDE, se você estiver usando VS Code, instale a extensão *REST Client* para fazer uso deste recurso.
