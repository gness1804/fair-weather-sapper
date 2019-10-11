describe('custom page', () => {
  describe('without city', () => {
    beforeEach(() => {
      cy.visitCustom('us');
    });

    it('the /[country]/custom page works', () => {
      cy.url().should('include', '/us/custom');
      cy.get('.custom-page-header').then(elem => {
        cy.get(elem).should('have.text', 'Results for US');
      });
    });

    it('selecting a city from the dropdown list show the correct city', () => {
      cy.get('#city-selector').type('Columbus');
      cy.get('.selected-city-display').then(elem =>
        cy.get(elem).should('have.text', 'You selected: Columbus'),
      );
    });

    it('selecting a city and pressing OK navigates to the new city page', () => {
      cy.get('#city-selector').type('Columbus');
      cy.get('.select-city-button').click();
      cy.url().should('include', '/us/columbus/custom');
      cy.get('.city-selector-select').should('exist');
    });
  });

  describe('with a city', () => {
    beforeEach(() => {
      cy.visitCustom('us', 'boston');
    });

    it('the /[country]/[city]/custom page works', () => {
      cy.url().should('include', '/us/boston/custom');
      cy.get('.custom-page-header').then(elem => {
        cy.get(elem).should('have.text', 'Results for boston, US');
      });
    });

    it('selecting a city on the /[country]/[city]/custom page and clicking OK lands you on the results page for that city', () => {
      cy.get('.city-selector-select').select('?lat=42.35843&lng=-71.05977');
      cy.get('.go-to-results-button').click();
      cy.url().should('include', '/results?lat=42.35843&lng=-71.05977');
    });
  });
});
