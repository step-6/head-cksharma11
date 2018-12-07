const { validateInputs } = require('./errorCheck.js');

const getLinesFromHead = function(contents, numOfLines = 10){
  let seperator = '\n';
  return contents.split(seperator, numOfLines).join(seperator);
}

const getCharsFromHead = function(contents, numOfChar){
  return contents.substr(0, numOfChar);
}

const readFile = function(reader, path, encoding){
  return reader(path, encoding);
}

const fileNotFoundLog = function(fileName){
  return 'head: '+fileName+': No such file or directory';
}

const addHeader = function(fileName, content){
  return '==> '+fileName+' <==\n'+content;
}

const getFileContents = function(reader, checkExistence, fileNames){
  return fileNames.map(file => {
    if(checkExistence(file)) return readFile(reader, file, 'utf8');
    return null;
  });
}

const head = function(files, option, value, fileNames){
  let operations = {'-n': getLinesFromHead, '-c': getCharsFromHead};
  let fileIndex = 0;
  let fileCount = files.length;

  return files.map(file => {
    let fileName = fileNames[fileIndex++];
    if(file == null) return fileNotFoundLog(fileName); 

    let content = operations[option](file, value);
    if(fileCount == 1) return content;

    return addHeader(fileName, content); 
  });
}

const organizeHead = function(reader, checkExistence, {option, value, fileNames}){
  let inputValidation = validateInputs({option, value, fileNames});
  if(!inputValidation.isValid) return inputValidation.errorMessage;

  let fileContents = getFileContents(reader, checkExistence, fileNames);
  let result = head(fileContents, option, value, fileNames);
  return result.join('\n\n');
}

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  organizeHead,
  addHeader,
  fileNotFoundLog,
  getFileContents
}
