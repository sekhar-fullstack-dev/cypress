const fs = require('fs-extra');
const xml2js = require('xml2js');

const readXMLFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf8');
  const result = await xml2js.parseStringPromise(data);
  return result;
};

const writeXMLFile = async (filePath, json) => {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(json);
  await fs.writeFile(filePath, xml, 'utf8');
};

const extractStrings = (json) => {
  const strings = json.resources.string.map(item => ({
    name: item.$.name,
    value: item._
  }));
  return strings;
};

const createTranslatedString = (name, value) => {
  return `    <string name="${name}">${value}</string>\n`;
};

module.exports = {
  readXMLFile,
  writeXMLFile,
  extractStrings,
  createTranslatedString
};
