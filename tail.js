const fs = require("fs");
const { parseInputs } = require("./src/IO.js");
const { organizeResult } = require("./src/format.js");

const main = function() {
  let parsedInputs = parseInputs(process.argv.slice(2));
  let result = organizeResult(fs, parsedInputs, "tail");
  console.log(result);
};

main();
