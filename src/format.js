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
  return "==> " + fileName + " <==\n" + content;
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

module.exports = {
  organizeResult,
  addHeader
};
