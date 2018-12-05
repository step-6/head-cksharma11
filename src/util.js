const parseInputs = function(inputs){
  let parsedInputs = {option : '-n', value : 10, fileNames : inputs};
  let isStartsWithHyphen = inputs[0].startsWith('-');

  if(isStartsWithHyphen && isFinite(inputs[0][1])){
    parsedInputs.value = inputs[0].slice(1);
    parsedInputs.fileNames = inputs.slice(1)
    return parsedInputs;
  }

  if(isStartsWithHyphen && inputs[0].length > 2){
    parsedInputs.option = inputs[0].slice(0,2);
    parsedInputs.value = inputs[0].substr(2);
    parsedInputs.fileNames = inputs.slice(1);
  }

  if(isStartsWithHyphen && inputs[0].length == 2){
    parsedInputs.value = inputs[1];
    parsedInputs.option = inputs[0].slice(0,2);
    parsedInputs.fileNames = inputs.slice(2);
  }

  return parsedInputs;
}

module.exports = {
  parseInputs
}
