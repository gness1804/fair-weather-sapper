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
    const currentTemperature = Math.round(
      parseFloat(data.data.currently.temperature),
    );
    cy.get('.current-temp').contains(currentTemperature);
  });
});
