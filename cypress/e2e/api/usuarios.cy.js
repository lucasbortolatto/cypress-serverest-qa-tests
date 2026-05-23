describe('API - Usuários', () => {
  let userId;
  const timestamp = Date.now();

  const validUser = {
    nome: `Usuario Teste ${timestamp}`,
    email: `teste${timestamp}@qa.com.br`,
    password: 'senha@123',
    administrador: 'true'
  };

  afterEach(() => {
    // Cleanup: remover usuário criado após cada teste
    if (userId) {
      cy.deleteUser(userId);
      userId = null;
    }
  });

  it('Deve criar um novo usuário com sucesso', () => {
    cy.apiRequest('POST', '/usuarios', validUser)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        
        userId = response.body._id;
        
        // Validar que o ID foi retornado e não está vazio
        expect(userId).to.not.be.empty;
      });
  });

  it('Não deve permitir criar usuário com email duplicado', () => {
    // Primeiro, criar um usuário
    cy.createUser(validUser).then((response) => {
      userId = response.body._id;
      
      // Tentar criar outro usuário com o mesmo email
      cy.apiRequest('POST', '/usuarios', validUser)
        .then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property('message', 'Este email já está sendo usado');
        });
    });
  });

  it('Deve listar usuários cadastrados', () => {
    // Criar um usuário antes de listar
    cy.createUser(validUser).then((response) => {
      userId = response.body._id;
      
      // Listar todos os usuários
      cy.apiRequest('GET', '/usuarios')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('usuarios');
          expect(response.body.usuarios).to.be.an('array');
          expect(response.body.usuarios.length).to.be.greaterThan(0);
          
          // Validar que o usuário criado está na lista
          const userFound = response.body.usuarios.find(u => u._id === userId);
          expect(userFound).to.not.be.undefined;
          expect(userFound.nome).to.eq(validUser.nome);
          expect(userFound.email).to.eq(validUser.email);
        });
    });
  });
});