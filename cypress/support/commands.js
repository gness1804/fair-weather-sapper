// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
import fakeLocation from './helpers/fakeLocation';

// sets up the /cities landing page tests
Cypress.Commands.add('seedCitiesPage', () => {
  cy.request({
    url: '/resetCities',
    failOnStatusCode: false,
    method: 'POST',
  });
  cy.visit('/cities', fakeLocation(48, 2));
  sessionStorage.clear();
});

// enters in data for city on cities page
Cypress.Commands.add('seedCity', city => {
  cy.get('#city-input')
    .type(city)
    .blur();
});

Cypress.Commands.add('visitCustom', (country, city) => {
  if (city) {
    cy.visit(`/${country}/${city}/custom`);
  } else {
    cy.visit(`/${country}/custom`);
  }
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
