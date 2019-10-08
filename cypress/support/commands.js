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
// thanks to https://github.com/cypress-io/cypress/issues/2671
function fakeLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb, err) => {
        if (latitude && longitude) {
          return cb({
            coords: {
              latitude,
              longitude,
            },
          });
        }
        throw err({ code: 1 }); // 1: rejected, 2: unable, 3: timeout
      });
    },
  };
}
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
