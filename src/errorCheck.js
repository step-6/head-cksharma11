const validateInputs = function({option, value, fileNames}){
  const isInvalidCount = (value) => value <= 0 || isNaN(value);
  
  const isLineCountInvalid = (option, value) => option == '-n' && isInvalidCount(value);
  
  const isCharCountInvalid = (option, value) => option == '-c' && isInvalidCount(value);
  
  const isInvalidOption = (option) => option != '-n' && option != '-c';
  
  const isFileCountInvalid = (fileNames) => fileNames.length == 0;

  if(isLineCountInvalid(option, value)){
    return {
      isValid: false,
      errorMessage: 'head: illegal line count -- '+value
    }
  }
  
  if(isCharCountInvalid(option, value)){
    return {
      isValid: false,
      errorMessage:'head: illegal byte count -- '+value
    }
  }

  if(isInvalidOption(option, value)){
    return {
      isValid: false,
      errorMessage: 'head: illegal option -- '+ option +'\nusage: head [-n lines | -c bytes] [file ...]'
    }
  }

  if(isFileCountInvalid(fileNames)){
    return {
      isValid: false,
      errorMessage: 'head: option requires an argument -- '+option[1]+'\nusage: head [-n lines | -c bytes] [file ...]'
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}

module.exports = {
  validateInputs
}
