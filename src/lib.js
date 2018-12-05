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

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile
}
