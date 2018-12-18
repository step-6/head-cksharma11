const readFileSync = function(fileName) {
  let fileContents = {
    names: "A\nB\nC\nD\nE",
    numbers: "1\n2\n3\n4\n5"
  };
  return fileContents[fileName];
};

const existsSync = function(fileName) {
  let fileNames = ["names", "numbers"];
  return fileNames.includes(fileName);
};

const fs = { readFileSync, existsSync };

module.exports = { fs };
