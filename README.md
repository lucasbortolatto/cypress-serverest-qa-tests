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

# Configurar variáveis de ambiente
cp cypress.env.example.json cypress.env.json
# Edite cypress.env.json com suas credenciais de teste
```

## Executando os testes

```bash
# Abrir o Cypress Test Runner (modo interativo)
npx cypress open

# Executar todos os testes em modo headless
npx cypress run

# Executar apenas testes de API
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"

# Executar apenas testes E2E
npx cypress run --spec "cypress/e2e/frontend/**/*.cy.js"
```

## 📁 Estrutura do Projeto

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

### API Tests (7 cenários)

#### Usuários
- Criar usuário com sucesso
- Validar erro ao criar usuário duplicado
- Listar usuários cadastrados

#### Login
- Login com credenciais válidas
- Login com credenciais inválidas

#### Produtos
- Criar produto (autenticado como admin)
- Listar produtos
- Deletar produto

## 🎯 Estratégia de Testes

Este projeto segue a **pirâmide de testes**, priorizando:

1. **Testes de API** (base) - Validam regras de negócio e contratos
2. **Testes E2E** (topo) - Validam jornadas críticas do usuário

Essa abordagem garante:
- ⚡ Execução rápida
- 🎯 Alta cobertura
- 🛡️ Menor fragilidade
- 💰 Melhor custo-benefício

## 📝 Boas Práticas Aplicadas

- ✅ Page Object Pattern
- ✅ Comandos customizados reutilizáveis
- ✅ Separação de testes API e E2E
- ✅ Uso de fixtures para dados de teste
- ✅ Variáveis de ambiente para credenciais
- ✅ Asserções claras e descritivas
- ✅ Independência entre testes

## 🔒 Segurança

As credenciais de teste estão armazenadas em `cypress.env.json` que **não é commitado** no repositório.
Use o arquivo `cypress.env.example.json` como template.

## 📚 Aplicação Testada

- **Frontend**: https://front.serverest.dev/
- **API**: https://serverest.dev/

## 👤 Autor

Desenvolvido como parte de desafio técnico para vaga de QA.
