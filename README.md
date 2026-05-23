# Cypress ServeRest QA Tests

Projeto de automação de testes E2E e API para a aplicação ServeRest, desenvolvido com Cypress e JavaScript.

## Tecnologias

- [Cypress](https://www.cypress.io/) - Framework de testes E2E
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de programação
- [Faker.js](https://fakerjs.dev/) - Geração de dados fake para testes

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/cypress-serverest-qa-tests.git

# Entrar na pasta do projeto
cd cypress-serverest-qa-tests

# Instalar dependências
npm install

```

## Executando os testes

```bash
# Abrir o Cypress Test Runner (modo interativo)
npm run test:open

# Executar todos os testes (API + E2E)
npm test

# Executar apenas testes de API
npm run test:api

# Executar apenas testes E2E (Frontend)
npm run test:e2e
```

## Estrutura do Projeto

```
cypress-serverest-qa-tests/
├── cypress/
│   ├── e2e/
│   │   ├── api/           # Testes de API
│   │   │   ├── usuarios.cy.js
│   │   │   ├── login.cy.js
│   │   │   └── produtos.cy.js
│   │   └── frontend/      # Testes E2E
│   │       ├── cadastro.cy.js
│   │       ├── produtos.cy.js
│   │       └── carrinho.cy.js
│   ├── support/
│   │   ├── commands.js    # Comandos customizados
│   │   └── e2e.js
│   └── fixtures/          # Dados mockados
├── cypress.config.js      # Configurações do Cypress
└── package.json
```

## Cenários de Teste

### API Tests (8 cenários)

#### Usuários
- Criar usuário com sucesso
- Validar erro ao criar usuário duplicado
- Listar usuários cadastrados

#### Login
- Login com credenciais válidas
- Login com credenciais inválidas
- Login com email não cadastrado

#### Produtos
- Criar produto autenticado como admin
- Listar produtos cadastrados
- Deletar produto existente
- Validar erro ao criar produto sem autenticação

### E2E Tests (3 cenários)

#### Cadastro de Usuário
- Realizar cadastro completo com sucesso
- Validar erro ao cadastrar email já existente
- Validar campos obrigatórios do formulário

#### Gestão de Produtos *(em desenvolvimento)*
- Criar produto via interface (setup via API)
- Validar produto na listagem

#### Carrinho de Compras *(em desenvolvimento)*
- Adicionar produto ao carrinho
- Remover produto do carrinho
- Validar carrinho vazio

## Estratégia de Testes

Este projeto segue a **pirâmide de testes**, priorizando:

1. **Testes de API** (base) - Validam regras de negócio e contratos
2. **Testes E2E** (topo) - Validam jornadas críticas do usuário

Essa abordagem garante:
- Execução rápida
- Alta cobertura
- Menor fragilidade
- Melhor custo-benefício

## Boas Práticas Aplicadas

- Comandos customizados reutilizáveis
- Separação clara entre testes API e E2E
- Setup/teardown com hooks (before, after, beforeEach, afterEach)
- Criação dinâmica de dados de teste
- Variáveis de ambiente para configurações sensíveis
- Asserções claras e descritivas
- Independência entre testes (cada teste cria seus próprios dados)
- Cleanup automático (remoção de dados após testes)

## Segurança

Este projeto não requer credenciais pré-configuradas. Todos os testes criam seus próprios dados de forma dinâmica e isolada via API, garantindo:

- Independência entre execuções
- Segurança (sem dados sensíveis no repositório)
- Facilidade de uso (clone e rode).

## Aplicação Testada

- **Frontend**: https://front.serverest.dev/
- **API**: https://serverest.dev/
