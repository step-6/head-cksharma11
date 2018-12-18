const assert = require("assert");
const { fs } = require("./testHelpers.js");
const { organizeResult, addHeader } = require("../src/format.js");

describe("addHeader", () => {
  it("should add header with passed contents", () => {
    const content = "ABCD";
    const fileName = "Test.js";
    const expectedOutput = "==> Test.js <==\nABCD";
    const actualOutput = addHeader(fileName, content);

    assert.equal(actualOutput, expectedOutput);
  });
});

describe("organizeResult", () => {
  describe("organizeResult with head as command ", () => {
    it("should return list of names when file name is names", () => {
      const expectedOutput = "A\nB";
      const actualOutput = organizeResult(
        fs,
        { option: "-n", count: 2, fileNames: ["names"] },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return list of numbers when file name is numbers", () => {
      const expectedOutput = "1\n2";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return list of numbers and names when both files passed", () => {
      const expectedOutput = "==> names <==\nA\nB\n\n==> numbers <==\n1\n2";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["names", "numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error when option count is 0", () => {
      const expectedOutput = "head: illegal line count -- 0";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 0,
          fileNames: ["numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error when option negative count passed", () => {
      const expectedOutput = "head: illegal line count -- -1";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: -1,
          fileNames: ["numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error when length of fileNames is 0", () => {
      const expectedOutput =
        "head: option requires an argument -- n\n" +
        "usage: head [-n lines | -c bytes] [file ...]";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 1,
          fileNames: []
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return n number of lines when single file is passed", () => {
      const expectedOutput = "1\n2";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });
  });

  describe("organizeResult with tail as command", () => {
    it("should return list of names when file name is names", () => {
      const expectedOutput = "D\nE";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["names"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return list of numbers when file name is numbers", () => {
      const expectedOutput = "4\n5";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["numbers"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return list of numbers and names when both files passed", () => {
      const expectedOutput = "==> names <==\nD\nE\n\n==> numbers <==\n4\n5";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["names", "numbers"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return file not found log when file not found", () => {
      const expectedOutput = "tail: abc: No such file or directory";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 2,
          fileNames: ["abc"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error message when invalid argument passed", () => {
      const expectedOutput =
        "tail: illegal option -- -v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-v",
          count: 2,
          fileNames: ["abc"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return empty string for count 0", () => {
      const expectedOutput = "";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          count: 0,
          fileNames: ["names"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });
  });
});
