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
    cy.get('nav a')
      .contains('cities')
      .should('have.class', 'font-bold');
  });

  it('contains a list of city links', () => {
    cy.get('.cities-links a')
      .each((elem, index) => {
        if (index === 0) {
          expect(elem).to.have.text('Austin');
        } else if (index === 1) {
          expect(elem).to.have.text('Chicago');
        } else if (index === 2) {
          expect(elem).to.have.text('London');
        } else if (index === 3) {
          expect(elem).to.have.text('Paris');
        }
      })
      .then(list => {
        expect(list.length).to.equal(4);
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

  it('clicking on the Get My Weather button shows current weather conditions', function() {
    if (!isTesting) {
      this.skip();
    } else {
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
    }
  });

  it('button should be disabled once results come in', () => {
    cy.get('.get-my-weather-button').click();
    cy.get('.get-my-weather-button').then(elem =>
      cy.get(elem).should('have.attr', 'disabled'),
    );
  });

  it('cities datalist should appear for cities input', () => {
    cy.get('#cities-list option')
      .should('have.length', 11)
      .first()
      .should('have.text', 'Amsterdam')
      .next()
      .should('have.text', 'Blacksburg')
      .next()
      .should('have.text', 'Boston');
  });

  it('entering in a valid city in the input field and then blurring input should populate the cities candidates field', () => {
    cy.seedCity('Detroit');

    cy.get('.candidate-cities-select').should('exist');
    cy.get('.candidate-option').each((elem, index) => {
      if (index === 0) {
        cy.get(elem).contains('Detroit - US');
      }
    });
  });

  it('entering a city not on the cities JSON list and then blurring input show an error message to the user', () => {
    cy.seedCity('Ann Arbor');

    // error message should appear
    cy.get('.candidate-cities-select').should('not.exist');
    cy.get('.candidate-cities-error-message').should('exist');

    // the cities entry input field should have error class
    cy.get('#city-input').should('have.class', 'error-box');

    // the Add button should be disabled with invalid input
    cy.get('.add-city-button').should('be.disabled');
  });

  it('entering in a city in the input field and then clicking on the Add button should add it to the list on the page', () => {
    let listContainsDetroit = false;

    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();

    // tests that at least one of these links contains 'Detroit'
    cy.get('.cities-links a')
      .each(elem => {
        cy.get(elem)
          .invoke('text')
          .then(contents => {
            if (contents === 'Detroit') {
              listContainsDetroit = true;
            }
          });
      })
      .then(list => {
        expect(list.length).to.equal(5);
        expect(listContainsDetroit).to.equal(true);
      });
  });

  it('entering in a city etc. and then going to the link should go to the new city page for that city', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();

    cy.get('.cities-links a').each(elem => {
      cy.get(elem)
        .invoke('text')
        .then(contents => {
          if (contents === 'Detroit') {
            cy.get(elem).click();
          }
        });
    });
    cy.url().should('include', '/detroit');
  });

  it('only custom-entered cities should have the red X for deleting a city', () => {
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button')
      .should('have.attr', 'title')
      .and('contains', 'Delete Detroit');
  });

  it('deleting a city should remove it from the page', () => {
    let listContainsDetroit = false;
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    // test if the city was actually removed
    cy.get('.cities-links a')
      .each(elem => {
        cy.get(elem)
          .invoke('text')
          .then(contents => {
            if (contents === 'Detroit') {
              listContainsDetroit = true;
            }
          });
      })
      .then(list => {
        expect(list.length).to.equal(4);
        expect(listContainsDetroit).to.equal(false);
      });
  });

  it('user should be able to add a new city after adding and deleting one', () => {
    let listContainsBoston = false;
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    cy.seedCity('Boston');
    cy.get('.add-city-button').click();

    cy.get('.cities-links a')
      .each(elem => {
        cy.get(elem)
          .invoke('text')
          .then(contents => {
            if (contents === 'Boston') {
              listContainsBoston = true;
            }
          });
      })
      .then(list => {
        expect(list.length).to.equal(5);
        expect(listContainsBoston).to.equal(true);
      });
  });

  it('adding and deleting a city and then refreshing the page should keep the deleted city deleted; should not reappear', () => {
    let listContainsDetroit = false;
    cy.seedCity('Detroit');

    cy.get('.add-city-button').click();
    cy.get('.delete-city-button').click();

    cy.reload();

    cy.get('.cities-links a')
      .each(elem => {
        cy.get(elem)
          .invoke('text')
          .then(contents => {
            if (contents === 'Detroit') {
              listContainsDetroit = true;
            }
          });
      })
      .then(list => {
        expect(listContainsDetroit).to.equal(false);
        expect(list.length).to.equal(4);
      });
  });

  it('Reset to Defaults button should be hidden without any user-added cities and then enabled with user-added cities', () => {
    cy.get('.reset-all-button').then(elem => {
      cy.get(elem).should('be.disabled');
    });

    cy.seedCity('Detroit');
    cy.get('.add-city-button').click();

    cy.get('.reset-all-button').then(elem => {
      cy.get(elem).should('not.be.disabled');
    });
  });

  it('click on the Reset to Defaults button removes all user-added cities', () => {
    cy.seedCity('Detroit');
    cy.get('.add-city-button').click();

    cy.seedCity('Munich');
    cy.get('.add-city-button').click();
    cy.get('.cities-links a').then(list => {
      expect(list.length).to.equal(6);
    });

    cy.get('.reset-all-button').click();
    cy.get('.cities-links a').then(list => {
      expect(list.length).to.equal(4);
    });
  });
});
