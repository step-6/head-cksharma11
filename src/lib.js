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

const head = function(files, option, value, fileNames){
  let opration = getLinesFromHead;
  let count = 0;
  if(option == '-c'){
    opration = getCharsFromHead;
  }
  if(files.length == 1){
    return files.map(file => opration(file, value));
  }

  return files.map(file => {
    return `==> ${fileNames[count++]} <==\n${opration(file, value)}`;
  });
}

const generateHeadResult = function(readFileSync, {option, value, fileNames}){
  let errorLog = checkErrors({option, value, fileNames});

  if(errorLog){
    return errorLog;
  }

  let fileContents = fileNames.map(file => readFile(readFileSync, file, 'utf8'));
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
