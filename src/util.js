const parseInputs = function(...fileNames){
  let parsedInputs = {option : 'n', numOfLines : 10};
  parsedInputs.fileNames = fileNames;
  return parsedInputs;
}

module.exports = {
  parseInputs
}
