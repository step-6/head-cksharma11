const fs = require("fs");
const { parseInputs } = require("./src/IO.js");
const { organizeTail } = require("./src/lib.js");

const main = function() {
  let parsedInputs = parseInputs(process.argv.slice(2));
  let result = organizeTail(fs, parsedInputs);
  console.log(result);
};

main();
