const fs = require('fs');
const { parseInputs } = require('./src/head_IO.js');
const { generateHeadResult } = require('./src/lib.js');

const main = function(){
  let parsedInputs = parseInputs(process.argv.slice(2));
  let result = generateHeadResult(fs.readFileSync, parsedInputs);
  console.log(result);
}
main();
