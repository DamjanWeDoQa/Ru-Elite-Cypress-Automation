export class assetsPage {
  constructor(a) {
    this.sourcesNavLink = 'a[title="Update financial sources"]';
    this.assetsTabButton = "#assets-tab-assets";
    this.addAssetButton = "#new";
    this.taxStatusDropDown = "form .form-group:nth-of-type(3) [class=' css-107fx3s-singleValue']";
    this.accountTypeDropDown =
      ".collapse.show .col-sm-9 > .form-group .css-hlgwow";
    this.assetTypeDropDown = "form .form-group:nth-of-type(5) .css-hlgwow";
    this.balanceValueInputField = "form div:nth-of-type(8) [name='balance']";
    this.saveAssetButton =
      "[class='Button__DefaultButton-sc-ftu7s5-0 Nbwot btn btn-primary']";
    this.assetsTable = ".table";
    this.assetsRemoveButton = "tr:nth-of-type(1) button[title='Delete']";
    this.assetsRemoveModal = ".modal-content";
    this.assetsRemoveModalButton =
      ".Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
    this.assetsEditButton = "button[title='Edit']";
    this.assetsBalanceValue = "tr[role='button'] span";
    this.allLocationsButton =
      ".Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
    this.conservativeSelectButton =
      ".container-fluid div:nth-of-type(3) [class='Button__DefaultButton-sc-ftu7s5-0 Nbwot btn btn-primary']";
    this.manageHoldingsDoneButton =
      ".modal-footer > .Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
  }

  navigateToAssetsPage() {
    cy.get(this.sourcesNavLink).should("be.visible").click();
    cy.get(this.assetsTabButton).should("be.visible").click();
  }

  removeAsset(i) {
    cy.get(`tr:nth-of-type(${i}) button[title='Delete']`).click();
    cy.get(this.assetsRemoveModalButton).click();
    cy.get(this.assetsTable).should("contain", "No asset sources added");
  }

  editAsset(i, value) {
    cy.get(`tr:nth-of-type(${i}) button[title='Edit']`).click();
    cy.get(this.balanceValueInputField).type("{selectAll}{backspace}");
    cy.get(this.balanceValueInputField).type(value);
    cy.get(this.saveAssetButton).click();
    cy.get(this.assetsBalanceValue).should(($elem) => {
      const actualValue = parseInt($elem.text().replace(/[,|$]/g, ""), 10); // Remove commas and $ sign, and parse to an integer
      expect(actualValue).to.eq(parseInt(value, 10)); // Parse the `value` to an integer before comparing
    });
  }

  addAssetBasic(i, j, value) {
    // Click on the add asset button
    cy.get(this.addAssetButton).click();

    // Select the account type
    cy.get(this.accountTypeDropDown).click();
    cy.get(`[id*='-option-${i}']`).first().click();

    // Select the asset type
    cy.get(this.assetTypeDropDown).click();
    cy.get(`[id*='-option-${j}']`).first().click();

    // Fill in the balance field
    cy.get(this.balanceValueInputField).type(value);

    // Perform actions based on the asset type
    if (j != 2 && j != 4 && j != 6 && j != 7 && j != 8 && j < 10) {
      cy.get(this.saveAssetButton).click();
      cy.log(this.assetsTable);
    } else if (j == 4) {
      cy.get(this.allLocationsButton).click();
      cy.get(this.conservativeSelectButton).click();
      cy.get(this.manageHoldingsDoneButton).click();
    } else if (j == 7) {
      cy.get(this.allLocationsButton).click();
      cy.get(this.manageHoldingsDoneButton).click();
    } else if (j > 9) {
      cy.get("net-worth-option").click();
      cy.get("dont-income-option").click();
      cy.get("save-button").click();
    } else {
      cy.get(this.allLocationsButton).click();
      cy.get(this.manageHoldingsDoneButton).click();
    }
  }
}

export const AssetsPage = new assetsPage();
