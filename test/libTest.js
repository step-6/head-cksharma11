const assert = require("assert");
const { mockReader, mockValidator } = require("./testHelpers.js");
const {
  getLinesFromHead,
  getCharsFromHead,
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

  it("should return empty string with count 0", () => {
    assert.equal(getLinesFromHead(fileContents, 0), "");
  });

  it("should return 1 line with count 1", () => {
    assert.equal(getLinesFromHead(fileContents, 1), "1");
  });

  it("should return 10 lines by default", () => {
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

  it("should return empty string with count = 0", () => {
    assert.equal(getCharsFromHead(fileContents, 0), "");
  });

  it("should return first 5 characters of contents with count = 5", () => {
    assert.equal(getCharsFromHead(fileContents, 5), "This ");
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

  it("should return contents of one file when single file is provided", () => {
    const expectedOutput = [[1, 2, 3, 4, 5].join("\n")];
    const actualOutput = getFileContents(fs, ["numbers"]);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return contents of multiple files", () => {
    const expectedOutput = ["1\n2\n3\n4\n5", "A\nB\nC\nD\nE"];
    const actualOutput = getFileContents(fs, ["numbers", "names"]);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getLinesFromTail", () => {
  it("should return last line of content for count 1", () => {
    const testFile = ["A", "B", "C", "D"].join("\n");
    const actualOutput = getLinesFromTail(testFile, 1);

    assert.equal(actualOutput, "D");
  });

  it("should retrun last two line of content for count 2", () => {
    const testFile = ["A", "B", "C", "D"].join("\n");
    const actualOutput = getLinesFromTail(testFile, 2);

    assert.equal(actualOutput, "C\nD");
  });
});

describe("getCharsFromTail", () => {
  it("should return last character for count 1", () => {
    const testFile = "abcd";
    const actualOutput = getCharsFromTail(testFile, 1);

    assert.equal(actualOutput, "d");
  });

  it("should last 2 characters for count 2", () => {
    const testFile = "1234\n5678";
    const actualOutput = getCharsFromTail(testFile, 2);

    assert.equal(actualOutput, "78");
  });
});

describe("runCommand", () => {
  describe("run command with tail as operation", () => {
    it("should return 10 lines by default", () => {
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

    it("should return N number of lines for multiple files", () => {
      const file1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const file2 = ["A", "B", "C", "D", "E", "F"].join("\n");
      const expectedOutput = ["8\n9\n10", "D\nE\nF"];
      const actualOutput = runCommand([file1, file2], 3, getLinesFromTail);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return empty string when no files is provided", () => {
      const actualOutput = runCommand([], 1, getLinesFromTail);
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = [null];
      const actualOutput = runCommand([nullFile], 1, getLinesFromTail);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file not found log for multiple files", () => {
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
    it("should return 10 lines by default", () => {
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

    it("should return N number of lines for multiple files", () => {
      const file1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].join(
        "\n"
      );
      const file2 = ["A", "B", "C", "D", "E", "F"].join("\n");
      const expectedOutput = [`1\n2\n3`, `A\nB\nC`];
      const actualOutput = runCommand([file1, file2], 3, getLinesFromHead);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return string when no files provided", () => {
      const actualOutput = runCommand([], 1, [], getLinesFromHead, "head");
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = [null];
      const actualOutput = runCommand([nullFile], 1, getLinesFromHead);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return file not found log for multiple files", () => {
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
