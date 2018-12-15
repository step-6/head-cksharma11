const { equal, deepEqual } = require("assert");
const {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  tail,
  addHeader,
  fileNotFoundLog,
  organizeHead,
  getFileContents,
  getLinesFromTail,
  getCharsFromTail,
  organizeTail
} = require("../src/lib.js");

describe("getLinesFromHead", function() {
  let fileContents = "This is test file\n";
  fileContents += "This is line 2\n";
  fileContents += "This is line 3\n";
  fileContents += "This is line 4\n";
  fileContents += "This is line 5\n";
  fileContents += "This is line 6\n";
  fileContents += "This is line 7\n";
  fileContents += "This is line 8\n";
  fileContents += "This is line 9\n";
  fileContents += "This is line 10\n";
  fileContents += "This is line 11\n";
  fileContents += "This is line 12\n";

  it("should return empty string with input 0", function() {
    equal(getLinesFromHead(fileContents, 0), "");
  });

  it("should return 1 line with input 1", function() {
    equal(getLinesFromHead(fileContents, 1), "This is test file");
  });

  it("should return 10 line as default", function() {
    let expectedOutput = "This is test file\n";
    expectedOutput += "This is line 2\n";
    expectedOutput += "This is line 3\n";
    expectedOutput += "This is line 4\n";
    expectedOutput += "This is line 5\n";
    expectedOutput += "This is line 6\n";
    expectedOutput += "This is line 7\n";
    expectedOutput += "This is line 8\n";
    expectedOutput += "This is line 9\n";
    expectedOutput += "This is line 10";

    equal(getLinesFromHead(fileContents), expectedOutput);
  });
});

describe("getCharsFromHead", function() {
  const fileContents = "This is a test file.";

  it("should return empty string with n = 0", function() {
    equal(getCharsFromHead(fileContents, 0), "");
  });

  it("should return first 5 characters of contents with n = 5", function() {
    equal(getCharsFromHead(fileContents, 5), "This ");
  });
});

describe("readFile", function() {
  const add = (a, b) => a + b;
  it("should call given function with arg1 and arg2", function() {
    equal(readFile(add, 5, 5), 10);
  });
});

describe("head", function() {
  it("should return default 10 lines for single file", function() {
    const file =
      "Line 1\n" +
      "Line 2\n" +
      "Line 3\n" +
      "Line 4\n" +
      "Line 5\n" +
      "Line 6\n" +
      "Line 7\n" +
      "Line 8\n" +
      "Line 9\n" +
      "Line 10";
    deepEqual(head([file], "-n", 10, ["file"]), [file]);
  });

  it("should return number of input lines with 2 files", function() {
    const file1 =
      "Line 1\n" +
      "Line 2\n" +
      "Line 3\n" +
      "Line 4\n" +
      "Line 5\n" +
      "Line 6\n" +
      "Line 7\n" +
      "Line 8\n" +
      "Line 9\n" +
      "Line 10";
    const file2 =
      "File2 line 1\n" +
      "File2 line 2\n" +
      "File2 line 3\n" +
      "File2 line 4\n" +
      "File2 line 5\n" +
      "File2 line 6";

    const expectedOutput = [
      "==> file1 <==\nLine 1\nLine 2\nLine 3",
      "==> file2 <==\nFile2 line 1\nFile2 line 2\nFile2 line 3"
    ];

    deepEqual(head([file1, file2], "-n", 3, ["file1", "file2"]), expectedOutput);
  });

  it("should return empty when no files passed", function() {
    equal(head([], "-n", 1, []), "");
  });

  it("should return file not found log for single null file", function() {
    const nullFile = null;
    const expectedOutput = "head: nullFile: No such file or directory";
    equal(head([nullFile], "-n", 1, ["nullFile"]), expectedOutput);
  });

  it("should return file not found log when one file exists", function() {
    const nullFile = null;
    const fileWithContent = "File with content";
    const expectedOutput = [
      "head: nullFile: No such file or directory",
      "==> fileWithContent <==\nFile with content"
    ];
    deepEqual(
      head([nullFile, fileWithContent], "-n", 1, [
        "nullFile",
        "fileWithContent"
      ]),
      expectedOutput
    );
  });
});

describe("addHeader", function() {
  it("should add header with passed contents", function() {
    const content = "This is sample file";
    const fileName = "Test.js";
    const expectedOutput = "==> Test.js <==\nThis is sample file";

    equal(addHeader(fileName, content), expectedOutput);
  });
});

describe("fileNotFoundLog", function() {
  it("should return log when file not found (head)", function() {
    const fileName = "Test";
    const expectedOutput = "head: " + fileName + ": No such file or directory";

    equal(fileNotFoundLog(fileName, 'head'), expectedOutput);
  });

  it("should return log when file not found (tail)", function() {
    const fileName = "Test";
    const expectedOutput = "tail: " + fileName + ": No such file or directory";

    equal(fileNotFoundLog(fileName, 'tail'), expectedOutput);
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

describe("organizeHead", function() {
  const identity = x => x;
  const exists = x => true;
  const testFile = "Line 1\n" + "Line 2\n" + "Line 3";
  
  it('should return list of names when file name is names', function(){
    let expectedOutput = "A\nB";
    equal(organizeHead(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['names']}), expectedOutput);
  });
  
  it('should return list of numbers when file name is numbers', function(){
    let expectedOutput = "1\n2";
    equal(organizeHead(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['numbers']}), expectedOutput);
  });
  
  it('should return list of numbers and names when both files passed', function(){
    let expectedOutput = "==> names <==\nA\nB\n\n==> numbers <==\n1\n2";
    equal(organizeHead(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['names', 'numbers']}), expectedOutput);
  });
  
  it("should return error when option value is 0", function() {
    const expectedOutput = "head: illegal line count -- 0";
    equal(
      organizeHead(identity, exists, {
        option: "-n",
        value: 0,
        fileNames: ["file1"]
      }),
      expectedOutput
    );
  });

  it("should return error when option negative value passed", function() {
    const expectedOutput = "head: illegal line count -- -1";
    equal(
      organizeHead(identity, exists, {
        option: "-n",
        value: -1,
        fileNames: ["file1"]
      }),
      expectedOutput
    );
  });

  it("should return error when length of fileNames is 0", function() {
    const expectedOutput =
      "head: option requires an argument -- n\n" +
      "usage: head [-n lines | -c bytes] [file ...]";
    equal(
      organizeHead(identity, exists, { option: "-n", value: 1, fileNames: [] }),
      expectedOutput
    );
  });

  it("should return n number of lines when single file is passed", function() {
    const expectedOutput = "Line 1\n" + "Line 2";

    equal(
      organizeHead(identity, exists, {
        option: "-n",
        value: 2,
        fileNames: [testFile]
      }),
      expectedOutput
    );
  });
});

describe("getFileContents", function() {
  const testFile = ["Line 1\n", "Line 2\n", "Line 3"];
  const testWithTwoElement = [
    ["Line 1\n", "Line 2\n", "Line 3"],
    ["Line One\n", "Line Two\n", "Line Three"]
  ];

  it("should return null when file not found", function() {
    const expectedOutput = [null];
    deepEqual(
      getFileContents(readFileSync, existsSync, ['badFile']),
      expectedOutput
    );
  });

  it("should return contents of one file", function() {
    const expectedOutput = [[1, 2, 3, 4, 5].join('\n')];
    deepEqual(getFileContents(readFileSync, existsSync, ['numbers']), expectedOutput);
  });

  it("should return contents of two files", function() {
    const expectedOutput = [ '1\n2\n3\n4\n5', 'A\nB\nC\nD\nE' ];
    deepEqual(
      getFileContents(readFileSync, existsSync, ['numbers', 'names']),
      expectedOutput
    );
  });
});

describe("getLinesFromTail", function(){
  it("should return last line of content for 1 input", function(){
    let testFile = ['A', 'B', 'C', 'D'].join('\n');
    equal(getLinesFromTail(testFile, 1), 'D');
  });
  
  it("should retrun last two line of content for 2 input", function(){
    let testFile = ['A', 'B', 'C', 'D'].join('\n');
    equal(getLinesFromTail(testFile, 2), 'C\nD');
  });
  
  it("should return back file with input 0", function(){
    let testFile = ['A', 'B', 'C', 'D'].join('\n');
    equal(getLinesFromTail(testFile, 0), testFile);
  });
});

describe("getCharsFromTail", function(){
    it("should return last character of when input is 1", function(){
      let testFile = 'abcd';
      equal(getCharsFromTail(testFile, 1), 'd');
    });

    it("should last 2 characters when input is 2", function(){
      let testFile = '1234\n5678';
      equal(getCharsFromTail(testFile, 2), '78');
    });

    it("should return back file with input 0", function(){
      let testFile = 'abcd';
      equal(getCharsFromTail(testFile, 0), testFile);
    });
});

describe( "organizeTail", function(){
  it('should return list of names when file name is names', function(){
    let expectedOutput = "D\nE";
    equal(organizeTail(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['names']}), expectedOutput);
  });
  
  it('should return list of numbers when file name is numbers', function(){
    let expectedOutput = "4\n5";
    equal(organizeTail(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['numbers']}), expectedOutput);
  });

  it('should return list of numbers and names when both files passed', function(){
    let expectedOutput = "==> names <==\nD\nE\n\n==> numbers <==\n4\n5";
    equal(organizeTail(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['names', 'numbers']}), expectedOutput);
  });

  it("should return file not found log when file not found", function() {
    const expectedOutput = "tail: abc: No such file or directory";
    equal(organizeTail(readFileSync, existsSync, {option: '-n', value: 2, fileNames: ['abc']}), expectedOutput);
  });
  
  it("should return error message when invalid argument passed", function() {
    const expectedOutput = "tail: illegal option -- -v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    equal(organizeTail(readFileSync, existsSync, {option: '-v', value: 2, fileNames: ['abc']}), expectedOutput);
  });

  it("should return empty string for count 0", function() {
    const expectedOutput = "";
    equal(organizeTail(readFileSync, existsSync, {option: '-n', value: 0, fileNames: ['names']}), expectedOutput);
  });
});

describe("tail", function() {
  it("should return default 10 lines for single file", function() {
    const file =
      "Line 1\n" +
      "Line 2\n" +
      "Line 3\n" +
      "Line 4\n" +
      "Line 5\n" +
      "Line 6\n" +
      "Line 7\n" +
      "Line 8\n" +
      "Line 9\n" +
      "Line 10";
    deepEqual(tail([file], "-n", 10, ["file"]), [file]);
  });

  it("should return number of input lines from tail with 2 files", function() {
    const file1 =
      "Line 1\n" +
      "Line 2\n" +
      "Line 3\n" +
      "Line 4\n" +
      "Line 5\n" +
      "Line 6\n" +
      "Line 7\n" +
      "Line 8\n" +
      "Line 9\n" +
      "Line 10";
    const file2 =
      "File2 line 1\n" +
      "File2 line 2\n" +
      "File2 line 3\n" +
      "File2 line 4\n" +
      "File2 line 5\n" +
      "File2 line 6";

    const expectedOutput = [
      "==> file1 <==\nLine 8\nLine 9\nLine 10",
      "==> file2 <==\nFile2 line 4\nFile2 line 5\nFile2 line 6"
    ];

    deepEqual(tail([file1, file2], "-n", 3, ["file1", "file2"]), expectedOutput);
  });

  it("should return empty when no files passed", function() {
    equal(tail([], "-n", 1, []), "");
  });

  it("should return file not found log for single null file", function() {
    const nullFile = null;
    const expectedOutput = "tail: nullFile: No such file or directory";
    equal(tail([nullFile], "-n", 1, ["nullFile"]), expectedOutput);
  });

  it("should return file not found log when one file exists", function() {
    const nullFile = null;
    const fileWithContent = "File with content";
    const expectedOutput = [
      "tail: nullFile: No such file or directory",
      "==> fileWithContent <==\nFile with content"
    ];
    deepEqual(
      tail([nullFile, fileWithContent], "-n", 1, [
        "nullFile",
        "fileWithContent"
      ]),
      expectedOutput
    );
  });
});
