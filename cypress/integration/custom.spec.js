describe('custom country and state search pages', () => {
  describe('country custom page', () => {
    it('The "Choose a Country" header is highlighted on this page', () => {
      cy.visit('/mx/custom');
      cy.get('[data-cy=choose-a-country-label]').should(
        'have.class',
        'selected-lite',
      );
    });

    it('the country-specific link in the dropdown in the nav menu should be highlighted on this page', () => {
      cy.visit('/mx/custom');
      cy.get('[data-cy=countries-list]').invoke('show');
      cy.get('[data-cy=country-nav-link]')
        .contains('Mexico')
        .should('have.class', 'selected-lite');

      cy.get('[data-cy=country-nav-link]')
        .contains('France')
        .should('not.have.class', 'selected-lite');
      cy.get('[data-cy=countries-list]').invoke('hide');
    });

    it('Should show the "Results For..." heading corresponding to the correct country', () => {
      cy.visit('/fr/custom');
      cy.get('[data-cy=country-results-for-message]').should(
        'have.text',
        'Results for FR',
      );
    });

    it('Should show an error message for an invalid country code', () => {
      cy.visit('/qq/custom');
      cy.get('[data-cy=country-error-message]')
        .should('exist')
        .and('have.text', 'Error: invalid country name. Please try again.');
    });

    it('should show the correct country data for the US', () => {
      cy.visit('/us/custom');
      cy.get('[data-cy=cities-result-table]').should('exist');

      cy.get('[data-cy=cities-result-table-name]').should('have.length', 7);
      cy.get('[data-cy=cities-result-table-name]')
        .first()
        .should('have.text', 'Austin');
      cy.get('[data-cy=cities-result-table-name]')
        .eq(2)
        .should('have.text', 'Boston');

      cy.get('[data-cy=cities-result-table-state]').should('have.length', 7);
      cy.get('[data-cy=cities-result-table-state]')
        .first()
        .should('have.text', 'TX');
      cy.get('[data-cy=cities-result-table-state]')
        .eq(2)
        .should('have.text', 'MA');
    });

    it('should show correct country data for France (FR)', () => {
      cy.visit('/fr/custom');
      cy.get('[data-cy=cities-result-table]').should('exist');

      cy.get('[data-cy=cities-result-table-name]').should('have.length', 2);
      cy.get('[data-cy=cities-result-table-name]')
        .first()
        .should('have.text', 'Paris');
      cy.get('[data-cy=cities-result-table-name]')
        .eq(1)
        .should('have.text', 'Tours');

      cy.get('[data-cy=cities-result-table-state]').should('not.exist');
    });

    it('clicking on the city link in the table will go to the corresponding city page', () => {
      cy.visit('/us/custom');

      cy.get('[data-cy=cities-result-table-name-link]')
        .first()
        .click();
      cy.url().should('include', '/cities/austin');
      cy.get('[data-cy=city-page-header]')
        .should('exist')
        .and('have.text', 'Austin Weather');
    });

    it('clicking on the city link in the table will go to the corresponding city page (for extended data city)', () => {
      cy.visit('/us/custom');

      cy.get('[data-cy=cities-result-table-name-link]')
        .contains('Detroit')
        .click();

      cy.url().should('include', '/cities/detroit');
      cy.get('[data-cy=city-page-header]')
        .should('exist')
        .and('have.text', 'Detroit Weather');
    });

    it('clicking on a state link will go to the page for that state', () => {
      cy.visit('/us/custom');

      cy.get('[data-cy=cities-result-table-state-link]')
        .contains('TX')
        .click();

      cy.url().should('include', '/us/tx/custom');
      cy.get('[data-cy=state-results-for-message]')
        .should('exist')
        .and('have.text', 'Results for TX, US');
    });
  });

  describe('state custom page', () => {
    it('the country-specific link for US in the dropdown in the nav menu should be highlighted on this page', () => {
      cy.visit('/us/tx/custom');
      cy.get('[data-cy=countries-list]').invoke('show');
      cy.get('[data-cy=country-nav-link]')
        .contains('United States')
        .should('have.class', 'selected-lite');

      cy.get('[data-cy=country-nav-link]')
        .contains('France')
        .should('not.have.class', 'selected-lite');
      cy.get('[data-cy=countries-list]').invoke('hide');
    });

    it('Should show the "Results For..." heading corresponding to the correct US state', () => {
      cy.visit('/us/tx/custom');
      cy.get('[data-cy=state-results-for-message]')
        .should('exist')
        .and('have.text', 'Results for TX, US');
    });

    it('Should show an error message for an invalid state', () => {
      cy.visit('/us/foo/custom');
      cy.get('[data-cy=state-error-message]')
        .should('exist')
        .and('have.text', 'Error: invalid state name. Please try again.');
    });

    it('should show the correct state data for TX', () => {
      cy.visit('/us/tx/custom');
      cy.get('[data-cy=cities-result-table]').should('exist');

      cy.get('[data-cy=cities-result-table-name]').should('have.length', 2);
      cy.get('[data-cy=cities-result-table-name]')
        .first()
        .should('have.text', 'Austin');

      cy.get('[data-cy=cities-result-table-name]')
        .eq(1)
        .should('have.text', 'College Station');

      cy.get('[data-cy=cities-result-table-state]').should('have.length', 2);
      cy.get('[data-cy=cities-result-table-state]').each(elem =>
        cy.get(elem).should('have.text', 'TX'),
      );
    });

    it('clicking on the city link in the table will go to the corresponding city page', () => {
      cy.visit('/us/il/custom');

      cy.get('[data-cy=cities-result-table-name-link]')
        .contains('Chicago')
        .click();

      cy.url().should('include', '/cities/chicago');
      cy.get('[data-cy=city-page-header]')
        .should('exist')
        .and('have.text', 'Chicago Weather');
    });
  });
});
