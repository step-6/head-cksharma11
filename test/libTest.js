const assert = require("assert");
const { mockReader, mockValidator } = require("./testHelpers.js");
const {
  getLinesFromHead,
  getCharsFromHead,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  runCommand
} = require("../src/lib.js");

describe("getLinesFromHead", () => {
  const fileContents = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
  ].join("\n");

  it("should return empty string with input 0", () => {
    assert.equal(getLinesFromHead(fileContents, 0), "");
  });

  it("should return 1 line with input 1", () => {
    assert.equal(getLinesFromHead(fileContents, 1), "1");
  });

  it("should return 10 line as default", () => {
    const expectedOutput = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
    ].join("\n");

    assert.equal(getLinesFromHead(fileContents), expectedOutput);
  });
});

describe("getCharsFromHead", () => {
  const fileContents = "This is a test file.";

  it("should return empty string with n = 0", () => {
    assert.equal(getCharsFromHead(fileContents, 0), "");
  });

  it("should return first 5 characters of contents with n = 5", () => {
    assert.equal(getCharsFromHead(fileContents, 5), "This ");
  });
});

describe("fileNotFoundLog", () => {
  it("should return log when file not found (head)", () => {
    const fileName = "Test";
    const expectedOutput = "head: " + fileName + ": No such file or directory";
    const actualOutput = fileNotFoundLog(fileName, "head");

    assert.equal(actualOutput, expectedOutput);
  });

  it("should return log when file not found (tail)", () => {
    const fileName = "Test";
    const expectedOutput = "tail: " + fileName + ": No such file or directory";
    const actualOutput = fileNotFoundLog(fileName, "tail");

    assert.equal(actualOutput, expectedOutput);
  });
});

describe("getFileContents", () => {
  const fs = {};
  fs["readFileSync"] = mockReader({
    names: "A\nB\nC\nD\nE",
    numbers: "1\n2\n3\n4\n5"
  });
  fs["existsSync"] = mockValidator({
    names: "A\nB\nC\nD\nE",
    numbers: "1\n2\n3\n4\n5"
  });

  it("should return null when file not found", () => {
    const expectedOutput = [null];
    const actualOutput = getFileContents(fs, ["badFile"]);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return contents of one file", () => {
    const expectedOutput = [[1, 2, 3, 4, 5].join("\n")];
    const actualOutput = getFileContents(fs, ["numbers"]);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return contents of two files", () => {
    const expectedOutput = ["1\n2\n3\n4\n5", "A\nB\nC\nD\nE"];
    const actualOutput = getFileContents(fs, ["numbers", "names"]);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getLinesFromTail", () => {
  it("should return last line of content for 1 input", () => {
    const testFile = ["A", "B", "C", "D"].join("\n");
    const actualOutput = getLinesFromTail(testFile, 1);

    assert.equal(actualOutput, "D");
  });

  it("should retrun last two line of content for 2 input", () => {
    const testFile = ["A", "B", "C", "D"].join("\n");
    const actualOutput = getLinesFromTail(testFile, 2);

    assert.equal(actualOutput, "C\nD");
  });

  it("should return back file with input 0", () => {
    const testFile = ["A", "B", "C", "D"].join("\n");
    const actualOutput = getLinesFromTail(testFile, 0);

    assert.equal(actualOutput, testFile);
  });
});

describe("getCharsFromTail", () => {
  it("should return last character of when input is 1", () => {
    const testFile = "abcd";
    const actualOutput = getCharsFromTail(testFile, 1);

    assert.equal(actualOutput, "d");
  });

  it("should last 2 characters when input is 2", () => {
    const testFile = "1234\n5678";
    const actualOutput = getCharsFromTail(testFile, 2);

    assert.equal(actualOutput, "78");
  });

  it("should return back file with input 0", () => {
    const testFile = "abcd";
    const actualOutput = getCharsFromTail(testFile, 0);

    assert.equal(actualOutput, testFile);
  });
});

describe("runCommand", () => {
  describe("run command with tail as operation", () => {
    it("should return default 10 lines for single file", () => {
      const file = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const expectedOutput = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ].join("\n");
      const actualOutput = runCommand([file], 10, getLinesFromTail);

      assert.deepEqual(actualOutput, [expectedOutput]);
    });

    it("should return number of input lines from tail with 2 files", () => {
      const file1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const file2 = ["A", "B", "C", "D", "E", "F"].join("\n");

      const expectedOutput = ["8\n9\n10", "D\nE\nF"];

      const actualOutput = runCommand([file1, file2], 3, getLinesFromTail);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return empty when no files passed", () => {
      const actualOutput = runCommand([], 1, getLinesFromTail);
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = [null];
      const actualOutput = runCommand([nullFile], 1, getLinesFromTail);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file not found log when one file exists", () => {
      const nullFile = null;
      const fileWithContent = "File with content";
      const expectedOutput = [null, "File with content"];

      const actualOutput = runCommand(
        [nullFile, fileWithContent],
        1,
        getLinesFromTail
      );

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("runCommand with head as operation", () => {
    it("should return default 10 lines for single file", () => {
      const file = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const expectedOutput = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ].join("\n");

      assert.deepEqual(runCommand([file], 10, getLinesFromHead), [
        expectedOutput
      ]);
    });

    it("should return number of input lines with 2 files", () => {
      const file1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const file2 = ["A", "B", "C", "D", "E", "F"].join("\n");

      const expectedOutput = [`1\n2\n3`, `A\nB\nC`];

      const actualOutput = runCommand([file1, file2], 3, getLinesFromHead);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return empty when no files passed", () => {
      const actualOutput = runCommand([], 1, [], getLinesFromHead, "head");
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = [null];
      const actualOutput = runCommand([nullFile], 1, getLinesFromHead);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file not found log when one file exists", () => {
      const nullFile = null;
      const fileWithContent = "File with content";
      const expectedOutput = [null, "File with content"];
      const actualOutput = runCommand(
        [nullFile, fileWithContent],
        1,
        getLinesFromHead
      );

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
