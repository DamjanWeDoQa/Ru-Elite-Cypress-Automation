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
    this.retireClientAge = 'div[class="text-right col-3"] input[type="text"]';
    this.endClientAge = "[class='col-3']:nth-of-type(3) [precision]";
    this.annualGrowth = "[name='client\.salary\.growth']";
    this.employeeContribution = "form div:nth-of-type(5) > .form-group:nth-of-type(1) [class=' css-1d4ytge-container']";
    this.taxButtonPlanPAge = ".TaxSliderVariable__TriggerButton-sc-hizw2i-1.btn.btn-link.iEIPTU";
    this.taxModalInputField = ".TaxSliderVariable__StyledNumericInput-sc-hizw2i-4.eabSpG";
    this.planPageReturnsNavLink = 'a[data-rb-event-key="returns"]';
    this.viewDropDownPlanPage = '#returntype';
    this.viewDropDownVariableOption = '.dropdown-menu.show > a:nth-of-type(2)';
    this.variableRetirementSlider = 'div[role="slider"]';
    this.variableRetirementSliderValue = '.before > .percent';
    this.returnsChartPlanPage = '.Chart__Styledsvg-sc-hj1xii-0.dJhaml';
  }

  randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  profileSetup(retireClientAge, endClientAge, annualGrowth) {
    cy.get(this.retireClientAge).clear().type(retireClientAge).should('have.value', retireClientAge);
    cy.get(this.endClientAge).clear().type(endClientAge).should('have.value', endClientAge);
    cy.get(this.annualGrowth).clear().type(annualGrowth).should('have.value', annualGrowth + '%');
  }

  planPageSetup(tax, targetPosition) {
    cy.get(this.planNavLink).click();
    cy.get(this.taxButtonPlanPAge).click();
    cy.get(this.taxModalInputField).clear().type(tax).should('have.value', tax + "%");
    cy.get(this.planPageReturnsNavLink).click();
    cy.get(this.viewDropDownPlanPage).click();
    cy.get(this.viewDropDownVariableOption).click();
    cy.get(this.viewDropDownPlanPage).should('have.text', "Variable");
    cy.get(this.variableRetirementSlider).then(($slider) => {
      cy.wrap($slider).invoke('attr', 'style', `left: ${targetPosition - 5}%;`);
      cy.get(this.variableRetirementSlider).click();
      cy.get(this.variableRetirementSliderValue).should('have.text', `${targetPosition / 10}.0%`)
    });
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
    cy.get((".account > .tr > div:nth-of-type(2)")).invoke('text')
      .then((text) => {
        const value = Number(text.replace(/\$|,/g, ''));
        expect(value).to.eq(balance);
      });
  }

  addAssetBasic(i, j, value, isQualified, maxAllowable) {
    if (isQualified == true) {
      cy.get(this.addAssetButton).click();

      cy.get(this.accountTypeDropDown).click();
      cy.get(`[id*='-option-${i}']`).first().click(); 

      cy.get(this.assetTypeDropDown).click();
      cy.get(`[id*='-option-${j}']`).first().click();

      cy.get(this.balanceValueInputField).type(value);  

      if (j != 2 && j != 4 && j != 6 && j != 7 && j != 8 && j < 10) {
        cy.get(this.saveAssetButton).click();
      }

      else if (j == 2 || j == 6) {
        if (maxAllowable == true) {
          cy.get(this.employeeContribution).click();
          cy.get(`[tabindex='-1']:nth-of-type(2)`).first().click();
          cy.get(this.allLocationsButton).click();
          cy.get(this.enterManually).click();
          cy.get(this.manageHoldingsDoneButton).click();

        }
        else {
          cy.get(this.allLocationsButton).click();
          cy.get(this.enterManually).click();
          cy.get(this.manageHoldingsDoneButton).click();
        }

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
