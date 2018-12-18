const {
  validateHeadInputs,
  validateTailInputs
} = require("./inputValidation.js");
const { zip } = require("./util.js");

const fileNotFoundLog = function(fileName, command) {
  return command + ": " + fileName + ": No such file or directory";
};

const addHeader = function(fileName, content) {
  return "==> " + fileName + " <==\n" + content;
};

const getFileContents = function(fs, fileNames) {
  return fileNames.map(file => {
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
    return null;
  });
};

const isSingleExistingFile = function(fileCount, content) {
  return fileCount == 1 && content != null;
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

const maybeAddHeader = function(contents, fileNames, command) {
  if (isSingleExistingFile(fileNames.length, contents[0])) return [contents];

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName, command);
    return addHeader(fileName, content);
  });
};

const organizeResult = function(fs, { option, count, fileNames }, command) {
  const inputValidation = validations[command]({ option, count, fileNames });
  if (!inputValidation.isValid) return inputValidation.errorMessage;
  if (count == 0) return "";

  const operation = operations[command][option];
  const fileContents = getFileContents(fs, fileNames);
  const result = runCommand(fileContents, count, operation);
  return maybeAddHeader(result, fileNames, command).join("\n\n");
};

const headOperations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
const tailOperations = { "-n": getLinesFromTail, "-c": getCharsFromTail };
const operations = { head: headOperations, tail: tailOperations };
const validations = { head: validateHeadInputs, tail: validateTailInputs };

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  addHeader,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  organizeResult,
  runCommand
};
