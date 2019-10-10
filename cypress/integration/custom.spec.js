describe('custom page', () => {
  it('the /[country]/custom page works', () => {
    cy.visit('/us/custom');
    cy.url().should('include', '/us/custom');
    cy.get('.custom-page-header').then(elem => {
      cy.get(elem).should('have.text', 'Results for US');
    });
  });

  it('the /[country]/[city]/custom page works', () => {
    cy.visit('/us/boston/custom');
    cy.url().should('include', '/us/boston/custom');
    // TODO: add more tests for the copy etc. on the city page
  });
});
