const assert = require("assert");
const {
  validateHeadInputs,
  validateTailInputs
} = require("../src/inputValidation.js");

describe("validateHeadInputs", function() {
  it("should return (isValid: true) when input is valid", function() {
    const expectedOutput = { isValid: true, errorMessage: "" };
    const actualOutput = validateHeadInputs({
      option: "-n",
      value: 10,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when value is 0 and option is -n", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage: "head: illegal line count -- 0"
    };
    const actualOutput = validateHeadInputs({
      option: "-n",
      value: 0,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when value is 0 and option is -c", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage: "head: illegal byte count -- 0"
    };
    const actualOutput = validateHeadInputs({
      option: "-c",
      value: 0,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when number of files is 0", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]"
    };
    const actualOutput = validateHeadInputs({
      option: "-c",
      value: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for invalid option", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]"
    };
    const actualOutput = validateHeadInputs({
      option: "-v",
      value: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("validateTailInputs", function() {
  it("should return error message for invalid option", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "tail: illegal option -- -v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
    const actualOutput = validateTailInputs({
      option: "-v",
      value: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for invalid count", function() {
    const expectedOutput = {
      isValid: false,
      errorMessage: "tail: illegal offset -- a"
    };
    const actualOutput = validateTailInputs({
      option: "-n",
      value: "a",
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
