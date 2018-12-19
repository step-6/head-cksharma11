const {
  validateHeadInputs,
  validateTailInputs
} = require("./errorHandler.js");

const fileNotFoundLog = function(fileName, command) {
  return command + ": " + fileName + ": No such file or directory";
};

const getFileContents = function(fs, fileNames) {
  return fileNames.map(file => {
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
    return null;
  });
};

const getLinesFromHead = function(contents, numOfLines = 10) {
  const separator = "\n";
  return contents.split(separator, numOfLines).join(separator);
};

const getCharsFromHead = function(contents, numOfChar) {
  return contents.substr(0, numOfChar);
};

const getLinesFromTail = function(content, numOfLines) {
  const separator = "\n";
  const lines = content.split(separator);
  return lines.slice(-numOfLines).join(separator);
};

const getCharsFromTail = function(content, numOfChar) {
  return content.slice(-numOfChar);
};

const runCommand = function(contents, count, operation) {
  return contents.map(content => {
    if (content == null) return content;
    return operation(content, count);
  });
};

const headOperations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
const tailOperations = { "-n": getLinesFromTail, "-c": getCharsFromTail };
const operations = { head: headOperations, tail: tailOperations };
const validations = { head: validateHeadInputs, tail: validateTailInputs };

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  runCommand,
  operations,
  validations
};
