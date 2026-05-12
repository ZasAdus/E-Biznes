import testData from '../fixtures/testData.json';

const { user, product, product2, order, ycoinsBalance } = testData;

const setupAuth = () => {
  Cypress.once('window:before:load', (win) => {
    win.localStorage.setItem('token', user.token);
  });

  cy.intercept('GET', '/api/users/me', {
    statusCode: 200,
    body: { id: user.id, email: user.email, username: user.username, display_name: user.display_name },
  }).as('getMe');
};

const seedCart = (products) => {
  Cypress.once('window:before:load', (win) => {
    win.localStorage.setItem('marketplace_y_cart', JSON.stringify(products));
  });
};

describe('Koszyk i Checkout', () => {
  beforeEach(() => {
    setupAuth();
  });

  it('T12 – kliknięcie "Dodaj do koszyka"', () => {
    cy.intercept('GET', '/api/orders/mine', { statusCode: 200, body: [] }).as('getMyOrders');
    cy.intercept('GET', `/api/products/${product.id}`, {
      statusCode: 200,
      body: product,
    }).as('getProduct');
    cy.intercept('GET', `/api/products/${product.id}/opinions`, {
      statusCode: 200,
      body: [],
    }).as('getOpinions');
    cy.intercept('GET', '/api/favorites/ids', { statusCode: 200, body: [] }).as('getFavIds');
    cy.intercept('GET', '/api/ycoins/from-amount*', {
      statusCode: 200,
      body: { ycoins: 400 },
    }).as('getYcoins');
    cy.visit(`/products/${product.id}`);
    cy.wait('@getProduct');
    cy.get('#btn-add-to-cart').click();
    cy.get('#nav-cart-link .cart-badge').should('contain', '1');
  });

  it('T13 – produkty są w koszyku i można je usunąć', () => {
    seedCart([{ product: { ...product } }]);
    cy.visit('/cart');
    cy.contains(product.title).should('be.visible');
    cy.get('button[aria-label="Usuń z koszyka"]').first().click();
    cy.contains(product.title).should('not.exist');
  });

  it('T14 – kupowanie przy pomocy karty', () => {
    seedCart([{ product: { ...product } }]);
    cy.intercept('POST', '/api/orders', {
      statusCode: 201,
      body: order,
    }).as('createOrder');
    cy.intercept('POST', '/api/payments', {
      statusCode: 201,
      body: { id: 5, order_id: order.id, method: 'card', status: 'pending' },
    }).as('createPayment');
    cy.visit('/checkout');
    cy.contains(product.title).should('be.visible');
    cy.get('#pay-method-card').click();
    cy.get('#card-num').type('1234567890123456');
    cy.get('#card-exp').type('12/30');
    cy.get('#card-cvv').type('123');
    cy.contains('button', /zapłać kartą/i).click();
    cy.wait('@createOrder');
    cy.wait('@createPayment').its('request.body').should('include', { provider: 'card' });
    cy.contains(/płatność zakończona pomyślnie|zamówienie zostało opłacone/i).should('be.visible');
  });

  it('T15 – kupowanie po przez Ycoiny', () => {
    seedCart([{ product: { ...product } }]);
    cy.intercept('GET', '/api/ycoins/balance', {
      statusCode: 200,
      body: { ycoin_balance: 50000 },
    }).as('getYcoinsBalance');
    cy.intercept('POST', '/api/orders', {
      statusCode: 201,
      body: order,
    }).as('createOrder');
    cy.intercept('POST', '/api/payments', {
      statusCode: 201,
      body: { id: 6, order_id: order.id, method: 'ycoin', status: 'pending' },
    }).as('createPayment');
    cy.visit('/checkout');
    cy.get('#pay-method-ycoin').click();
    cy.wait('@getYcoinsBalance');
    cy.contains('button', /zapłać .* ycoin/i).click();
    cy.wait('@createOrder');
    cy.wait('@createPayment').its('request.body').should('include', { provider: 'ycoin' });
    cy.contains(/płatność zakończona pomyślnie|zamówienie zostało opłacone/i).should('be.visible');
  });

  it('T16 – pusty koszyk => nie można kupować', () => {
    Cypress.once('window:before:load', (win) => {
      win.localStorage.removeItem('marketplace_y_cart');
      win.localStorage.setItem('marketplace_y_cart', JSON.stringify([]));
    });
    cy.visit('/cart');
    cy.get('body').then(($body) => {
      const btn = $body.find('button:contains("Przejdź"), button:contains("Zamów"), button:contains("Checkout")');
      if (btn.length > 0) {
        cy.wrap(btn.first()).should('be.disabled');
      } else {
        cy.contains(/koszyk.*pusty|brak.*produktów/i).should('be.visible');
      }
    });
  });
});