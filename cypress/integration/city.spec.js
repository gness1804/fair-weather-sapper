const makeDateHumanReadable = require('../../src/helpers/makeDateHumanReadable');

describe('city page for Austin', () => {
  let data;
  const cityDataFile = './src/routes/cities/_cityStaticData/austin.json';

  before(() => {
    cy.readFile(cityDataFile).then(contents => {
      data = contents;
    });
  });

  beforeEach(() => {
    cy.visit('/cities/austin');
  });

  it('should have the proper title', () => {
    cy.contains('h2', 'Austin Weather');
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
    const temp = Math.round(parseFloat(data.data.daily.data[0].temperatureLow));
    cy.get('.low-temp').contains(temp);
  });

  it('should display the correct sunrise time', () => {
    const time = makeDateHumanReadable(data.data.daily.data[0].sunriseTime);
    cy.get('.sunrise-time').contains(time);
  });

  it('should display the correct sunset time', () => {
    const time = makeDateHumanReadable(data.data.daily.data[0].sunsetTime);
    cy.get('.sunset-time').contains(time);
  });
});
