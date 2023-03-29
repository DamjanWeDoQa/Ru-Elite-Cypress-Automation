const { AssetsPage } = require("../pageObjects/assetsPageObjects.js");

const value = 100000;
const isQualifed = true;

describe("Assets Page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("The user is able to add an Asset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, value, isQualifed);
    AssetsPage.removeAsset(1);
  });

  it("The user is able to delete an Ssset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, value, isQualifed);
    AssetsPage.removeAsset(1);
  });

  it("The user is able to Edit an Asset", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 1, value, isQualifed);
    AssetsPage.editAsset(1, 1000);
    AssetsPage.removeAsset(1);
  });

  it("The user is able to add Assets with different Type", () => {
    cy.createNewClient();
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 11, value, isQualifed);
    AssetsPage.assertAsset("Auto", value);
    AssetsPage.navigateToAssetsPage();
    AssetsPage.removeAsset(1);
  });
});
