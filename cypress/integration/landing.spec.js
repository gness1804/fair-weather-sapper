describe('App landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('selected css styles for nav bar link should show up on this page', () => {
    cy.get('nav a')
      .contains('home')
      .should('have.class', 'font-bold');
  });

  it('has the correct <h1>', () => {
    cy.get('#app')
      .find('h1')
      .then(elem => expect(elem).to.contain('Fair Weather'));
  });

  it('navigates to /cities', () => {
    cy.get('nav a')
      .contains('cities')
      .click();
    cy.url().should('include', '/cities');
  });
});
