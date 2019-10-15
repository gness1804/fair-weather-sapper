describe('custom country and state search pages', () => {
  describe('country custom page', () => {
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
        .and('have.text', 'Error: invalid country name. Please try again.');
    });

    it('should show the correct country data for the US', () => {
      cy.visit('/us/custom');
      cy.get('.cities-result-table').should('exist');

      cy.get('.cities-result-table-name').should('have.length', 7);
      cy.get('.cities-result-table-name')
        .first()
        .should('have.text', 'Austin');
      cy.get('.cities-result-table-name')
        .eq(2)
        .should('have.text', 'Boston');

      cy.get('.cities-result-table-state').should('have.length', 7);
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

    it('clicking on the city link in the table will go to the corresponding city page', () => {
      cy.visit('/us/custom');

      cy.get('.cities-result-table-name-link-wrapper')
        .first()
        .click();
      cy.url().should('include', '/cities/austin');
      cy.get('.city-page-header')
        .should('exist')
        .and('have.text', 'Austin Weather');
    });

    it('clicking on the city link in the table will go to the corresponding city page (for extended data city)', () => {
      cy.visit('/us/custom');

      cy.get('.cities-result-table-name-link-wrapper')
        .eq(6)
        .click();
      cy.url().should('include', '/cities/detroit');
      cy.get('.city-page-header')
        .should('exist')
        .and('have.text', 'Detroit Weather');
    });

    it('clicking on a state link will go to the page for that state', () => {
      cy.visit('/us/custom');

      cy.get('.cities-result-table-state-link-wrapper')
        .first()
        .click();

      cy.url().should('include', '/us/tx/custom');
      cy.get('.state-results-for-message')
        .should('exist')
        .and('have.text', 'Results for TX, US');
    });
  });

  describe('state custom page', () => {
    it('Should show the "Results For..." heading corresponding to the correct US state', () => {
      cy.visit('/us/tx/custom');
      cy.get('.state-results-for-message')
        .should('exist')
        .and('have.text', 'Results for TX, US');
    });

    it('Should show an error message for an invalid state', () => {
      cy.visit('/us/foo/custom');
      cy.get('.state-error-message')
        .should('exist')
        .and('have.text', 'Error: invalid state name. Please try again.');
    });

    it('should show the correct state data for TX', () => {
      cy.visit('/us/tx/custom');
      cy.get('.cities-result-table').should('exist');

      cy.get('.cities-result-table-name').should('have.length', 2);
      cy.get('.cities-result-table-name')
        .first()
        .should('have.text', 'Austin');

      cy.get('.cities-result-table-name')
        .eq(1)
        .should('have.text', 'College Station');

      cy.get('.cities-result-table-state').should('have.length', 2);
      cy.get('.cities-result-table-state')
        .first()
        .should('have.text', 'TX');
    });

    it('clicking on the city link in the table will go to the corresponding city page', () => {
      cy.visit('/us/il/custom');

      cy.get('.cities-result-table-name-link-wrapper')
        .first()
        .click();
      cy.url().should('include', '/cities/chicago');
      cy.get('.city-page-header')
        .should('exist')
        .and('have.text', 'Chicago Weather');
    });
  });
});
