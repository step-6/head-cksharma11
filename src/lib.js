const { validateHeadInputs, validateTailInputs } = require("./inputValidation.js");
const { zip } = require('./util.js');

const readFile = function(reader, path, encoding) {
  return reader(path, encoding);
};

const fileNotFoundLog = function(fileName, command) {
  return command+": " + fileName + ": No such file or directory";
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

const isSingleExistingFile = function(fileCount, content){
  return fileCount == 1 && content != null;
};

const getLinesFromHead = function(contents, numOfLines = 10) {
  const separator = "\n";
  return contents.split(separator, numOfLines).join(separator);
};

const getCharsFromHead = function(contents, numOfChar) {
  return contents.substr(0, numOfChar);
};

const getLinesFromTail = function(content, numOfLines){
  const separator = '\n';
  const lines = content.split(separator);
  return lines.slice(-numOfLines).join(separator);
};

const getCharsFromTail = function(content, numOfChar){
  return content.slice(-numOfChar);
};

const organizeHead = function(
  reader,
  checkExistence,
  { option, value, fileNames }
) {
  return organizeResult(reader, checkExistence, {option, value, fileNames}, 'head');
};

const organizeTail = function(
  reader,
  checkExistence,
  { option, value, fileNames }
) {
  return organizeResult(reader, checkExistence, {option, value, fileNames}, 'tail');
};

const head = function(contents, option, value, fileNames) {
  return runCommand(contents, option, value, fileNames, 'head');
};

const tail = function(contents, option, value, fileNames) {
  return runCommand(contents, option, value, fileNames, 'tail');
};

const runCommand = function(contents, option, value, fileNames, command){
  const operation = operations[command][option];

  if (isSingleExistingFile(fileNames.length, contents[0])) {
    return [operation(contents[0],value)];
  }

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName, command);
    const result = operation(content, value);
    return addHeader(fileName, result);
  });
};

const organizeResult = function(reader,
  checkExistence, 
  { option, value, fileNames },
  command
  ){
  const inputValidation = validations[command]({ option, value, fileNames });
  if (!inputValidation.isValid) return inputValidation.errorMessage;
  if(value == 0) return '';  

  const fileContents = getFileContents(reader, checkExistence, fileNames);
  const result = commands[command](fileContents, option, value, fileNames);
  return result.join("\n\n");
};

const headOperations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
const tailOperations = { "-n": getLinesFromTail, "-c": getCharsFromTail };
const operations = { "head": headOperations, "tail": tailOperations };
const validations = { "head": validateHeadInputs, "tail": validateTailInputs };
const commands = { "head": head, "tail": tail };

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  tail,
  organizeHead,
  addHeader,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  organizeTail
};
