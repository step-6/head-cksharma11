const parseInputs = function(inputs){
  const isOptionSpecified = (input) => input.startsWith('-');

  const isNumberOption = (input) => isOptionSpecified(input) && isFinite(input[1]);

  const isOptionWithCount = (input) => isOptionSpecified(input) && input.length > 2;

  const isOptionWithoutCount = (input) => isOptionSpecified(input) && input.length ==2;

  const defaultOptions =  {option : '-n', value : 10, fileNames : inputs};

  if(isNumberOption(inputs[0])){
    return {
      option: '-n', 
      value: inputs[0].slice(1), 
      fileNames: inputs.slice(1)
    }
  }

  if(isOptionWithCount(inputs[0])){
    return {
      option: inputs[0].slice(0,2), 
      value: inputs[0].substr(2), 
      fileNames: inputs.slice(1)
    }
  }
  
  if(isOptionWithoutCount(inputs[0])){
     return {
      option: inputs[0].slice(0,2), 
      value: inputs[1], 
      fileNames: inputs.slice(2)
    }
  }

  return defaultOptions;
}

module.exports = {
  parseInputs
}
