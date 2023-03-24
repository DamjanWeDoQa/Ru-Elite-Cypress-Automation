const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    baseUrl: 'https://elite-qa.retireup.com/login',
    env: {
      username: 'qtester97+unsteady_lychee741@gmail.com',
      password: 'validpassword',
      NODE_OPTIONS: "--unhandled-rejections=strict"
    },
    chromeWebSecurity: false,
    chromeWebSecurityDisableFetch: true,
    
  },
});
