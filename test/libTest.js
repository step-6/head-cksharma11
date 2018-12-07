const { equal, deepEqual } = require('assert');
const {
  getLinesFromHead,
  getCharsFromHead,
  readFile,
  head,
  addHeader,
  fileNotFoundLog,
  organizeHead,
  getFileContents
} = require('../src/lib.js');

describe('getLinesFromHead', function(){
  let fileContents = "This is test file\n";
  fileContents += "This is line 2\n"
  fileContents += "This is line 3\n"
  fileContents += "This is line 4\n"
  fileContents += "This is line 5\n"
  fileContents += "This is line 6\n"
  fileContents += "This is line 7\n"
  fileContents += "This is line 8\n"
  fileContents += "This is line 9\n"
  fileContents += "This is line 10\n"
  fileContents += "This is line 11\n"
  fileContents += "This is line 12\n"

  it('should return empty string with input 0', function(){
    equal(getLinesFromHead(fileContents, 0), '');
  });

  it('should return 1 line with input 1', function(){
    equal(getLinesFromHead(fileContents, 1), "This is test file")
  });

  it('should return 10 line as default', function(){
    let expectedOut = "This is test file\n";
    expectedOut += "This is line 2\n"
    expectedOut += "This is line 3\n"
    expectedOut += "This is line 4\n"
    expectedOut += "This is line 5\n"
    expectedOut += "This is line 6\n"
    expectedOut += "This is line 7\n"
    expectedOut += "This is line 8\n"
    expectedOut += "This is line 9\n"
    expectedOut += "This is line 10"

    equal(getLinesFromHead(fileContents), expectedOut);
  });
});

describe('getCharsFromHead', function(){
  const fileContents = "This is a test file.";

  it('should return empty string with n = 0', function(){
    equal(getCharsFromHead(fileContents, 0), '');
  });

  it('should return first 5 characters of contents with n = 5', function(){
    equal(getCharsFromHead(fileContents, 5), 'This ');
  });
});

describe('readFile', function(){
  const add = (a, b) => a+b;
  it('should call given function with arg1 and arg2', function(){
    equal(readFile(add, 5, 5), 10);
  });
});

describe('head', function(){
  it('should return default 10 lines for single file', function(){
    const file =  "Line 1\n"+
                "Line 2\n"+
                "Line 3\n"+
                "Line 4\n"+
                "Line 5\n"+
                "Line 6\n"+
                "Line 7\n"+
                "Line 8\n"+
                "Line 9\n"+
                "Line 10";
    deepEqual(head([file], '-n', 10, ['file']), [file]);
  });

  it('should return number of input lines with 2 files', function(){
    const file1 = "Line 1\n"+
                "Line 2\n"+
                "Line 3\n"+
                "Line 4\n"+
                "Line 5\n"+
                "Line 6\n"+
                "Line 7\n"+
                "Line 8\n"+
                "Line 9\n"+
                "Line 10";
    const file2 = "File2 line 1\n"+
                "File2 line 2\n"+
                "File2 line 3\n"+
                "File2 line 4\n"+
                "File2 line 5\n"+
                "File2 line 6";

    const expectedOut = ['==> file1 <==\nLine 1\nLine 2\nLine 3',
                       '==> file2 <==\nFile2 line 1\nFile2 line 2\nFile2 line 3'];    
      
    deepEqual(head([file1, file2], '-n', 3, ['file1', 'file2']), expectedOut);
  });

  it('should return empty when no files passed', function(){
    equal(head([], '-n', 1, []), '');  
  });

  it('should return file not found log for single null file', function(){
    const nullFile = null;
    const expectedOut = 'head: nullFile: No such file or directory'; 
    equal(head([nullFile], '-n', 1, ['nullFile']), expectedOut);
  });

  it('should return file not found log when one file exists', function(){
    const nullFile = null;
    const fileWithContent = 'File with content';
    const expectedOut = [ 'head: nullFile: No such file or directory', 
                        '==> fileWithContent <==\nFile with content' ]; 
    deepEqual(head([nullFile, fileWithContent], '-n', 1, ['nullFile', 'fileWithContent']), expectedOut);
  });

});

describe('addHeader', function(){
  it('should add header with passed contents', function(){
    const content = "This is sample file";
    const fileName = "Test.js"
    const expectedOut = "==> Test.js <==\nThis is sample file";
    
    equal(addHeader(fileName, content), expectedOut);
  });
});

describe('fileNotFoundLog', function(){
  it('should return log when file not found', function(){
    const fileName = "Test";
    const expectedOut = 'head: '+fileName+': No such file or directory';

    equal(fileNotFoundLog(fileName), expectedOut);
  });
});

describe('organizeHead', function(){
  const identity = (x) => x;
  const exists = (x) => true;
  const testFile = "Line 1\n"+
                 "Line 2\n"+
                 "Line 3";
  const testWithTwoElement ="Line One\n"+
                 "Line Two\n"+
                 "Line Three";
  it('should return error when option value is 0', function(){
    const expectedOut = 'head: illegal line count -- 0' 
    equal(organizeHead(identity, exists, {option:'-n', value:0, fileNames: ['file1']}), expectedOut);
  });
  
  it('should return error when option negative value passed', function(){
    const expectedOut = 'head: illegal line count -- -1' 
    equal(organizeHead(identity, exists, {option:'-n', value:-1, fileNames: ['file1']}), expectedOut);
  });
  
  it('should return error when length of fileNames is 0', function(){
    const expectedOut = 'head: option requires an argument -- n\n'+
                      'usage: head [-n lines | -c bytes] [file ...]' 
    equal(organizeHead(identity, exists, {option:'-n', value:1, fileNames: []}), expectedOut);
  });

  it('should return n number of lines when single file is passed', function(){
    const expectedOut = "Line 1\n"+
                      "Line 2";
    
    equal(organizeHead(identity, exists, {option:'-n', value:2, fileNames:[testFile]}), expectedOut);
  });
});

describe('getFileContents', function(){
  const identity = (x) => x;
  const exists = (x) => true;
  const notExists = (x) => false;

  const testWithSingleInput = [ 'Line 1' ];
  const testFile = [ 'Line 1\n', 'Line 2\n', 'Line 3' ];
  const testWithTwoElement = [ ['Line 1\n', 'Line 2\n', 'Line 3'],['Line One\n', 'Line Two\n', 'Line Three'] ];

  it('should return null when file not found', function(){
    const expectedOut = [null]; 
    deepEqual(getFileContents(identity, notExists, testWithSingleInput), expectedOut);
  });
  
  it('should return contents of one file', function(){
    const expectedOut = testFile;
    deepEqual(getFileContents(identity, exists, testFile), expectedOut);
  });
  
  it('should return contents of two files', function(){
    const expectedOut = testWithTwoElement; 
    deepEqual(getFileContents(identity, exists, testWithTwoElement), expectedOut);
  });
});
