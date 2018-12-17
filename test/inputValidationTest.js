const assert = require("assert");
const {
  validateHeadInputs,
  validateTailInputs
} = require("../src/inputValidation.js");

describe("validateHeadInputs", () => {
  it("should return (isValid: true) when input is valid", () => {
    const expectedOutput = { isValid: true, errorMessage: "" };
    const actualOutput = validateHeadInputs({
      option: "-n",
      count: 10,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when count is 0 and option is -n", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage: "head: illegal line count -- 0"
    };
    const actualOutput = validateHeadInputs({
      option: "-n",
      count: 0,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when count is 0 and option is -c", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage: "head: illegal byte count -- 0"
    };
    const actualOutput = validateHeadInputs({
      option: "-c",
      count: 0,
      fileNames: ["file"]
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message when number of files is 0", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]"
    };
    const actualOutput = validateHeadInputs({
      option: "-c",
      count: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for invalid option", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]"
    };
    const actualOutput = validateHeadInputs({
      option: "-v",
      count: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("validateTailInputs", () => {
  it("should return error message for invalid option", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage:
        "tail: illegal option -- -v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
    const actualOutput = validateTailInputs({
      option: "-v",
      count: 10,
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for invalid count", () => {
    const expectedOutput = {
      isValid: false,
      errorMessage: "tail: illegal offset -- a"
    };
    const actualOutput = validateTailInputs({
      option: "-n",
      count: "a",
      fileNames: []
    });

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
