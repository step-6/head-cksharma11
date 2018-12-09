const { equal, deepEqual } = require("assert");
const { parseInputs } = require("../src/headIO.js");

describe("parseInputs", function() {
  it("should categorize head inptes and return object with option as -n", function() {
    const userArgs = ["-n5", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-n",
      value: 5,
      fileNames: ["file1"]
    });
  });

  it("should categorize head inptes and return object with option as -c", function() {
    const userArgs = ["-c5", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-c",
      value: 5,
      fileNames: ["file1"]
    });
  });

  it("should return default values", function() {
    const userArgs = ["file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-n",
      value: 10,
      fileNames: ["file1"]
    });
  });

  it("should categorize head inptes without passing option i.e. -11", function() {
    const userArgs = ["-11", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-n",
      value: 11,
      fileNames: ["file1"]
    });
  });

  it("should categorize head inptes with case -n 5", function() {
    const userArgs = ["-n", "5", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-n",
      value: 5,
      fileNames: ["file1"]
    });
  });

  it("should categorize head inptes and return object with invalid option", function() {
    const userArgs = ["-v5", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-v",
      value: 5,
      fileNames: ["file1"]
    });
  });

  it("should categorize head inptes and return object with string as value", function() {
    const userArgs = ["-n", "five", "file1"];
    deepEqual(parseInputs(userArgs), {
      option: "-n",
      value: "five",
      fileNames: ["file1"]
    });
  });
});
