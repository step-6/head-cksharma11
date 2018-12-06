const fs = require('fs');
const {
  checkErrors
} = require('./src/errorCheck.js');
const {
  parseInputs
} = require('./src/head_IO.js');
const {
  getLinesFromHead,
  readFile,
  head
} = require('./src/lib.js');

const main = function(){
  let parsedInputs = parseInputs(process.argv.slice(2));
  let errorLog = checkErrors(parsedInputs);
  
  if(errorLog){
    return console.log(errorLog);
  }

  let fileNames = parsedInputs.fileNames;
  let fileContents = fileNames.map(file => readFile(fs.readFileSync, file, 'utf8'));
  console.log(head(fileContents, parsedInputs.option, parsedInputs.value, fileNames).join('\n\n'));
}

main();
