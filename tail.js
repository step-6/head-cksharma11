const fs = require("fs");
const { parseInputs } = require("./src/headIO.js");
const { organizeTail } = require("./src/lib.js");

const main = function() {
  let parsedInputs = parseInputs(process.argv.slice(2));
  let result = organizeTail(fs.readFileSync, fs.existsSync, parsedInputs, 'tail');
  console.log(result);
};

main();