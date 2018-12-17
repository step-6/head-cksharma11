const assert = require("assert");
const {
  getLinesFromHead,
  getCharsFromHead,
  addHeader,
  fileNotFoundLog,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  organizeResult,
  runCommand
} = require("../src/lib.js");

describe("getLinesFromHead", () => {
  const fileContents = [
    "This is test file",
    "This is line 2",
    "This is line 3",
    "This is line 4",
    "This is line 5",
    "This is line 6",
    "This is line 7",
    "This is line 8",
    "This is line 9",
    "This is line 10",
    "This is line 11",
    "This is line 12\n"
  ].join("\n");

  it("should return empty string with input 0", () => {
    assert.equal(getLinesFromHead(fileContents, 0), "");
  });

  it("should return 1 line with input 1", () => {
    assert.equal(getLinesFromHead(fileContents, 1), "This is test file");
  });

  it("should return 10 line as default", () => {
    const expectedOutput = [
      "This is test file",
      "This is line 2",
      "This is line 3",
      "This is line 4",
      "This is line 5",
      "This is line 6",
      "This is line 7",
      "This is line 8",
      "This is line 9",
      "This is line 10"
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

describe("addHeader", () => {
  it("should add header with passed contents", () => {
    const content = "This is sample file";
    const fileName = "Test.js";
    const expectedOutput = "==> Test.js <==\nThis is sample file";
    const actualOutput = addHeader(fileName, content);

    assert.equal(actualOutput, expectedOutput);
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

describe("organizeResult", () => {
  describe("organizeResult with head as command ", () => {
    it("should return list of names when file name is names", () => {
      const expectedOutput = "A\nB";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          value: 2,
          fileNames: ["names"]
        },
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
          value: 2,
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
          value: 2,
          fileNames: ["names", "numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error when option value is 0", () => {
      const expectedOutput = "head: illegal line count -- 0";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          value: 0,
          fileNames: ["numbers"]
        },
        "head"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return error when option negative value passed", () => {
      const expectedOutput = "head: illegal line count -- -1";
      const actualOutput = organizeResult(
        fs,
        {
          option: "-n",
          value: -1,
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
          value: 1,
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
          value: 2,
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
          value: 2,
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
          value: 2,
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
          value: 2,
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
          value: 2,
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
          value: 2,
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
          value: 0,
          fileNames: ["names"]
        },
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });
  });
});

describe("getFileContents", () => {
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
  describe("run command with tail as command", () => {
    it("should return default 10 lines for single file", () => {
      const file = [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5",
        "Line 6",
        "Line 7",
        "Line 8",
        "Line 9",
        "Line 10"
      ].join("\n");
      const actualOutput = runCommand(
        [file],
        10,
        ["file"],
        getLinesFromTail,
        "tail"
      );

      assert.deepEqual(actualOutput, [file]);
    });

    it("should return number of input lines from tail with 2 files", () => {
      const file1 = [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5",
        "Line 6",
        "Line 7",
        "Line 8",
        "Line 9",
        "Line 10"
      ].join("\n");
      const file2 = [
        "File2 line 1",
        "File2 line 2",
        "File2 line 3",
        "File2 line 4",
        "File2 line 5",
        "File2 line 6"
      ].join("\n");

      const expectedOutput = [
        "==> file1 <==\nLine 8\nLine 9\nLine 10",
        "==> file2 <==\nFile2 line 4\nFile2 line 5\nFile2 line 6"
      ];

      const actualOutput = runCommand(
        [file1, file2],
        3,
        ["file1", "file2"],
        getLinesFromTail,
        "tail"
      );

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return empty when no files passed", () => {
      const actualOutput = runCommand([], 1, [], getLinesFromTail, "tail");
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = "tail: nullFile: No such file or directory";
      const actualOutput = runCommand(
        [nullFile],
        1,
        ["nullFile"],
        getLinesFromTail,
        "tail"
      );

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return file not found log when one file exists", () => {
      const nullFile = null;
      const fileWithContent = "File with content";
      const expectedOutput = [
        "tail: nullFile: No such file or directory",
        "==> fileWithContent <==\nFile with content"
      ];

      const actualOutput = runCommand(
        [nullFile, fileWithContent],
        1,
        ["nullFile", "fileWithContent"],
        getLinesFromTail,
        "tail"
      );

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("runCommand with head as command", () => {
    it("should return default 10 lines for single file", () => {
      const file = [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5",
        "Line 6",
        "Line 7",
        "Line 8",
        "Line 9",
        "Line 10"
      ].join("\n");

      assert.deepEqual(
        runCommand([file], 10, ["file"], getLinesFromHead, "head"),
        [file]
      );
    });

    it("should return number of input lines with 2 files", () => {
      const file1 = [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5",
        "Line 6",
        "Line 7",
        "Line 8",
        "Line 9",
        "Line 10"
      ].join("\n");
      const file2 = [
        "File2 line 1",
        "File2 line 2",
        "File2 line 3",
        "File2 line 4",
        "File2 line 5",
        "File2 line 6"
      ].join("\n");

      const expectedOutput = [
        `==> file1 <==
Line 1
Line 2
Line 3`,
        `==> file2 <==
File2 line 1
File2 line 2
File2 line 3`
      ];

      const actualOutput = runCommand(
        [file1, file2],
        3,
        ["file1", "file2"],
        getLinesFromHead,
        "head"
      );
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return empty when no files passed", () => {
      const actualOutput = runCommand([], 1, [], getLinesFromHead, "head");
      assert.equal(actualOutput, "");
    });

    it("should return file not found log for single null file", () => {
      const nullFile = null;
      const expectedOutput = "head: nullFile: No such file or directory";
      const actualOutput = runCommand(
        [nullFile],
        1,
        ["nullFile"],
        getLinesFromHead,
        "head"
      );
      assert.equal(actualOutput, expectedOutput);
    });

    it("should return file not found log when one file exists", () => {
      const nullFile = null;
      const fileWithContent = "File with content";
      const expectedOutput = [
        "head: nullFile: No such file or directory",
        "==> fileWithContent <==\nFile with content"
      ];
      const actualOutput = runCommand(
        [nullFile, fileWithContent],
        1,
        ["nullFile", "fileWithContent"],
        getLinesFromHead,
        "head"
      );

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
