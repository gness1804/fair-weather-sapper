describe('custom country and city search', () => {
  it('Should show the "Results For..." heading corresponding to the correct country', () => {
    cy.visit('/fr/custom');
    cy.get('.country-results-for-message').should(
      'have.text',
      'Results for FR',
    );
  });

  it('Should show an error message for an invalid country code', () => {
    cy.visit('/qq/custom');
    cy.get('.country-error-message')
      .should('exist')
      .and('have.text', 'Error: invalid country code. Please try again.');
  });

  it('should show the correct country data for the US', () => {
    cy.visit('/us/custom');
    cy.get('.cities-result-table').should('exist');

    cy.get('.cities-result-table-name').should('have.length', 6);
    cy.get('.cities-result-table-name')
      .first()
      .should('have.text', 'Austin');
    cy.get('.cities-result-table-name')
      .eq(2)
      .should('have.text', 'Boston');

    cy.get('.cities-result-table-state').should('have.length', 6);
    cy.get('.cities-result-table-state')
      .first()
      .should('have.text', 'TX');
    cy.get('.cities-result-table-state')
      .eq(2)
      .should('have.text', 'MA');
  });

  it('should show correct country data for France (FR)', () => {
    cy.visit('/fr/custom');
    cy.get('.cities-result-table').should('exist');

    cy.get('.cities-result-table-name').should('have.length', 2);
    cy.get('.cities-result-table-name')
      .first()
      .should('have.text', 'Paris');
    cy.get('.cities-result-table-name')
      .eq(1)
      .should('have.text', 'Tours');

    cy.get('.cities-result-table-state').should('not.exist');
  });
});
