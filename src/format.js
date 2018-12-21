const {
  operations,
  validations,
  getFileContents,
  runCommand
} = require("./lib.js");
const { zip } = require("./util.js");
const { fileNotFoundLog } = require("./errorHandler.js");

const isSingleExistingFile = function(fileCount, content) {
  return fileCount == 1 && content != null;
};

const addHeader = function(fileName, content) {
  return "==> " + fileName + " <==\n" + content;
};

const formatWithHeader = function(contents, fileNames) {
  if (isSingleExistingFile(fileNames.length, contents[0])) return [contents];

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return content;
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
  const errorHandler = validations[command]({ option, count, fileNames });
  if (!errorHandler.isValid) return errorHandler.errorMessage;
  if (count == 0) return "";

  const operation = operations[command][option];
  const fileContents = getFileContents(fs, fileNames);
  let result = runCommand(fileContents, count, operation);
  result = formatWithHeader(result, fileNames);
  return addFileNotFoundLog(fileNames, result, command).join("\n\n");
};

module.exports = {
  organizeResult,
  addHeader
};
