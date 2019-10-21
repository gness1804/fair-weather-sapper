const changeTempType = require('../../src/helpers/changeTempType');
const getTempColor = require('../../src/data/getTempColor');

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
    cy.get('[data-cy=nav-bar-link]')
      .contains('cities')
      .should('have.class', 'selected');
  });

  it('contains a list of city links', () => {
    cy.get('[data-cy=cities-links] a').should('have.length', 4);
    cy.get('[data-cy=cities-links] a')
      .first()
      .should('have.text', 'Austin');
    cy.get('[data-cy=cities-links] a')
      .eq(1)
      .should('have.text', 'Chicago');
    cy.get('[data-cy=cities-links] a')
      .eq(2)
      .should('have.text', 'London');
    cy.get('[data-cy=cities-links] a')
      .eq(3)
      .should('have.text', 'Paris');
  });

  it('clicking on the Austin link should go to the Austin page.', () => {
    cy.get('[data-cy=cities-links] a')
      .contains('Austin')
      .click();

    cy.url().should('include', '/austin');
  });

  it('clicking on the Paris link should go to the Paris page.', () => {
    cy.get('[data-cy=cities-links] a')
      .contains('Paris')
      .click();

    cy.url().should('include', '/paris');
  });

  it('clicking on the Get My Weather button shows current weather conditions', function() {
    if (!isTesting) {
      this.skip();
    }
    const temp = Math.round(parseFloat(data.data.currently.temperature));
    const conditions = data.data.currently.summary;
    cy.get('[data-cy=get-my-weather-button]').click();
    cy.get('[data-cy=current-temp-title]').then(elem =>
      expect(elem).to.have.text('Your current temperature is:'),
    );
    cy.get('[data-cy=current-temp-value-display]').then(elem =>
      cy.get(elem).contains(temp),
    );
    cy.get('[data-cy=conditions-display]').then(elem =>
      cy.get(elem).contains(conditions),
    );
  });

  it('the current temperature should display in the correct color when the user clicks on the Get My Weather button', function() {
    if (!isTesting) {
      this.skip();
    }
    const temp = Math.round(parseFloat(data.data.currently.temperature));
    const color = getTempColor(temp);

    cy.get('[data-cy=get-my-weather-button]').click();

    cy.get('[data-cy=current-temp-value-display]').should(
      'have.class',
      `t-${color}`,
    );
  });

  it('button should be disabled once results come in', () => {
    cy.get('[data-cy=get-my-weather-button]').click();
    cy.get('[data-cy=get-my-weather-button]').then(elem =>
      cy.get(elem).should('have.attr', 'disabled'),
    );
  });

  it('cities datalist should appear for cities input', () => {
    cy.get('[data-cy=cities-list] option')
      .should('have.length', 12)
      .first()
      .should('have.text', 'Amsterdam')
      .next()
      .should('have.text', 'Blacksburg')
      .next()
      .should('have.text', 'Boston');
  });

  it('entering in a valid city in the input field and then blurring input should populate the cities candidates field', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=candidate-cities-select]').should('exist');
    cy.get('[data-cy=candidate-option]')
      .first()
      .should('contain', 'Detroit - US');
  });

  it('entering a city not on the cities JSON list and then blurring input show an error message to the user', () => {
    cy.seedCity('Ann Arbor');

    // error message should appear
    cy.get('[data-cy=candidate-cities-select]').should('not.exist');
    cy.get('[data-cy=candidate-cities-error-message]').should('exist');

    // the cities entry input field should have error class
    cy.get('[data-cy=city-input]').should('have.class', 'error-box');

    // the Add button should be disabled with invalid input
    cy.get('[data-cy=add-city-button]').should('be.disabled');
  });

  it('entering in a city in the input field and then clicking on the Add button should add it to the list on the page', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=cities-links] a')
      .contains('Detroit')
      .should('exist');

    cy.get('[data-cy=cities-links] a').should('have.length', 5);
  });

  it('new city should persist after reload and allow for addition of another city', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();

    cy.reload();

    cy.get('[data-cy=cities-links] a')
      .contains('Detroit')
      .should('exist');

    cy.get('[data-cy=cities-links] a').should('have.length', 5);

    cy.seedCity('Blacksburg');
    cy.get('[data-cy=add-city-button]').click();
    cy.get('[data-cy=cities-links] a').should('have.length', 6);
  });

  it('entering in a city etc. and then going to the link should go to the new city page for that city', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=cities-links] a')
      .contains('Detroit')
      .click();

    cy.url().should('include', '/detroit');
    cy.get('[data-cy=city-page-header]').should('have.text', 'Detroit Weather');
  });

  it('only custom-entered cities should have the red X for deleting a city', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=delete-city-button]')
      .should('have.length', 1)
      .and('have.attr', 'title')
      .and('contains', 'Delete Detroit');
  });

  it('deleting a city should remove it from the page', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();
    cy.get('[data-cy=delete-city-button]').click();

    // test if the city was actually removed
    cy.get('[data-cy=cities-links] a')
      .contains('Detroit')
      .should('not.exist');

    cy.get('[data-cy=cities-links] a').should('have.length', 4);
  });

  it('user should be able to add a new city after adding and deleting one', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();
    cy.get('[data-cy=delete-city-button]').click();

    cy.seedCity('Boston');
    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=cities-links] a')
      .contains('Boston')
      .should('exist');

    cy.get('[data-cy=cities-links] a').should('have.length', 5);
  });

  it('adding and deleting a city and then refreshing the page should keep the deleted city deleted; should not reappear', () => {
    cy.seedCity('Detroit');

    cy.get('[data-cy=add-city-button]').click();
    cy.get('[data-cy=delete-city-button]').click();

    cy.reload();

    cy.get('[data-cy=cities-links] a')
      .contains('Detroit')
      .should('not.exist');

    cy.get('[data-cy=cities-links] a').should('have.length', 4);
  });

  it('Reset to Defaults button should be hidden without any user-added cities and then enabled with user-added cities', () => {
    cy.get('[data-cy=reset-all-button]').should('be.disabled');

    cy.seedCity('Detroit');
    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=reset-all-button]').should('not.be.disabled');
  });

  it('click on the Reset to Defaults button removes all user-added cities', () => {
    cy.seedCity('Detroit');
    cy.get('[data-cy=add-city-button]').click();

    cy.seedCity('Munich');
    cy.get('[data-cy=add-city-button]').click();

    cy.get('[data-cy=cities-links] a').should('have.length', 6);

    cy.get('[data-cy=reset-all-button]').click();

    cy.get('[data-cy=cities-links] a').should('have.length', 4);
  });

  describe('Fahrenheit-Celsius toggle', () => {
    it('changing from F to C and then clicking on the Get Weather Button changes the display temp type from F to C', () => {
      cy.get('[data-cy=temp-type-selector]').select('C');
      cy.get('[data-cy=get-my-weather-button]').click();

      cy.get('[data-cy=current-temp-value-display]').should('contain', 'C');
    });

    it('changing from F to C and then clicking on the Get Weather Button changes the actual temp from F to C', function() {
      if (!isTesting) {
        this.skip();
      }

      cy.get('[data-cy=temp-type-selector]').select('C');
      cy.get('[data-cy=get-my-weather-button]').click();

      const temp = changeTempType(
        Math.round(parseFloat(data.data.currently.temperature)),
        'C',
      );

      cy.get('[data-cy=current-temp-value-display]').should('contain', temp);
    });

    it('changing from F to C and then clicking on the Get Weather Button and then changing back to F should display temp in F', function() {
      if (!isTesting) {
        this.skip();
      }

      cy.get('[data-cy=temp-type-selector]').select('C');
      cy.get('[data-cy=get-my-weather-button]').click();

      cy.get('[data-cy=temp-type-selector]').select('F');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.currently.temperature)),
        'F',
      );

      cy.get('[data-cy=current-temp-value-display]').should('contain', temp);
    });
  });
});
