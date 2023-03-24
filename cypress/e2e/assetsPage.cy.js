const {AssetsPage} = require("../pageObjects/assetsPageObjects.js");

describe("Assets Page", () => {
    beforeEach(() => {
    });
  
    it("test login and plan create", () => {
       cy.login(Cypress.env("username"), Cypress.env("password"));
       cy.createNewClient();
       AssetsPage.navigateToAssetsPage();
       
    });
  
  });