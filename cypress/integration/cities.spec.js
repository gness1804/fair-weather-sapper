describe('Cities landing page.', () => {
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
    cy.get('nav a')
      .contains('cities')
      .should('have.class', 'font-bold');
  });

  it('contains a list of city links', () => {
    cy.get('.cities-links a').each((elem, index, list) => {
      expect(list.length).to.equal(4);
      if (index === 0) {
        expect(elem).to.have.text('Austin');
      } else if (index === 1) {
        expect(elem).to.have.text('Chicago');
      } else if (index === 2) {
        expect(elem).to.have.text('London');
      } else if (index === 3) {
        expect(elem).to.have.text('Paris');
      }
    });
  });

  it('clicking on the Austin link should go to the Austin page.', () => {
    cy.get('.cities-links a').each(elem => {
      cy.get(elem)
        .invoke('text')
        .then(contents => {
          if (contents === 'Austin') {
            cy.get(elem).click();
          }
        });
    });
    cy.url().should('include', '/austin');
  });

  it('clicking on the Paris link should go to the Paris page.', () => {
    cy.get('.cities-links a').each(elem => {
      cy.get(elem)
        .invoke('text')
        .then(contents => {
          if (contents === 'Paris') {
            cy.get(elem).click();
          }
        });
    });
    cy.url().should('include', '/paris');
  });

  it('clicking on the Get My Weather button shows current weather conditions', () => {
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
  });

  it('button should be disabled once results come in', () => {
    cy.get('.get-my-weather-button').click();
    cy.get('.get-my-weather-button').then(elem =>
      cy.get(elem).should('have.attr', 'disabled'),
    );
  });

  it('entering in a city in the input field and then blurring input should populate the cities candidates field', () => {
    cy.get('#city-input')
      .type('Detroit')
      .blur();
    cy.get('.candidate-option').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).contains('Detroit - US');
      }
    });
  });

  it('entering in a city in the input field and then clicking on the Add button should add it to the list on the page', () => {
    cy.get('#city-input')
      .type('Detroit')
      .blur();

    cy.get('.add-city-button').click();
    cy.get('.cities-links a').each((elem, index, list) => {
      expect(list.length).to.equal(5);
      if (index === 2) {
        expect(elem).to.have.text('Detroit');
      }
    });
  });

  it('entering in a city etc. and then going to the link should go to the new city page for that city', () => {
    cy.get('#city-input')
      .type('Detroit')
      .blur();

    cy.get('.add-city-button').click();

    cy.get('.cities-links a').each((elem, index) => {
      if (index === 2) {
        cy.get(elem).click();
      }
    });
    cy.url().should('include', '/detroit');
  });
});
