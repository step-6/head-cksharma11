const {
  operations,
  validations,
  getFileContents,
  fileNotFoundLog,
  runCommand
} = require("./lib.js");
const { zip } = require("./util.js");

const isSingleExistingFile = function(fileCount, content) {
  return fileCount == 1 && content != null;
};

const addHeader = function(fileName, content) {
  if (content == null) return content;
  return "==> " + fileName + " <==\n" + content;
};

const maybeAddHeader = function(contents, fileNames) {
  if (isSingleExistingFile(fileNames.length, contents[0])) return [contents];

  return zip(contents, fileNames).map(([content, fileName]) => {
    return addHeader(fileName, content);
  });
};

const addFileNotFoundLog = function(fileNames, contents, command) {
  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName, command);
    return content;
  });
};

const organizeResult = function(fs, { option, count, fileNames }, command) {
  const inputValidation = validations[command]({ option, count, fileNames });
  if (!inputValidation.isValid) return inputValidation.errorMessage;
  if (count == 0) return "";

  const operation = operations[command][option];
  const fileContents = getFileContents(fs, fileNames);
  let result = runCommand(fileContents, count, operation);
  result = maybeAddHeader(result, fileNames);
  return addFileNotFoundLog(fileNames, result, command).join("\n\n");
};

module.exports = {
  organizeResult,
  addHeader
};
