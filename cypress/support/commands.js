// ***********************************************
// Custom commands for API requests
// ***********************************************

/**
 * Custom command to make API requests with base URL
 * @example cy.apiRequest('POST', '/usuarios', { nome: 'Teste' })
 */
Cypress.Commands.add('apiRequest', (method, endpoint, body = null, headers = {}) => {
  const baseUrl = Cypress.config('apiUrl');
  
  return cy.request({
    method: method,
    url: `${baseUrl}${endpoint}`,
    body: body,
    headers: headers,
    failOnStatusCode: false
  });
});

/**
 * Create a user via API
 * @example cy.createUser({ nome: 'User', email: 'test@test.com', password: '123', administrador: 'true' })
 */
Cypress.Commands.add('createUser', (userData) => {
  return cy.apiRequest('POST', '/usuarios', userData);
});

/**
 * Login via API and return token
 * @example cy.loginApi('email@test.com', 'password').then(token => ...)
 */
Cypress.Commands.add('loginApi', (email, password) => {
  return cy.apiRequest('POST', '/login', { email, password })
    .then((response) => {
      expect(response.status).to.eq(200);
      return response.body.authorization;
    });
});

/**
 * Create a product via API (requires admin token)
 * @example cy.createProduct(token, { nome: 'Product', preco: 100, descricao: 'Desc', quantidade: 10 })
 */
Cypress.Commands.add('createProduct', (token, productData) => {
  return cy.apiRequest('POST', '/produtos', productData, {
    'Authorization': token
  });
});

/**
 * Delete a user via API
 */
Cypress.Commands.add('deleteUser', (userId) => {
  return cy.apiRequest('DELETE', `/usuarios/${userId}`);
});

/**
 * Delete a product via API
 */
Cypress.Commands.add('deleteProduct', (productId, token) => {
  return cy.apiRequest('DELETE', `/produtos/${productId}`, null, {
    'Authorization': token
  });
});

// ***********************************************
// Custom commands for Frontend interactions
// ***********************************************

/**
 * Login through the UI
 */
Cypress.Commands.add('loginUI', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
});

/**
 * Generate random user data
 */
Cypress.Commands.add('generateUserData', (isAdmin = false) => {
  const timestamp = Date.now();
  return {
    nome: `Usuario Teste ${timestamp}`,
    email: `teste${timestamp}@qa.com`,
    password: 'teste@123',
    administrador: isAdmin ? 'true' : 'false'
  };
});
