const fs = require('fs');
const {
  applyFunction
} = require('./src/util.js');
const {
  getLinesFromHead
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
  let fileName = process.argv[2];
  let encoding = 'utf8';
  let path = './'+fileName;
  let fileContent = applyFunction(fs.readFileSync, path, encoding);
  let head_10 = getLinesFromHead(fileContent);
  console.log(head_10);
}

main();
