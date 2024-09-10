# Heroes Explorer

Heroes Explorer é uma aplicação web desenvolvida com Angular que permite aos usuários explorar personagens do universo Marvel. A aplicação utiliza a API da Marvel para buscar e exibir informações sobre heróis e vilões.

## Funcionalidades

- **Busca de Personagens**: Permite aos usuários buscar personagens pelo nome.
- **Lista de Personagens**: Exibe uma lista de personagens com informações básicas.

- **Favoritos**: Permite marcar personagens como favoritos para acesso rápido.

## Estrutura do Projeto

### Componentes Principais

- **HomeComponent**: Componente principal que exibe a página inicial com a lista de personagens e a barra de busca.
- **HeaderComponent**: Componente que exibe o cabeçalho da aplicação.
- **SearchComponent**: Componente de busca que permite aos usuários procurar personagens pelo nome.
- **FavoriteHeroComponent**: Componente que exibe o personagem favorito do usuário.

### Serviços

- **MarvelService**: Serviço responsável por fazer as requisições à API da Marvel e gerenciar os dados dos personagens.

### Interfaces

- **IHero**: Interface que define a estrutura dos dados de um personagem.

## Estrutura de Pastas

A estrutura de pastas da aplicação é organizada da seguinte forma:

```
heroes-explorer/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml
│   │   ├── ng-update.yml
│   │   └── sonarcloud-scan.yml
│   ├── dependabot.yml
│   └── server.js
├── .husky/
│   └── pre-commit
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── public/
│   ├── assets/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       ├── favorite-hero.service.ts
│   │   │       ├── marvel.service.ts
│   │   │       └── storage.service.ts
│   │   ├── features/
│   │   │   ├── header/
│   │   │   │   ├── header.component.scss
│   │   │   │   └── header.component.ts
│   │   │   ├── heroes-list/
│   │   │   │   └── heroes-list.component.ts
│   │   │   ├── pre-loading/
│   │   │   │   ├── pre-loading.component.ts
│   │   │   │   ├── pre-loading.component.spec.ts
│   │   │   │   └── pre-loading.component.scss
│   │   │   ├── pagination.component.ts
│   │   │   ├── search.component.ts
│   │   ├── pages/
│   │   │   └── home.component.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── favorite-hero.component.ts
│   │   │   │   └── hero-card.component.ts
│   │   │   ├── directives/
│   │   │   │   └── title.directive.ts
│   │   │   └── models/
│   │   │       └── hero.ts
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── environments/
│   │   ├── environment.development.ts
│   │   └── environment.ts
│   ├── mocks/
│   │   └── hero.mock.ts
│   ├── index.html
│   ├── main.ts
│   └── setup.jest.ts
│   ├── styles.scss
├── .editorconfig
├── .gitignore
├── .lintstagedrc
├── .stylelintrc.json
├── angular.json
├── environment.example.ts
├── eslint.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── sonar-project.properties
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
```

## Configuração e Execução

### Pré-requisitos

- Node.js v20.17.0
- Angular CLI v18.2.3

### Instalação

1. Clone o repositório:

   ```
   git clone https://github.com/patzsl/heroes-explorer
   cd heroes-explorer
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

### Executando Testes

Para executar os testes, utilize:

```bash
npm run test:coverage
```

### Build

Para gerar uma build de produção, execute:

```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

## Configuração do Ambiente

As configurações de ambiente estão localizadas no arquivo `environment.ts`.

## Integração Contínua e Entrega Contínua (CI/CD)

Este projeto está configurado com GitHub Actions para realizar CI/CD. Utilizamos SonarCloud para análise de código e Vercel para deploy.

### GitHub Actions

Os workflows do GitHub Actions estão configurados para rodar testes, análises de código e deploys automáticos. Veja os arquivos de configuração em `.github/workflows/`.

### SonarCloud

SonarCloud é utilizado para análise de qualidade do código. A configuração pode ser encontrada no arquivo `sonar-project.properties`.

### Vercel

O deploy da aplicação é feito automaticamente no Vercel. A configuração do Vercel está integrada nos workflows do GitHub Actions. O deploy em produção está disponível no link [https://icatucase.patzcodes.tech](https://icatucase.patzcodes.tech).

## Styleguide e Commits Convencionais

O projeto segue o styleguide do Angular e utiliza Conventional Commits para padronizar as mensagens de commit.

## Melhorias Futuras

Aqui estão algumas melhorias que gostaria de implementar no futuro:

- **Skeleton para Carregamento**: Adicionar skeletons para melhorar a experiência do usuário durante o carregamento dos dados.
- **Melhorar o Layout do Componente de Busca**: Refinar o design e a usabilidade do componente de busca para uma melhor experiência do usuário.
- **Acrescentar Mais Páginas**: Expandir a aplicação com mais páginas e funcionalidades para enriquecer a experiência do usuário.
- **Autenticação de Usuário**: Implementar autenticação para permitir que os usuários salvem suas preferências e favoritos.
- **Comentários e Avaliações**: Permitir que os usuários comentem e avaliem os personagens.
- **Modo Escuro**: Adicionar suporte para modo escuro para melhorar a acessibilidade e a experiência do usuário.
- **Internacionalização (i18n)**: Suporte para múltiplos idiomas para alcançar um público mais amplo.
- **Notificações em Tempo Real**: Implementar notificações para alertar os usuários sobre novos personagens ou atualizações.
- **Detalhes dos Personagens**: Adicionar páginas detalhadas para cada personagem, incluindo biografia, histórias em quadrinhos, séries e eventos relacionados.
