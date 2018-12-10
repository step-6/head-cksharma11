const { validateInputs } = require("./errorCheck.js");
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

const operations = { "-n": getLinesFromHead, "-c": getCharsFromHead };

const isSingleExistingFile = function(fileCount, content){
  return fileCount == 1 && content != null;
}

const head = function(contents, option, value, fileNames) {
  const headOperation = operations[option];

  if (isSingleExistingFile(fileNames.length, contents[0])) {
    return [headOperation(contents[0],value)];
  }

  return zip(contents, fileNames).map(([content, fileName]) => {
    if (content == null) return fileNotFoundLog(fileName);
    let headResult = headOperation(content, value);
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

const getLinesFromTail = function(content, numOfLines){
  let separator = '\n';
  let reversedContent = content.split(separator).reverse();
  let slicedLines = reversedContent.slice(0, numOfLines);
  return slicedLines.reverse().join(separator);
}

const getCharsFromTail = function(content, numOfChar){
  let length = content.length;
  return content.slice(length-numOfChar, length);
}

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
  getCharsFromTail
};
