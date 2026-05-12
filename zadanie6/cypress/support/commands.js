Cypress.Commands.add('loginByApi', (email, password, token) => {
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: { access_token: token, token_type: 'bearer' },
  }).as('loginRequest');

  window.localStorage.setItem('token', token);
  window.localStorage.setItem('userEmail', email);
});

Cypress.Commands.add('setLoggedIn', (userData) => {
  window.localStorage.setItem('token', userData.token);
  cy.intercept('GET', '/api/users/me', {
    statusCode: 200,
    body: {
      id: userData.id,
      email: userData.email,
      username: userData.username,
    },
  }).as('getMe');
});

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userEmail');
});
