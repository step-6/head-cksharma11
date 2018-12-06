const { checkErrors } = require('./errorCheck.js');

const getLinesFromHead = function(contents, numOfLines = 10){
  let seperator = '\n';
  return contents.split(seperator, numOfLines).join(seperator);
}

const getCharsFromHead = function(contents, numOfChar){
  return contents.substr(0, numOfChar);
}

const readFile = function(readFileSync, path, encoding){
  return readFileSync(path, encoding);
}

const fileNotFoundLog = function(fileName){
  return 'head: '+fileName+': No such file or directory';
}

const addHeader = function(fileName, content){
  return '==> '+fileName+' <==\n'+content;
}

const getFileContents = function(readFileSync, existsSync, fileNames){
  return fileNames.map(file => {
    if(existsSync(file)) return readFile(readFileSync, file, 'utf8');
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

const generateHeadResult = function(readFileSync, existsSync, {option, value, fileNames}){
  let errorLog = checkErrors({option, value, fileNames});
  if(errorLog) return errorLog;

  let fileContents = getFileContents(readFileSync, existsSync, fileNames);
  let result = head(fileContents, option, value, fileNames);
  return result.join('\n\n');
}

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  generateHeadResult
}
