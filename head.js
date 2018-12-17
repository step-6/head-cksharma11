const fs = require("fs");
const { parseInputs } = require("./src/IO.js");
const { organizeHead } = require("./src/lib.js");

const main = function() {
  let parsedInputs = parseInputs(process.argv.slice(2));
  let result = organizeHead(fs, parsedInputs);
  console.log(result);
};
main();
