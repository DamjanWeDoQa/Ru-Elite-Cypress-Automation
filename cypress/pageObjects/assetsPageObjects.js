export class assetsPage {
  constructor(a) {
    this.sourcesNavLink = 'a[title="Update financial sources"]';
    this.assetsTabButton = "#assets-tab-assets";
    this.addAssetButton = "#new";
    this.taxStatusDropDown = "form .form-group:nth-of-type(3) [class=' css-107fx3s-singleValue']";
    this.accountTypeDropDown = ".collapse.show .col-sm-9 > .form-group .css-hlgwow";
    this.assetTypeDropDown = "form .form-group:nth-of-type(5) .css-hlgwow";
    this.balanceValueInputField = "form div:nth-of-type(8) [name='balance']";
    this.saveAssetButton = "[class='Button__DefaultButton-sc-ftu7s5-0 Nbwot btn btn-primary']";
    this.assetsTable = ".table";
    this.assetsRemoveButton = "tr:nth-of-type(1) button[title='Delete']";
    this.assetsRemoveModal = ".modal-content";
    this.assetsRemoveModalButton = ".Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
    this.assetsEditButton = "button[title='Edit']";
    this.assetsBalanceValue = "tr[role='button'] span";
    this.allLocationsButton = ".Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
    this.conservativeSelectButton = ".container-fluid div:nth-of-type(3) [class='Button__DefaultButton-sc-ftu7s5-0 Nbwot btn btn-primary']";
    this.manageHoldingsDoneButton = ".modal-footer > .Button__DefaultButton-sc-ftu7s5-0.Nbwot.btn.btn-primary";
    this.createAccountLink = ".container-footer";
    this.firstNameInput = '#firstName';
    this.lastNameInput = '#lastName';
    this.companyInput = '#company';
    this.phoneInput = '#phone';
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.promoInput = '#promo';
    this.createAccountButton = 'button.Button__DefaultButton-sc-ftu7s5-0.LaddaButton__StyledButton-sc-1p7juw2-0.Nbwot.jiuvEj.btn.btn-primary.ladda-button';
    this.continueButton = 'button[data-style="expand-left"][type="submit"]'
    this.netWorthDropDown = 'div#withdraw .css-107fx3s-singleValue';
    this.enterManually = 'div[class="row input-option"] div[class="title"]';
    this.addedAssetTable = '.assets .tab-content';
    this.planNavLink = "a[title='Plan retirement']";
    this.planPageAssetSource = "[class='Accounts__Description-sc-16mxkg1-1 cIzfnw'] .bottom";
  }

  randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  createAccount(firstName, lastName, companyName, phoneNumber, password, promo) {
    cy.get(this.createAccountLink).find('a').click()
    cy.get(this.firstNameInput).type('John')
    cy.get(this.lastNameInput).type('Johnson')
    cy.get(this.companyInput).type('test Company')
    cy.get(this.phoneInput).type('5345655656')
    cy.get(this.emailInput).type('qtester97+jete2802@gmail.com')
    cy.get(this.passwordInput).type('validpassword')
    cy.get(this.promoInput).type('covered')
    cy.get(this.createAccountButton).click()
    cy.get(this.continueButton).click()
  }

  coveredValidation() {
    cy.get('.covered-label').should('be.visible').and('have.text', 'We got you covered!')
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
      const actualValue = parseInt($elem.text().replace(/[,|$]/g, ""), 10);
      expect(actualValue).to.eq(parseInt(value, 10));
    });
  }
  
  assertAsset(value, balance) {
    cy.get(this.planNavLink).click();
    cy.get(this.planPageAssetSource).should('contain', value);
    cy.get((".account > .tr > div:nth-of-type(2)")).invoke('text') // Get the text of the element
      .then((text) => {
        const value = Number(text.replace(/\$|,/g, '')); // Remove the dollar sign and the period, and convert the resulting string to a number
        expect(value).to.eq(balance); // Assert the value is correct
      });
  }

  addAssetBasic(i, j, value, isQualified) {
    if (isQualified == true) {
      cy.get(this.addAssetButton).click();// Click on the add asset button

      cy.get(this.accountTypeDropDown).click();
      cy.get(`[id*='-option-${i}']`).first().click(); // Select the account type

      cy.get(this.assetTypeDropDown).click();
      cy.get(`[id*='-option-${j}']`).first().click();// Select the asset type

      cy.get(this.balanceValueInputField).type(value);  // Fill in the balance field

      // Perform actions based on the asset type
      if (j != 2 && j != 4 && j != 6 && j != 7 && j != 8 && j < 10) {
        cy.get(this.saveAssetButton).click();
      }

      else if (j == 2 || j == 6) {
        cy.get(this.allLocationsButton).click();
        cy.get(this.enterManually).click();
        cy.get(this.manageHoldingsDoneButton).click();
      }
      else if (j == 4) {
        cy.get(this.allLocationsButton).click();
        cy.get(this.conservativeSelectButton).click();
        cy.get(this.manageHoldingsDoneButton).click();
      }
      else if (j == 7 && isQualified == false) {
        cy.get(this.allLocationsButton).click();
        cy.get(this.manageHoldingsDoneButton).click();
      }
      else if (j > 9) {
        cy.get(this.netWorthDropDown).click();
        cy.contains('Don\'t use for income').click();
        cy.get(this.manageHoldingsDoneButton).click();
      }
      else {
        cy.get(this.allLocationsButton).click();
        cy.get(this.manageHoldingsDoneButton).click();
      }
    }
    else {
      // write code for nonQualifed
      cy.log("NonQualifed - Else");
    }
  }
}

export const AssetsPage = new assetsPage();
