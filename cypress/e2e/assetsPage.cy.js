const { fi } = require("faker/lib/locales.js");
const { AssetsPage } = require("../pageObjects/assetsPageObjects.js");
const value = 2000000;
const isQualifed = true;
const employeeContribution = true;
const rowIndex = 9;
const filePath = 'C:\\Users\\tester\\Documents\\Ru_Elite_Automation_Cypress\\cypress\\fixtures\\ruExcel.xlsm'
const filepath1= 'C:\\Users\\tester\\Documents\\Ru_Elite_Automation_Cypress\\cypress\\fixtures\\test.xlsx';
const returnsChartPlanPage = '.Chart__Styledsvg-sc-hj1xii-0.dJhaml';

describe("Assets Page", () => {
  beforeEach(() => {
    //cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it.only('The user is able to parse excel file', () => {
    var xyz= cy.findInExcel(filePath, 'RetireUp Market Returns', '5.21%', rowIndex).then(() => {
      cy.get('@firstRowIndex').then((rowIndex) => {
        
        cy.log(`Found matching cell at row ${rowIndex}`);
      });
    });
    cy.writeToExcel(filepath1, 'Notes', 0, 0, 'Hello, world!'); //figure out how to workaround the access
  });

  it("RU FLOW", () => {
    cy.createNewClient();
    AssetsPage.profileSetup(76, 90, 2);
    AssetsPage.navigateToAssetsPage();
    AssetsPage.addAssetBasic(1, 2, value, isQualifed, employeeContribution);
    AssetsPage.planPageSetup(18, 40);
    cy.getNthBarChartValue(1, returnsChartPlanPage);

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
