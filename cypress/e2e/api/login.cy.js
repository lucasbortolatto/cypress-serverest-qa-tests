describe('API - Login', () => {
  let userId;
  const timestamp = Date.now();

  const testUser = {
    nome: `Usuario Login ${timestamp}`,
    email: `login${timestamp}@qa.com.br`,
    password: 'senha@123',
    administrador: 'false'
  };

  before(() => {
    // Criar usuário para usar nos testes de login
    cy.createUser(testUser).then((response) => {
      userId = response.body._id;
    });
  });

  after(() => {
    // Remover usuário após todos os testes
    if (userId) {
      cy.deleteUser(userId);
    }
  });

  it('Deve realizar login com credenciais válidas', () => {
    cy.apiRequest('POST', '/login', {
      email: testUser.email,
      password: testUser.password
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      
      // Validar que o token não está vazio
      expect(response.body.authorization).to.not.be.empty;
      
      // Validar formato do token (Bearer ...)
      expect(response.body.authorization).to.include('Bearer');
    });
  });

  it('Não deve permitir login com credenciais inválidas', () => {
    cy.apiRequest('POST', '/login', {
      email: testUser.email,
      password: 'senhaErrada123'
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });

  it('Não deve permitir login com email não cadastrado', () => {
    cy.apiRequest('POST', '/login', {
      email: 'emailinexistente@teste.com',
      password: 'qualquersenha'
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});