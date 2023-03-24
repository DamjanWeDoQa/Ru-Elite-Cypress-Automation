export class assetsPage {
    constructor(a) {
        this.sourcesNavLink = 'a[title="Update financial sources"]';
        this.assetsTabButton ='#assets-tab-assets';
        this.addAssetButton ='#new';
        this.taxStatusDropDown ="form .form-group:nth-of-type(3) [class=' css-107fx3s-singleValue']";

    }

    navigateToAssetsPage() {
        cy.get(this.sourcesNavLink).should('be.visible').click();
        cy.get(this.assetsTabButton).should('be.visible').click();
        cy.get(this.addAssetButton).should('be.visible').click();
      }

}

export const AssetsPage = new assetsPage();
