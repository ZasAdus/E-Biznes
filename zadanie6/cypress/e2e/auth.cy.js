import testData from '../fixtures/testData.json';

const { user } = testData;

describe('Auth – rejestracja i logowanie', () => {
  it('T01 – rejestracja nowego konta', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: { message: 'Konto utworzone pomyślnie' },
    }).as('register');
    cy.visit('/register');
    cy.get('input[placeholder="Jan Kowalski"]').type(user.username);
    cy.get('input[type="email"]').first().type(user.email);
    cy.get('input[placeholder*="Min. 8 znaków"]').type(user.password);
    cy.get('button[type="submit"], button').contains(/zarejestruj/i).click();
    cy.wait('@register').its('request.body').should('include', { email: user.email });
    cy.url().then((url) => {
      if (url.includes('/login')) {
      } else {
        cy.contains(/konto.*utworzon|rejestracja.*udana|zaloguj/i).should('be.visible');
      }
    });
  });

  it('T02 – rejestracja zajętym emailem', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 409,
      body: { detail: 'Email już istnieje' },
    }).as('registerConflict');
    cy.visit('/register');
    cy.get('input[placeholder="Jan Kowalski"]').type(user.username);
    cy.get('input[type="email"]').first().type(user.email);
    cy.get('input[placeholder*="Min. 8 znaków"]').type(user.password);
    cy.get('button[type="submit"], button').contains(/zarejestruj/i).click();
    cy.wait('@registerConflict');
    cy.contains(/email.*istnieje|zajęty|already|conflict/i).should('be.visible');
  });

  it('T03 – logowanie przekierowuje na stronę główną', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { access_token: user.token, token_type: 'bearer' },
    }).as('login');
    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: { id: user.id, email: user.email, username: user.username },
    }).as('getMe');
    cy.visit('/login');
    cy.get('input[name="email"], input[type="email"]').type(user.email);
    cy.get('input[name="password"], input[type="password"]').type(user.password);
    cy.get('button[type="submit"], button').contains(/zaloguj/i).click();
    cy.wait('@login');
    cy.window().its('localStorage').invoke('getItem', 'token')
      .should('eq', user.token);
    cy.contains(/sprzedaj|moje konto|wyloguj/i).should('be.visible');
  });

  it('T04 – logowanie błędnym hasłem', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { detail: 'Nieprawidłowy email lub hasło' },
    }).as('loginFail');
    cy.visit('/login');
    cy.get('input[name="email"], input[type="email"]').type(user.email);
    cy.get('input[name="password"], input[type="password"]').type('WrongPassword!');
    cy.get('button[type="submit"], button').contains(/zaloguj/i).click();
    cy.wait('@loginFail');
    cy.contains(/Nieprawidłowy/).should('be.visible');
  });

  it('T05 – reset hasła', () => {
    cy.intercept('PATCH', '/api/auth/reset-password', {
      statusCode: 200,
      body: { message: 'Email resetujący został wysłany' },
    }).as('resetPassword');
    cy.visit('/login');
    cy.contains('button', /nie pamiętasz hasła/i).click();
    cy.contains('label', /email konta/i).find('input').type(user.email);
    cy.contains('label', /nowe hasło/i).find('input').type('NewTest123!');
    cy.contains('label', /potwierdź hasło/i).find('input').type('NewTest123!');
    cy.contains('button', /zresetuj hasło/i).click();
    cy.wait('@resetPassword')
      .its('request.body')
      .should('include', { email: user.email, new_password: 'NewTest123!' });
    cy.contains(/hasło zostało zresetowane|możesz się zalogować/i).should('be.visible');
  });
});