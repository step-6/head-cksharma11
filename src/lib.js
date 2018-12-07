const { validateInputs } = require("./errorCheck.js");
const { zip } = require('./util.js');

const getLinesFromHead = function(contents, numOfLines = 10) {
  const seperator = "\n";
  return contents.split(seperator, numOfLines).join(seperator);
};

const getCharsFromHead = function(contents, numOfChar) {
  return contents.substr(0, numOfChar);
};

const readFile = function(reader, path, encoding) {
  return reader(path, encoding);
};

const fileNotFoundLog = function(fileName) {
  return "head: " + fileName + ": No such file or directory";
};

const addHeader = function(fileName, content) {
  return "==> " + fileName + " <==\n" + content;
};

const getFileContents = function(reader, checkExistence, fileNames) {
  return fileNames.map(file => {
    if (checkExistence(file)) return readFile(reader, file, "utf8");
    return null;
  });
};

const head = function(contents, option, value, fileNames) {
  const operations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
  const headOperation = operations[option];
  const fileCount = fileNames.length;

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName);

    let headResult = headOperation(content, value);
    if (fileCount == 1) return headResult;

    return addHeader(fileName, headResult);
  });
};

const organizeHead = function(
  reader,
  checkExistence,
  { option, value, fileNames }
) {
  const inputValidation = validateInputs({ option, value, fileNames });
  if (!inputValidation.isValid) return inputValidation.errorMessage;

  const fileContents = getFileContents(reader, checkExistence, fileNames);
  const result = head(fileContents, option, value, fileNames);
  return result.join("\n\n");
};

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  organizeHead,
  addHeader,
  fileNotFoundLog,
  getFileContents
};
