describe('API - Produtos', () => {
  let adminToken;
  let adminUserId;
  let productId;
  const timestamp = Date.now();

  const adminUser = {
    nome: `Admin Produtos ${timestamp}`,
    email: `admin${timestamp}@qa.com.br`,
    password: 'admin@123',
    administrador: 'true'
  };

  const validProduct = {
    nome: `Produto Teste ${timestamp}`,
    preco: 100,
    descricao: 'Descrição do produto de teste',
    quantidade: 50
  };

  before(() => {
    // Criar usuário admin e obter token
    cy.createUser(adminUser).then((response) => {
      adminUserId = response.body._id;
      
      cy.loginApi(adminUser.email, adminUser.password).then((token) => {
        adminToken = token;
      });
    });
  });

  after(() => {
    // Limpar dados após todos os testes
    if (adminUserId) {
      cy.deleteUser(adminUserId);
    }
  });

  afterEach(() => {
    // Limpar produto criado após cada teste
    if (productId && adminToken) {
      cy.deleteProduct(productId, adminToken);
      productId = null;
    }
  });

  it('Deve criar um produto com usuário autenticado como admin', () => {
    cy.apiRequest('POST', '/produtos', validProduct, {
      'Authorization': adminToken
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      
      productId = response.body._id;
      
      // Validar que o ID foi retornado
      expect(productId).to.not.be.empty;
    });
  });

  it('Deve listar produtos cadastrados', () => {
    // Criar um produto antes de listar
    cy.createProduct(adminToken, validProduct).then((response) => {
      productId = response.body._id;
      
      // Listar todos os produtos
      cy.apiRequest('GET', '/produtos').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('produtos');
        expect(response.body.produtos).to.be.an('array');
        
        // Validar que o produto criado está na lista
        const productFound = response.body.produtos.find(p => p._id === productId);
        expect(productFound).to.not.be.undefined;
        expect(productFound.nome).to.eq(validProduct.nome);
        expect(productFound.preco).to.eq(validProduct.preco);
        expect(productFound.descricao).to.eq(validProduct.descricao);
        expect(productFound.quantidade).to.eq(validProduct.quantidade);
      });
    });
  });

  it('Deve deletar um produto existente', () => {
    // Criar produto para deletar
    cy.createProduct(adminToken, validProduct).then((response) => {
      productId = response.body._id;
      
      // Deletar o produto
      cy.apiRequest('DELETE', `/produtos/${productId}`, null, {
        'Authorization': adminToken
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        
        // Validar que o produto foi removido
        cy.apiRequest('GET', '/produtos').then((listResponse) => {
          const productFound = listResponse.body.produtos.find(p => p._id === productId);
          expect(productFound).to.be.undefined;
        });
        
        productId = null; // Limpar variável pois já foi deletado
      });
    });
  });

  it('Não deve criar produto sem autenticação', () => {
    cy.apiRequest('POST', '/produtos', validProduct).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  });
});