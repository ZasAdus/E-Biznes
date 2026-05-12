import testData from '../fixtures/testData.json';

const { user, product, product2, order } = testData;

const setupAuth = () => {
  Cypress.once('window:before:load', (win) => {
    win.localStorage.setItem('token', user.token);
  });

  cy.intercept('GET', '/api/users/me', {
    statusCode: 200,
    body: { id: user.id, email: user.email, username: user.username, display_name: user.display_name },
  }).as('getMe');
};

describe('Zamówienia i Ulubione', () => {
  beforeEach(() => {
    setupAuth();
  });


  it('T17 – histoira zamówień wyświetla zamówienia kupującego', () => {
    const buyerEntry = {
      id: 7,
      role: 'buyer',
      status: 'zrealizowane',
      product: { ...product, title: product.title },
      purchase_price: product.price,
      counterparty: { display_name: 'Sprzedawca 1' },
      created_at: '2026-05-12T10:00:00.000Z',
    };
    cy.intercept('GET', '/api/orders/history', {
      statusCode: 200,
      body: [buyerEntry],
    }).as('getOrderHistory');
    cy.visit('/orders');
    cy.wait('@getOrderHistory');
    cy.contains(product.title).should('be.visible');
    cy.contains(/zrealizowane|completed/i).should('be.visible');
  });

  it('T18 – kupowanie', () => {
    cy.visit('/orders');
    cy.contains('button', /kupuję/i).click();
    cy.contains('button', /kupuję/i).should('have.class', 'active');
  });

  it('T19 – dodawanie do ulubionych', () => {
    cy.intercept('GET', '/api/favorites/ids', {
      statusCode: 200,
      body: [],
    }).as('getFavIds');
    cy.intercept('GET', '/api/orders/mine', { statusCode: 200, body: [] }).as('getMyOrders');
    cy.intercept('POST', `/api/favorites/${product.id}`, {
      statusCode: 201,
      body: { product_id: product.id },
    }).as('addFavorite');
    cy.intercept('GET', `/api/products/${product.id}`, {
      statusCode: 200,
      body: product,
    }).as('getProduct');
    cy.intercept('GET', `/api/products/${product.id}/opinions`, {
      statusCode: 200,
      body: [],
    }).as('getOpinions');
    cy.intercept('GET', '/api/ycoins/from-amount*', {
      statusCode: 200,
      body: { ycoins: 400 },
    }).as('getYcoins');
    cy.visit(`/products/${product.id}`);
    cy.wait('@getProduct');
    cy.contains('button', /dodaj do ulubionych/i).click();
    cy.wait('@addFavorite');
    cy.contains('button', /usuń z ulubionych/i).should('be.visible');
  });

  it('T20 – strona ulubionych pozwala usuwać produkty', () => {
    cy.intercept('GET', '/api/favorites/products', {
      statusCode: 200,
      body: [product, product2],
    }).as('getFavoriteProducts');
    cy.visit('/favorites');
    cy.wait('@getFavoriteProducts');
    cy.contains(product.title).should('be.visible');
    cy.contains(product2.title).should('be.visible');
    cy.get('a.btn-product-details').first().click();
    cy.url().should('include', `/products/${product.id}`);
  });
});