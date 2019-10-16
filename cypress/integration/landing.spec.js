describe('App landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('selected css styles for nav bar link should show up on this page', () => {
    cy.get('.nav-bar-link')
      .contains('home')
      .should('have.class', 'selected');
  });

  it('has the correct <h1>', () => {
    cy.get('#app')
      .find('h1')
      .then(elem => expect(elem).to.contain('Fair Weather'));
  });

  it('list of countries should show up properly', () => {
    cy.get('.countries-list')
      .should('be.hidden')
      .invoke('show');
    cy.get('.countries-list li').should('have.length', 8);
    cy.get('.countries-list').invoke('hide');
  });

  it('clicking on a country link opens the /[country]/custom page for that country', () => {
    cy.get('.countries-list').invoke('show');
    cy.get('.countries-list li a')
      .contains('Mexico')
      .click();

    cy.url().should('include', '/mx/custom');
    cy.get('.country-results-for-message').should(
      'have.text',
      'Results for MX',
    );
    cy.get('.cities-result-table').should('exist');
    cy.get('.countries-list').invoke('hide');
  });

  it('navigates to /cities', () => {
    cy.get('.nav-bar-link')
      .contains('cities')
      .click();
    cy.url().should('include', '/cities');
  });

  it('going to another page and then clicking on the home nav link navigates to home', () => {
    cy.get('.nav-bar-link')
      .contains('cities')
      .click();

    cy.get('.nav-bar-link')
      .contains('home')
      .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
