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

  it('navigates to /cities', () => {
    cy.get('.nav-bar-link')
      .contains('cities')
      .click();
    cy.url().should('include', '/cities');
  });

  it('list of countries should show up properly', () => {
    cy.get('.countries-list').invoke('show');
    cy.get('.countries-list li').should('have.length', 8);
  });
});
