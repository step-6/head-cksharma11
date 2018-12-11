const { validateHeadInputs, validateTailInputs } = require("./errorCheck.js");
const { zip } = require('./util.js');

const getLinesFromHead = function(contents, numOfLines = 10) {
  const separator = "\n";
  return contents.split(separator, numOfLines).join(separator);
};

const getCharsFromHead = function(contents, numOfChar) {
  return contents.substr(0, numOfChar);
};

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
}

const head = function(contents, option, value, fileNames) {
  const headOperation = headOperations[option];

  if (isSingleExistingFile(fileNames.length, contents[0])) {
    return [headOperation(contents[0],value)];
  }

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName, 'head');
    let headResult = headOperation(content, value);
    return addHeader(fileName, headResult);
  });
};

const organizeHead = function(
  reader,
  checkExistence,
  { option, value, fileNames }
) {
  const inputValidation = validateHeadInputs({ option, value, fileNames });
  if (!inputValidation.isValid) return inputValidation.errorMessage;

  const fileContents = getFileContents(reader, checkExistence, fileNames);
  const result = head(fileContents, option, value, fileNames);
  return result.join("\n\n");
};

const getLinesFromTail = function(content, numOfLines){
  let separator = '\n';
  let lines = content.split(separator);
  return lines.slice(-numOfLines).join(separator);
}

const getCharsFromTail = function(content, numOfChar){
  return content.slice(-numOfChar);
}

const tail = function(contents, option, value, fileNames) {
  const absValue = Math.abs(value);
  const tailOperation = tailOperations[option];

  if (isSingleExistingFile(fileNames.length, contents[0])) {
    return [tailOperation(contents[0],absValue)];
  }

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName, 'tail');
    let tailResult = tailOperation(content, absValue);
    return addHeader(fileName, tailResult);
  });
};

const organizeTail = function(
  reader,
  checkExistence,
  { option, value, fileNames }
) {
  const inputValidation = validateTailInputs({ option, value, fileNames });
  if(value == 0) return '';  
  if (!inputValidation.isValid) return inputValidation.errorMessage;

  const fileContents = getFileContents(reader, checkExistence, fileNames);
  const result = tail(fileContents, option, value, fileNames);
  return result.join("\n\n");
};

const headOperations = { "-n": getLinesFromHead, "-c": getCharsFromHead };
const tailOperations = { "-n": getLinesFromTail, "-c": getCharsFromTail };

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  organizeHead,
  addHeader,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  organizeTail
};
