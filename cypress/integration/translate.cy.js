describe('Google Translate Automation', () => {
  const inputFilePath = 'cypress/integration/strings.xml';
  const languages = [
    { code: 'kn', name: 'Kannada', outputFilePath: 'cypress/integration/strings_kn.xml' },
    { code: 'ta', name: 'Tamil', outputFilePath: 'cypress/integration/strings_ta.xml' },
    { code: 'te', name: 'Telugu', outputFilePath: 'cypress/integration/strings_te.xml' },
    { code: 'or', name: 'Odia', outputFilePath: 'cypress/integration/strings_or.xml' }
  ];
  
  let strings;

  before(() => {
    cy.task('readXmlFile', inputFilePath).then((data) => {
      strings = data.resources.string.map(item => ({
        name: item.$.name,
        value: item._
      }));
    });
  });

  languages.forEach(language => {
    it(`should translate strings from English to ${language.name}`, () => {
      const translatedStrings = [];

      cy.visit(`/?sl=en&tl=${language.code}&op=translate`);

      strings.forEach(string => {
        cy.get('[aria-label="Source text"]').clear().type(string.value);
        cy.wait(1000); // Wait for translation
        cy.get('span[jsname="W297wb"]').then(($el) => {
          const translatedText = $el.text();
          translatedStrings.push({ name: string.name, value: translatedText });

          // Write to file if all strings are translated
          if (translatedStrings.length === strings.length) {
            const resources = {
              resources: {
                string: translatedStrings.map(item => ({
                  _: item.value,
                  $: { name: item.name }
                }))
              }
            };
            cy.task('writeXmlFile', { filePath: language.outputFilePath, json: resources });
          }
        });
      });
    });
  });
});
