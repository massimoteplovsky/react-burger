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
import 'cypress-localstorage-commands';
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://norma.nomoreparties.space/api/auth/login',
    body: {
      email: 'www.test@mail.ru',
      password: '1111111',
    },
  })
    .its('body')
    .then((userData) => {
      cy.setLocalStorage('accessToken', userData.accessToken);
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
