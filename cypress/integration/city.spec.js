const makeDateHumanReadable = require('../../src/helpers/makeDateHumanReadable');
const changeTempType = require('../../src/helpers/changeTempType');

describe('city page for Austin', () => {
  let data;
  const isTesting = Cypress.env('TESTING') === 'true';

  const cityDataFile = './src/routes/cities/_cityStaticData/austin.json';

  before(() => {
    cy.readFile(cityDataFile).then(contents => {
      data = contents;
    });
  });

  beforeEach(() => {
    cy.visit('/cities/austin');
  });

  describe('css validation', () => {
    it('selected css styles for nav bar link should show up on this page', () => {
      cy.get('.nav-bar-link')
        .contains('cities')
        .should('have.class', 'selected');
    });

    it('should have the proper title', () => {
      cy.contains('h2', 'Austin Weather');
    });
  });

  describe('data validation', function() {
    before(function() {
      if (!isTesting) {
        this.skip();
      }
    });

    it('shows the correct current temperature', () => {
      const temp = Math.round(parseFloat(data.data.currently.temperature));
      cy.get('.current-temp').contains(temp);
    });

    it('should display the current weather conditions.', () => {
      const conditions = data.data.currently.summary;
      cy.get('.current-conditions-message').contains(
        `The weather is ${conditions}`,
      );
    });

    it('should display the high temp', () => {
      const temp = Math.round(
        parseFloat(data.data.daily.data[0].temperatureHigh),
      );
      cy.get('.high-temp').contains(temp);
    });

    it('should display the low temp', () => {
      const temp = Math.round(
        parseFloat(data.data.daily.data[0].temperatureLow),
      );
      cy.get('.low-temp').contains(temp);
    });

    it('should display the correct sunrise time', () => {
      const { timezone } = data.data;
      const time = makeDateHumanReadable(
        data.data.daily.data[0].sunriseTime,
        timezone,
      );
      cy.get('.sunrise-time').contains(time);
    });

    it('should display the correct sunset time', () => {
      const { timezone } = data.data;
      const time = makeDateHumanReadable(
        data.data.daily.data[0].sunsetTime,
        timezone,
      );
      cy.get('.sunset-time').contains(time);
    });
  });

  describe('Fahrenheit-Celsius conversion dropdown', () => {
    it('switching from F to C changes the UI display from F to C', () => {
      cy.get('.temp-type-selector').select('C');

      cy.get('.temp-type-display').should('contain', 'C');
    });

    it('switching from F to C changes the main temp from F to C', function() {
      if (!isTesting) {
        this.skip();
      }
      cy.get('.temp-type-selector').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.currently.temperature)),
        'C',
      );
      cy.get('.current-temp').contains(temp);
    });

    it('switching from F to C changes the high temp from F to C', () => {
      if (!isTesting) {
        this.skip();
      }
      cy.get('.temp-type-selector').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.daily.data[0].temperatureHigh)),
        'C',
      );
      cy.get('.high-temp').contains(temp);
    });

    it('switching from F to C changes the low temp from F to C', () => {
      if (!isTesting) {
        this.skip();
      }
      cy.get('.temp-type-selector').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.daily.data[0].temperatureLow)),
        'C',
      );
      cy.get('.low-temp').contains(temp);
    });
  });
});
