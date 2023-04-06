const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx').default;

const readExcelFile = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return Buffer.from(fileData);
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        parseXlsx: ({ filePath }) => {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
      });
    },
    baseUrl: 'https://elite-qa.retireup.com/login',
    env: {
      username: 'qtester97+unsteady_lychee741@gmail.com',
      password: 'validpassword',
      NODE_OPTIONS: "--unhandled-rejections=strict"
    },
    chromeWebSecurity: false,
    chromeWebSecurityDisableFetch: true,
    fixturesFolder: 'cypress/fixtures',
  },
});
