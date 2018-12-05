const parseInputs = function(inputs){
  let isStartsWithHyphen = inputs[0].startsWith('-');

  if(isStartsWithHyphen && isFinite(inputs[0][1])){
    return {
      option: '-n', 
      value: inputs[0].slice(1), 
      fileNames: inputs.slice(1)
    }
  }

  if(isStartsWithHyphen && inputs[0].length > 2){
    return {
      option: inputs[0].slice(0,2), 
      value: inputs[0].substr(2), 
      fileNames: inputs.slice(1)
    }
  }
  
  if(isStartsWithHyphen && inputs[0].length == 2){
     return {
      option: inputs[0].slice(0,2), 
      value: inputs[1], 
      fileNames: inputs.slice(2)
    }
  }
  return {option : '-n', value : 10, fileNames : inputs};
}

module.exports = {
  parseInputs
}
