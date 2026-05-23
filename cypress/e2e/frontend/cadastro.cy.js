describe('E2E - Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/cadastrarusuarios');
  });

  it.only('Deve realizar cadastro completo de usuário com sucesso', () => {
    const timestamp = Date.now();
    const userData = {
      nome: `Usuario E2E ${timestamp}`,
      email: `e2e${timestamp}@qa.com.br`,
      password: 'teste@123'
    };
 
    // Preencher formulário de cadastro
    cy.get('[data-testid="nome"]').type(userData.nome);
    cy.get('[data-testid="email"]').type(userData.email);
    cy.get('[data-testid="password"]').type(userData.password);
    cy.get('[data-testid="checkbox"]').check();
    
    // Submeter formulário
    cy.get('[data-testid="cadastrar"]').click();
    
    // Validar redirecionamento para home
    cy.url().should('include', '/home');
    
    // Validar mensagem de boas-vindas
    cy.get('h1').should('contain', "Bem Vindo");
    cy.get('h1').should('contain', userData.nome);
    
    // Validar que o botão de logout está visível
    cy.get('[data-testid="logout"]').should('be.visible');
  });

  it('Deve exibir erro ao tentar cadastrar com email já existente', () => {
    const timestamp = Date.now();
    const userData = {
      nome: `Usuario Duplicado ${timestamp}`,
      email: `duplicado${timestamp}@qa.com.br`,
      password: 'senha@123',
      administrador: 'false'
    };
    
    // Criar usuário via API primeiro
    cy.createUser(userData).then((response) => {
      const userId = response.body._id;
      
      // Tentar cadastrar o mesmo email via UI
      cy.get('[data-testid="nome"]').type(userData.nome);
      cy.get('[data-testid="email"]').type(userData.email);
      cy.get('[data-testid="password"]').type(userData.password);
      cy.get('[data-testid="cadastrar"]').click();
      
      // Validar mensagem de erro
      cy.get('.alert').should('be.visible');
      cy.get('.alert').should('contain', 'Este email já está sendo usado');
      
      // Cleanup: remover usuário criado
      cy.deleteUser(userId);
    });
  });

  it('Deve validar campos obrigatórios no formulário', () => {
    // Tentar submeter formulário vazio
    cy.get('[data-testid="cadastrar"]').click();
    
    // Validar que permanece na mesma página
    cy.url().should('include', '/cadastrarusuarios');
    
    // Validar que as mensagens de erro são exibidas
    cy.get('.alert').should('be.visible');
    cy.get('.alert').should('contain', 'obrigatório');
  });
});