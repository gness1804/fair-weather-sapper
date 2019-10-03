describe('Cities landing page.', () => {
  let data;
  const cityDataFile = './src/routes/cities/_cityStaticData/austin.json';

  before(() => {
    cy.readFile(cityDataFile).then(contents => {
      data = contents;
    });
  });

  beforeEach(() => {
    cy.visit('/cities');
    sessionStorage.clear();
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

  it('clicking on the Austin link should go to the Austin page.', () => {
    cy.get('.cities-links a').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).click();
      }
    });
    cy.url().should('include', '/austin');
  });

  it('clicking on the Paris link should go to the Paris page.', () => {
    cy.get('.cities-links a').each((elem, index) => {
      if (index === 2) {
        cy.get(elem).click();
      }
    });
    cy.url().should('include', '/paris');
  });

  it('clicking on the Get My Weather button shows current weather conditions', () => {
    const temp = Math.round(parseFloat(data.data.currently.temperature));
    const conditions = data.data.currently.summary;
    cy.get('.get-my-weather-button').click();
    cy.get('.my-weather-results p').each((elem, index) => {
      if (index === 0) {
        expect(elem).to.have.text('Your current temperature is:');
      } else if (index === 1) {
        cy.get(elem).contains(temp);
      } else if (index === 2) {
        cy.get(elem).contains(conditions);
      }
    });
  });

  it('button should be disabled once results come in', () => {
    cy.get('.get-my-weather-button').click();
    cy.get('.get-my-weather-button').should('have.attr', 'disabled');
  });
});
