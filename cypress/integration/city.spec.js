describe('city page for Austin', () => {
  const cityDataFile = './src/routes/cities/_cityStaticData/austin.json';
  beforeEach(() => {
    cy.visit('/cities/austin');
  });

  it('should have the proper title', () => {
    cy.contains('h2', 'Austin Weather');
  });

  it('shows the correct current temperature', () => {
    cy.readFile(cityDataFile).then(contents => {
      const currentTemperature = Math.round(
        parseFloat(contents.data.currently.temperature),
      );
      cy.get('.current-temp').contains(currentTemperature);
    });
  });
});
