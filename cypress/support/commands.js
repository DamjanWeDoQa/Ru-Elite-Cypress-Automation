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
const xlsx = require('xlsx');
const fs = require('fs');
const ExcelJS = require('exceljs');

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
  cy.get(ageInput).should('be.visible').type('63');
  cy.get(descriptionInput).should('have.value', 'Current Plan');
  cy.get(submitButton).click();
});


Cypress.Commands.add('parseExcel', (filePath, sheetName, rowIndex, columnIndex, expectedValue) => {
  cy.task('parseXlsx', { filePath }).then((jsonData) => {
    const sheetData = jsonData.find((sheet) => sheet.name === sheetName);
    const actualValue = sheetData.data[rowIndex][columnIndex];
    cy.log(`Actual value: ${actualValue}`);
    expect(actualValue).to.equal(expectedValue);
  });
});

Cypress.Commands.add('findInExcel', (filePath, sheetName, searchValue, columnIndex) => {
  if (!searchValue) {
    throw new Error('Search value is null or undefined');
  }
  if (columnIndex === undefined || columnIndex < 0) {
    columnIndex = 0;
  }

  cy.task('parseXlsx', { filePath }).then((jsonData) => {
    const sheetData = jsonData.find((sheet) => sheet.name === sheetName);
    const matchingCells = sheetData.data
      .map((row, rowIndex) => row.map((cellValue, colIndex) => ({ cellValue, rowIndex, colIndex })))
      .flat()
      .filter(({ cellValue, colIndex }) => {
        const valueAsPercentage = (cellValue * 100).toFixed(2) + '%';
        return colIndex === columnIndex && cellValue !== null && cellValue !== undefined && valueAsPercentage === searchValue;
      });
    const matchingCellPositions = matchingCells.map(({ rowIndex, colIndex }) => `[${rowIndex}][${colIndex}]`);
    if (matchingCellPositions.length === 0) {
      throw new Error(`Value "${searchValue}" not found in sheet "${sheetName}"`);
    }

    const firstMatchingCellPosition = matchingCellPositions[0];
    const firstRowIndex = parseInt(firstMatchingCellPosition.substring(1, firstMatchingCellPosition.indexOf(']')));

    cy.log(`Found ${matchingCellPositions.length} cell(s) with value "${searchValue}" in column ${String.fromCharCode(65 + columnIndex)}: ${matchingCellPositions.join(', ')}`);
    return cy.wrap(firstRowIndex).as('firstRowIndex');
  });
});

Cypress.Commands.add('writeToExcel', (filePath, sheetName, rowIndex, columnIndex, value) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist.`);
  }

  const workbook = new ExcelJS.Workbook();
  return workbook.xlsx.readFile(filePath)
    .then(() => {
      const sheet = workbook.getWorksheet(sheetName);
      const cell = sheet.getCell(rowIndex, columnIndex);
      cell.value = value;
      return workbook.xlsx.writeFile(filePath);
    })
    .then(() => {
      cy.log(`Successfully wrote "${value}" to cell [${rowIndex}][${columnIndex}] in sheet "${sheetName}"`);
    })
    .catch((err) => {
      throw new Error(`Error writing to cell [${rowIndex}][${columnIndex}] in sheet "${sheetName}": ${err.message}`);
    });
});

Cypress.Commands.add("getNthBarChartValue", (n, chartSelector) => {
  cy.get(chartSelector)
    .find(`.return-bars > path:nth-of-type(${n})`)
    .trigger("mouseover")
    .wait(500)
    .get(".tooltip-inner")
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const percentage = text.match(/[\d.]+%/);
      if (percentage) {
        cy.log(`The value of the ${n}th bar chart element is: ${percentage[0]}`);
      } else {
        cy.log(`Failed to get the value of the ${n}th bar chart element.`);
      }
    })
});







