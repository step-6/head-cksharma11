const { deepEqual } = require("assert");
const { validateHeadInputs, validateTailInputs } = require("../src/errorCheck.js");

describe("validateHeadInputs", function() {
  it("should return (isValid: true) when input is valid", function() {
    const expectedOut = { isValid: true, errorMessage: "" };
    deepEqual(
      validateHeadInputs({ option: "-n", value: 10, fileNames: ["file"] }),
      expectedOut
    );
  });

  it("should return error message when value is 0 and option is -n", function() {
    const expectedOut = {
      isValid: false, 
      errorMessage: "head: illegal line count -- 0"
    };
    deepEqual(
      validateHeadInputs({ option: "-n", value: 0, fileNames: ["file"] }),
      expectedOut
    );
  });

  it("should return error message when value is 0 and option is -c", function() {
    const expectedOut = {
      isValid: false,
      errorMessage: "head: illegal byte count -- 0"
    };
    deepEqual(
      validateHeadInputs({ option: "-c", value: 0, fileNames: ["file"] }),
      expectedOut
    );
  });

  it("should return error message when number of files is 0", function() {
    const expectedOut = {
      isValid: false,
      errorMessage:
        "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]"
    };
    deepEqual(
      validateHeadInputs({ option: "-c", value: 10, fileNames: [] }),
      expectedOut
    );
  });

  it("should return error message for invalid option", function() {
    const expectedOut = {
      isValid: false,
      errorMessage:
        "head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]"
    };
    deepEqual(
      validateHeadInputs({ option: "-v", value: 10, fileNames: [] }),
      expectedOut
    );
  });
});

describe("validateTailInputs", function(){
  it("should return error message for invalid option", function(){
    const expectedOut = {
      isValid: false,
      errorMessage:
      "tail: illegal option -- -v\n"+
      "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };

    deepEqual(validateTailInputs({ option: "-v", value: 10, fileNames: [] }), expectedOut );
  });

  it("should return error message for invalid count", function(){
    const expectedOut = {
      isValid: false,
      errorMessage: "tail: illegal offset -- a" 
    };
    
    deepEqual(validateTailInputs({ option: "-n", value: 'a', fileNames: [] }), expectedOut );
  });
});