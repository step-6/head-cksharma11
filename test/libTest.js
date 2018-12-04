const { equal, deepEqual } = require('assert');
const {
  getNLines
} = require('../src/lib.js');

describe('getNLines', function(){
  let fileContents = "This is test file\n";
  fileContents += "This is line 2\n"
  fileContents += "This is line 3\n"
  fileContents += "This is line 4\n"
  fileContents += "This is line 5\n"
  fileContents += "This is line 6\n"
  fileContents += "This is line 7\n"
  fileContents += "This is line 8\n"
  fileContents += "This is line 9\n"
  fileContents += "This is line 10\n"
  fileContents += "This is line 11\n"
  fileContents += "This is line 12\n"

  it('should return empty line with input 0', function(){
    equal(getNLines(fileContents, 0), '');
  });

  it('should return 1 line with input 1', function(){
    equal(getNLines(fileContents, 1), "This is test file")
  });

  it('should return 10 line as default', function(){
    let expectedOut = "This is test file\n";
    expectedOut += "This is line 2\n"
    expectedOut += "This is line 3\n"
    expectedOut += "This is line 4\n"
    expectedOut += "This is line 5\n"
    expectedOut += "This is line 6\n"
    expectedOut += "This is line 7\n"
    expectedOut += "This is line 8\n"
    expectedOut += "This is line 9\n"
    expectedOut += "This is line 10"

    equal(getNLines(fileContents), expectedOut);
  });
});
