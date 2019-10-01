describe('city page for Austin', () => {
  beforeEach(() => {
    cy.visit('/cities/austin');
  });

  it('should have the proper title', () => {
    cy.contains('h2', 'Austin Weather');
  });
});
