describe('results page', () => {
  it('should show the correct header', () => {
    cy.visit('/results?lat=42.35843&lng=-71.05977');
    cy.get('.results-header').then(elem =>
      cy.get(elem).should('have.text', 'Your Results'),
    );
  });
});
