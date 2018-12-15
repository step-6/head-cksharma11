const assert = require("assert");
const { parseInputs } = require("../src/headIO.js");

describe("parseInputs", function() {
  describe("should categorize inputs and return object", function() {
    it("with option as -n", function() {
      const userArgs = ["-n5", "file1"];
      const expectedOutput = {
        option: "-n",
        value: 5,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("with option as -c", function() {
      const userArgs = ["-c5", "file1"];
      const expectedOutput = {
        option: "-c",
        value: 5,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("with default values", function() {
      const userArgs = ["file1"];
      const expectedOutput = {
        option: "-n",
        value: 10,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("without passing option i.e. -11", function() {
      const userArgs = ["-11", "file1"];
      const expectedOutput = {
        option: "-n",
        value: 11,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("with case -n 5", function() {
      const userArgs = ["-n", "5", "file1"];
      const expectedOutput = {
        option: "-n",
        value: 5,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("with invalid option", function() {
      const userArgs = ["-v5", "file1"];
      const expectedOutput = {
        option: "-v",
        value: 5,
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });

    it("with string as value", function() {
      const userArgs = ["-n", "five", "file1"];
      const expectedOutput = {
        option: "-n",
        value: "five",
        fileNames: ["file1"]
      };

      assert.deepEqual(parseInputs(userArgs), expectedOutput);
    });
  });
});
