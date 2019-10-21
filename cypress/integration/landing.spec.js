describe('App landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('selected css styles for nav bar link should show up on this page', () => {
    cy.get('[data-cy=nav-bar-link]')
      .contains('home')
      .should('have.class', 'selected');
  });

  it('has the correct <h1>', () => {
    cy.get('h1').should('contain', 'Fair Weather');
  });

  it('list of countries should show up properly', () => {
    cy.get('[data-cy=countries-list]')
      .should('be.hidden')
      .invoke('show');
    cy.get('[data-cy=countries-list] li').should('have.length', 8);
    cy.get('[data-cy=countries-list]').invoke('hide');
  });

  it('clicking on a country link opens the /[country]/custom page for that country', () => {
    cy.get('[data-cy=countries-list]').invoke('show');
    cy.get('[data-cy=countries-list] li a')
      .contains('Mexico')
      .click();

    cy.url().should('include', '/mx/custom');
    cy.get('[data-cy=country-results-for-message]').should(
      'have.text',
      'Results for MX',
    );
    cy.get('[data-cy=cities-result-table]').should('exist');
    cy.get('[data-cy=countries-list]').invoke('hide');
  });

  it('navigates to /cities', () => {
    cy.get('[data-cy=nav-bar-link]')
      .contains('cities')
      .click();
    cy.url().should('include', '/cities');
  });

  it('going to another page and then clicking on the home nav link navigates to home', () => {
    cy.get('[data-cy=nav-bar-link]')
      .contains('cities')
      .click();

    cy.get('[data-cy=nav-bar-link]')
      .contains('home')
      .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
