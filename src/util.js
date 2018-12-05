const parseInputs = function(inputs){
  let parsedInputs = {option : '-n', value : 10, fileNames : [...inputs]};

  let option = inputs[0].match(/^-(n|c)/);
  if(option != null){
    parsedInputs.option = option[0];
    parsedInputs.value = inputs[0].substr(2);
    parsedInputs.fileNames = inputs.slice(1);
    if(parsedInputs.value == ''){
      optionValue = inputs[1];
      fileNames = inputs.slice(2);
    }
  }

  return parsedInputs;
}

module.exports = {
  parseInputs
}
