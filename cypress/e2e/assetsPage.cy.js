const { AssetsPage } = require("../pageObjects/assetsPageObjects.js");

describe("Assets Page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("The user is able to add an Asset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, 99999);
    AssetsPage.removeAsset(1);
  });

  it("The user is able to delete an Ssset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, 99999);
    AssetsPage.removeAsset(1);
  });

  it("The user is able to Edit an Asset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, 99999);
    AssetsPage.editAsset(1, 1000);
    AssetsPage.removeAsset(1);
  });

  xit("The user is able to add different Asset Options", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    //for (var i =1; i<=10;i++)
    //{
    // AssetsPage.addAssetBasic(1,i,99999);
    //AssetsPage.removeAsset(1);
    // }
  });
});
