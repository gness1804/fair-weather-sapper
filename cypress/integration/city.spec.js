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
      cy.get('[data-cy=nav-bar-link]')
        .contains('cities')
        .should('have.class', 'selected');
    });

    it('should have the proper title', () => {
      cy.get('[data-cy=city-page-header]').should(
        'have.text',
        'Austin Weather',
      );
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
      cy.get('[data-cy=current-temp]').contains(temp);
    });

    it('should display the current weather conditions.', () => {
      const conditions = data.data.currently.summary;
      cy.get('[data-cy=current-conditions-message]').contains(
        `The weather is ${conditions}`,
      );
    });

    it('should display the high temp', () => {
      const temp = Math.round(
        parseFloat(data.data.daily.data[0].temperatureHigh),
      );
      cy.get('[data-cy=high-temp]').contains(temp);
    });

    it('should display the low temp', () => {
      const temp = Math.round(
        parseFloat(data.data.daily.data[0].temperatureLow),
      );
      cy.get('[data-cy=low-temp]').contains(temp);
    });

    it('should display the correct sunrise time', () => {
      const { timezone } = data.data;
      const time = makeDateHumanReadable(
        data.data.daily.data[0].sunriseTime,
        timezone,
      );
      cy.get('[data-cy=sunrise-time]').contains(time);
    });

    it('should display the correct sunset time', () => {
      const { timezone } = data.data;
      const time = makeDateHumanReadable(
        data.data.daily.data[0].sunsetTime,
        timezone,
      );
      cy.get('[data-cy=sunset-time]').contains(time);
    });

    describe('case of zero degrees', () => {
      let _data;
      before(() => {
        cy.fixture('zeroDegrees').then(res => (_data = res)); // data for Harare, which is the zero degrees case.
      });

      beforeEach(() => {
        cy.visit('/cities/harare');
      });

      // all three temps for Harare mock are 0 degrees F
      it('shows correct display for current temp', () => {
        const temp = Math.round(parseFloat(_data.data.currently.temperature));
        cy.get('[data-cy=current-temp]').contains(temp);
      });

      it('should display the high temp', () => {
        const temp = Math.round(
          parseFloat(_data.data.daily.data[0].temperatureHigh),
        );
        cy.get('[data-cy=high-temp]').contains(temp);
      });

      it('should display the low temp', () => {
        const temp = Math.round(
          parseFloat(_data.data.daily.data[0].temperatureLow),
        );
        cy.get('[data-cy=low-temp]').contains(temp);
      });
    });
  });

  describe('Fahrenheit-Celsius conversion dropdown', () => {
    it('switching from F to C changes the UI display from F to C', () => {
      cy.get('[data-cy=temp-type-selector]').select('C');

      cy.get('[data-cy=temp-type-display]').should('contain', 'C');
    });

    it('switching from F to C changes the main temp from F to C', function() {
      if (!isTesting) {
        this.skip();
      }
      cy.get('[data-cy=temp-type-selector]').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.currently.temperature)),
        'C',
      );
      cy.get('[data-cy=current-temp]').contains(temp);
    });

    it('switching from F to C changes the high temp from F to C', function() {
      if (!isTesting) {
        this.skip();
      }
      cy.get('[data-cy=temp-type-selector]').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.daily.data[0].temperatureHigh)),
        'C',
      );
      cy.get('[data-cy=high-temp]').contains(temp);
    });

    it('switching from F to C changes the low temp from F to C', function() {
      if (!isTesting) {
        this.skip();
      }
      cy.get('[data-cy=temp-type-selector]').select('C');

      const temp = changeTempType(
        Math.round(parseFloat(data.data.daily.data[0].temperatureLow)),
        'C',
      );
      cy.get('[data-cy=low-temp]').contains(temp);
    });
  });
});
