describe('Sapper template app', () => {
  beforeEach(() => {
    cy.visit('/');
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
