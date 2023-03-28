const { assetsPage } = require("../pageObjects/assetsPageObjects");

describe('register', () => {

  it('register', () => {
    cy.visit('/')
    registerPage.createAccount()
    registerPage.coveredValidation()
  })
})