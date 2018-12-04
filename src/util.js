const applyFunction = function(callback, arg1, arg2){
  return callback(arg1, arg2);
}

const parseInputs = function(...fileNames){
  let parsedInputs = {option : 'n', numOfLines : 10};
  parsedInputs.fileNames = fileNames;
  return parsedInputs;
}

module.exports = {
  applyFunction,
  parseInputs
}
