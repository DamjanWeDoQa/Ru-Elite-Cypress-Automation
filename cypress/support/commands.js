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
// Cypress.Commands.add('login', (email, password) => { ... })
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
import './commands';

const emailInput = 'input#email';
const passwordInput = 'input#password';
const submitButton = 'button[type="submit"]';
const addClientButton = "button[title='Add a new client']";
const retireUpOption = "div[name='retireup']";
const firstNameInput = '#firstName';
const middleNameInput = '#middleName';
const lastNameInput = '#lastName';
const ageInput = '#age';
const descriptionInput = '#description';
const createPlanModal = '.modal-content';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.intercept('GET', 'https://elite-qa.retireup.com/').as('loginRequest');
  cy.get(emailInput).type(username);
  cy.get(passwordInput).type(password);
  cy.get(submitButton).should('be.visible').click();
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(302);
  });
});

Cypress.Commands.add('createNewClient', () => {
  cy.get(addClientButton).click();
  cy.get(createPlanModal).should('be.visible');
  cy.get(retireUpOption).should('be.visible').click();
  cy.get(firstNameInput).should('be.visible').type('John');
  cy.get(middleNameInput).should('be.visible').type('M');
  cy.get(lastNameInput).should('be.visible').type('LastName');
  cy.get(ageInput).should('be.visible').type('60');
  cy.get(descriptionInput).should('have.value', 'Current Plan');
  cy.get(submitButton).click();

});