const parseInputs = function(inputs){
  let parsedInputs = {option : '-n', value : 10, fileNames : inputs};

  if(inputs[0].startsWith('-') && isFinite(inputs[0][1])){
    parsedInputs.value = inputs[0].slice(1);
    parsedInputs.fileNames = inputs.slice(1)
    return parsedInputs;
  }

  if(inputs[0].startsWith('-') && inputs[0].length > 2){
    parsedInputs.option = inputs[0].slice(0,2);
    parsedInputs.value = inputs[0].substr(2);
    parsedInputs.fileNames = inputs.slice(1);
  }

  if(inputs[0].startsWith('-') && inputs[0].length == 2){
    parsedInputs.value = inputs[1];
    parsedInputs.option = inputs[0].slice(0,2);
    parsedInputs.fileNames = inputs.slice(2);
  }

  return parsedInputs;
}

module.exports = {
  parseInputs
}
