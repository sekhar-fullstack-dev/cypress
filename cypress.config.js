const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const xml2js = require('xml2js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readXmlFile(filePath) {
          return fs.readFile(filePath, 'utf8').then(xml2js.parseStringPromise);
        },
        writeXmlFile({ filePath, json }) {
          const builder = new xml2js.Builder();
          const xml = builder.buildObject(json);
          return fs.writeFile(filePath, xml, 'utf8').then(() => null);
        }
      });
    },
    baseUrl: 'https://translate.google.com', // Set the base URL here
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    pageLoadTimeout: 120000,
  },
});
