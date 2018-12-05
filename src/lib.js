const getLinesFromHead = function(contents, numOfLines = 10){
  let seperator = '\n';
  return contents.split(seperator, numOfLines).join(seperator);
}

const getCharsFromHead = function(contents, numOfChar){
  return contents.substr(0, numOfChar);
}

const readFile = function(readFileSync, path, encoding){
  return readFileSync(path, encoding);
}

const head = function(files, option, value, fileNames){
  let opration = getLinesFromHead;
  let count = 0;
  if(option == '-c'){
    opration = getCharsFromHead;
  }
  if(files.length == 1){
    return files.map(file => opration(file, value));
  }

  return files.map(file => {
    return `==> ${fileNames[count++]} <==\n${opration(file, value)}`;
  });
}

module.exports = {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head
}
