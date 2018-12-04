const getLinesFromHead = function(contents, numOfLines = 10){
  let seperator = '\n';
  return contents.split(seperator, numOfLines).join(seperator);
}

const getCharsFromHead = function(contents, numOfChar){
  let seperator = '';
  return contents.split(seperator, numOfChar).join(seperator);
}

module.exports = {
  getLinesFromHead,
  getCharsFromHead
}
