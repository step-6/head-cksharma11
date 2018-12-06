const checkErrors = function({option, value, fileNames}){
  if(value == 0 && option == '-n'){
    return 'head: illegal line count -- 0';
  }
  
  if(value == 0 && option == '-c'){
    return 'head: illegal byte count -- 0';
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
