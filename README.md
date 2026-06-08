# Monitor UNIFEI

Sistema web desenvolvido para monitoramento de salas por meio da integração com o Firebase Realtime Database. A aplicação exibe, em tempo real, informações coletadas por dispositivos IoT e disponibilizadas em um dashboard desenvolvido com Angular.

## Funcionalidades

* Visualização de dados em tempo real.
* Integração com Firebase Realtime Database.
* Interface responsiva desenvolvida com Angular.
* Atualização automática dos dados sem necessidade de recarregar a página.
* Estrutura preparada para expansão de novos sensores e métricas.

## Tecnologias Utilizadas

* Angular
* TypeScript
* Firebase Realtime Database
* Tailwind CSS
* Node.js
* NPM

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

* Node.js (versão LTS recomendada)
* NPM
* Angular CLI
* Git

Opcionalmente, recomenda-se utilizar o NVM para gerenciamento de versões do Node.js.

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/raveljalmeida/InterfaceWeb-FaceOff.git
cd SEU-REPOSITORIO
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Instalar o Angular CLI

```bash
npm install -g @angular/cli
```

### 4. Configurar o Firebase

Localize o arquivo:

```text
src/app/services/room.service.ts
```

Substitua o valor da variável `apiUrl` pela URL da sua instância do Firebase Realtime Database.

Exemplo:

```typescript
private apiUrl = 'https://seu-projeto-default-rtdb.firebaseio.com';
```

## Executando a aplicação

Inicie o servidor de desenvolvimento:

```bash
ng serve
```

Após a inicialização, acesse:

```text
http://localhost:4200
```

## Estrutura do Projeto

```text
src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── models/
├── assets/
├── environments/
└── styles/
```

## Firebase

Este projeto utiliza o Firebase Realtime Database como fonte de dados.

Para criar uma instância:

1. Acesse o Firebase Console.
2. Crie um novo projeto.
3. Ative o Realtime Database.
4. Copie a URL do banco.
5. Atualize a variável `apiUrl` no projeto.

## Desenvolvimento

Executar servidor local:

```bash
ng serve
```

Gerar build de produção:

```bash
ng build
```

Executar testes:

```bash
ng test
```
