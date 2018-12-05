const fs = require('fs');
const {
  parseInputs
} = require('./src/util.js');
const {
  getLinesFromHead,
  readFile,
  head
} = require('./src/lib.js');

/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

const main = function(){
  let parsedInputs = parseInputs(process.argv.slice(2));
  let fileNames = parsedInputs.fileNames;
  let fileContents = fileNames.map(file => readFile(fs.readFileSync, file, 'utf8'));
  console.log(head(fileContents, parsedInputs.option, parsedInputs.value, fileNames).join('\n'));
}

main();
