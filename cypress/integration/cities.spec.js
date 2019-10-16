describe('Cities landing page.', () => {
  const isTesting = Cypress.env('TESTING') === 'true';

  let data;
  const cityDataFile = './src/routes/cities/_cityStaticData/austin.json';

  before(() => {
    cy.readFile(cityDataFile).then(contents => {
      data = contents;
    });
  });

  beforeEach(() => {
    cy.seedCitiesPage();
  });

  it('selected css styles for nav bar link should show up on this page', () => {
    cy.get('.nav-bar-link')
      .contains('cities')
      .should('have.class', 'selected');
  });

  it('contains a list of city links', () => {
    cy.get('.cities-links a').should('have.length', 4);
    cy.get('.cities-links a')
      .first()
      .should('have.text', 'Austin');
    cy.get('.cities-links a')
      .eq(1)
      .should('have.text', 'Chicago');
    cy.get('.cities-links a')
      .eq(2)
      .should('have.text', 'London');
    cy.get('.cities-links a')
      .eq(3)
      .should('have.text', 'Paris');
  });

  it('clicking on the Austin link should go to the Austin page.', () => {
    cy.get('.cities-links a')
      .contains('Austin')
      .click();

    cy.url().should('include', '/austin');
  });

  it('clicking on the Paris link should go to the Paris page.', () => {
    cy.get('.cities-links a')
      .contains('Paris')
      .click();

    cy.url().should('include', '/paris');
  });

  it('clicking on the Get My Weather button shows current weather conditions', function() {
    if (!isTesting) {
      this.skip();
    } else {
      const temp = Math.round(parseFloat(data.data.currently.temperature));
      const conditions = data.data.currently.summary;
      cy.get('.get-my-weather-button').click();
      cy.get('.current-temp-title').then(elem =>
        expect(elem).to.have.text('Your current temperature is:'),
      );
      cy.get('.current-temp-value-display').then(elem =>
        cy.get(elem).contains(temp),
      );
      cy.get('.conditions-display').then(elem =>
        cy.get(elem).contains(conditions),
      );
    }
  });

  it('button should be disabled once results come in', () => {
    cy.get('.get-my-weather-button').click();
    cy.get('.get-my-weather-button').then(elem =>
      cy.get(elem).should('have.attr', 'disabled'),
    );
  });

  it('cities datalist should appear for cities input', () => {
    cy.get('#cities-list option')
      .should('have.length', 11)
      .first()
      .should('have.text', 'Amsterdam')
      .next()
      .should('have.text', 'Blacksburg')
      .next()
      .should('have.text', 'Boston');
  });

  it('entering in a valid city in the input field and then blurring input should populate the cities candidates field', () => {
    cy.seedCity('Detroit');

    cy.get('.candidate-cities-select').should('exist');
    cy.get('.candidate-option')
      .first()
      .should('contain', 'Detroit - US');
  });

  it('entering a city not on the cities JSON list and then blurring input show an error message to the user', () => {
    cy.seedCity('Ann Arbor');

    // error message should appear
    cy.get('.candidate-cities-select').should('not.exist');
    cy.get('.candidate-cities-error-message').should('exist');

    // the cities entry input field should have error class
    cy.get('#city-input').should('have.class', 'error-box');

    // the Add button should be disabled with invalid input
    cy.get('.add-city-button').should('be.disabled');
  });

  it('entering in a city in the input field and then clicking on the Add button should add it to the list on the page', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();

    cy.get('.cities-links a')
      .contains('Detroit')
      .should('exist');

    cy.get('.cities-links a').should('have.length', 5);
  });

  it('entering in a city etc. and then going to the link should go to the new city page for that city', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();

    cy.get('.cities-links a')
      .contains('Detroit')
      .click();

    cy.url().should('include', '/detroit');
    cy.get('.city-page-header').should('have.text', 'Detroit Weather');
  });

  it('only custom-entered cities should have the red X for deleting a city', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();

    cy.get('.delete-city-button')
      .should('have.length', 1)
      .and('have.attr', 'title')
      .and('contains', 'Delete Detroit');
  });

  it('deleting a city should remove it from the page', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    // test if the city was actually removed
    cy.get('.cities-links a')
      .contains('Detroit')
      .should('not.exist');

    cy.get('.cities-links a').should('have.length', 4);
  });

  it('user should be able to add a new city after adding and deleting one', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    cy.seedCity('Boston');
    cy.get('.add-city-button').click();

    cy.get('.cities-links a')
      .contains('Boston')
      .should('exist');

    cy.get('.cities-links a').should('have.length', 5);
  });

  it('adding and deleting a city and then refreshing the page should keep the deleted city deleted; should not reappear', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    cy.reload();

    cy.get('.cities-links a')
      .contains('Detroit')
      .should('not.exist');

    cy.get('.cities-links a').should('have.length', 4);
  });

  it('Reset to Defaults button should be hidden without any user-added cities and then enabled with user-added cities', () => {
    cy.get('.reset-all-button').should('be.disabled');

    cy.seedCity('Detroit');
    cy.get('.add-city-button').click();

    cy.get('.reset-all-button').should('not.be.disabled');
  });

  it('click on the Reset to Defaults button removes all user-added cities', () => {
    cy.seedCity('Detroit');
    cy.get('.add-city-button').click();

    cy.seedCity('Munich');
    cy.get('.add-city-button').click();

    cy.get('.cities-links a').should('have.length', 6);

    cy.get('.reset-all-button').click();

    cy.get('.cities-links a').should('have.length', 4);
  });
});
