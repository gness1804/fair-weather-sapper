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
  cy.visit('/cities', fakeLocation(48, 2));
  localStorage.clear();
});

// enters in Detroit for city on cities page
Cypress.Commands.add('seedCity', city => {
  cy.get('[data-cy=city-input]')
    .type(city)
    .blur();
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
