describe('custom country and city search', () => {
  it('Should show the correct URL and the "Results For..." heading corresponding to the correct country', () => {
    cy.visit('/us/custom');
    cy.url().should('include', '/us/custom');
    cy.get('.country-results-for-message').should(
      'have.text',
      'Results for US',
    );
  });
});
