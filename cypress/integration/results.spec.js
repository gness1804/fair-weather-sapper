describe('results page', () => {
  beforeEach(() => {
    cy.visit('/results?lat=42.35843&lng=-71.05977');
  });

  it('should show the correct header', () => {
    cy.get('.results-header').then(elem =>
      cy.get(elem).should('have.text', 'Your Results'),
    );
  });

  it('the weather icon should exist', () => {
    cy.get('.weather-icon').should('exist');
  });
});
