describe('Cities landing page.', () => {
  beforeEach(() => {
    cy.visit('/cities');
  });

  it('contains a list of city links', () => {
    cy.get('.cities-links a').each((elem, index, list) => {
      expect(list.length).to.equal(4);
      if (index === 0) {
        expect(elem).to.have.text('Austin');
      } else if (index === 1) {
        expect(elem).to.have.text('Chicago');
      } else if (index === 2) {
        expect(elem).to.have.text('Paris');
      } else if (index === 3) {
        expect(elem).to.have.text('London');
      }
    });
  });
});
