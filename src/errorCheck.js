const checkErrors = function({option, value, fileNames}){
  let invalidValue = (value <= 0 || isNaN(value));
  if(invalidValue && option == '-n'){
    return 'head: illegal line count -- '+value;
  }
  
  if(invalidValue && option == '-c'){
    return 'head: illegal byte count -- '+value;
  }

  if(option != '-n' && option != '-c'){
    return 'head: illegal option -- '+ option +'\nusage: head [-n lines | -c bytes] [file ...]';
  }

  if(fileNames.length == 0){
    return 'head: option requires an argument -- '+option[1]+'\nusage: head [-n lines | -c bytes] [file ...]'
  }

  return 0;
}

module.exports = {
  checkErrors
}
