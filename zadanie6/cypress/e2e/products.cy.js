import testData from '../fixtures/testData.json';

const { user, product, product2, categories } = testData;
const setupAuth = () => { 
  Cypress.once('window:before:load', (win) => {
    win.localStorage.setItem('token', user.token);
  });
  cy.intercept('GET', '/api/users/me', {
    statusCode: 200,
    body: { id: user.id, email: user.email, username: user.username, display_name: user.display_name },
  }).as('getMe');
};

describe('Produkty – przeglądanie i zarządzanie', () => {
  it('T06 – strona główna wyświetla listę produktów', () => {
    cy.intercept('GET', '/api/products*', {
      statusCode: 200,
      body: [product, product2],
    }).as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts');
    cy.contains(product.title).should('be.visible');
    cy.contains(product2.title).should('be.visible');
  });

  it('T07 – wyszukiwanie produktów', () => {
    cy.intercept('GET', '/api/products*', {
      statusCode: 200,
      body: [product],
    }).as('getProductsFiltered');
    cy.visit('/');
    cy.wait('@getProductsFiltered'); 
    cy.get('input[placeholder="Szukaj"]').type('Laptop');
    cy.contains('button', /^Szukaj$/i).click();
    cy.wait('@getProductsFiltered').its('request.url').should('include', 'q=');
    cy.contains(product.title).should('be.visible');
  });

  it('T08 – filtrowanie po cenach', () => {
    cy.intercept('GET', '/api/products*', (req) => {
      req.reply({ statusCode: 200, body: [product] });
    }).as('getProductsPrice');
    cy.visit('/');
    cy.wait('@getProductsPrice');
    cy.get('input[placeholder="Min cena"]').clear().type('1000');
    cy.get('input[placeholder="Max cena"]').clear().type('5000');
    cy.contains('button', /^Szukaj$/i).click();
    cy.wait('@getProductsPrice').its('request.url')
      .should('include', 'min_price')
      .and('include', 'max_price');
  });

  it('T09 – strona szczegółów produktu', () => {
    cy.intercept('GET', `/api/products/${product.id}`, {
      statusCode: 200,
      body: product,
    }).as('getProduct');
    cy.intercept('GET', `/api/products/${product.id}/opinions`, {
      statusCode: 200,
      body: [],
    }).as('getOpinions');
    cy.intercept('GET', '/api/favorites/ids', { statusCode: 200, body: [] }).as('getFavIds');
    cy.visit(`/products/${product.id}`);
    cy.wait('@getProduct');
    cy.contains(product.title).should('be.visible');
    cy.contains(product.price.toString()).should('be.visible');
    cy.get('#btn-add-to-cart').should('be.visible');
  });

  it('T10 – formularz dodawania produktu', () => {
    setupAuth();
    cy.intercept('GET', '/api/categories', { statusCode: 200, body: categories }).as('getCategories');
    cy.intercept('POST', '/api/products', {
      statusCode: 201,
      body: { ...product, id: 99 },
    }).as('createProduct');
    cy.visit('/sell');
    cy.contains('label', /tytuł/i).find('input').type(product.title);
    cy.contains('label', /opis/i).find('textarea').type(product.description);
    cy.contains('label', /cena/i).find('input').type(product.price.toString());
    cy.contains('label', /kategoria/i).find('select').select('2');
    cy.contains('button', /dodaj ofertę/i).click();
    cy.wait('@createProduct').its('request.body').should('include', { title: product.title });
    cy.url().should('include', '/products/99');
  });

  it('T11 – formularz edycji produktu', () => {
    setupAuth();
    const updatedTitle = 'Plecak Nike Air Max 2026';
    cy.intercept('GET', `/api/products/${product.id}`, {
      statusCode: 200,
      body: { ...product, seller_id: user.id },
    }).as('getProduct');
    cy.intercept('GET', '/api/categories', { statusCode: 200, body: categories }).as('getCategories');
    cy.intercept('PATCH', `/api/products/${product.id}`, {
      statusCode: 200,
      body: { ...product, title: updatedTitle },
    }).as('updateProduct');
    cy.visit(`/products/${product.id}/edit`);
    cy.wait('@getProduct');
    cy.contains('label', /tytuł/i).find('input').clear().type(updatedTitle);
    cy.contains('button', /zapisz zmiany/i).click();
    cy.wait('@updateProduct')
      .its('request.body')
      .should('have.property', 'title', updatedTitle);
    cy.url().should('include', `/products/${product.id}`);
  });
});
