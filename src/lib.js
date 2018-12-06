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
  let operations = {'-n': getLinesFromHead, '-c': getCharsFromHead};
  let fileIndex = 0;
  let fileCount = files.length;

  return files.map(file => {
    if(file == null) return `head: ${fileNames[fileIndex++]}: No such file or directory`;
    if(fileCount == 1) return operations[option](file, value);
    return `==> ${fileNames[fileIndex++]} <==\n${operations[option](file, value)}`;
  });
}

const generateHeadResult = function(readFileSync, existsSync, {option, value, fileNames}){
  let errorLog = checkErrors({option, value, fileNames});

  if(errorLog){
    return errorLog;
  }

  let fileContents = fileNames.map(file => {
    if(!existsSync(file)) return null;
    return readFile(readFileSync, file, 'utf8')
  });
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
