const {deepEqual, deeEqual} = require('assert');
const {validateInputs} = require('../src/errorCheck.js');

describe('validateInputs', function(){
  it('should return (isValid: true) when input is valid', function(){
    let expectedOut = { isValid: true, errorMessage: '' };
    deepEqual(validateInputs({option: '-n', value: 10, fileNames: ['file']}), expectedOut);
  });

  it('should return error message when value is 0 and option is -n', function(){
    let expectedOut = { isValid: false,
      errorMessage: 'head: illegal line count -- 0' };
    deepEqual(validateInputs({option: '-n', value: 0, fileNames: ['file']}), expectedOut);
  });

  it('should return error message when value is 0 and option is -c', function(){
    let expectedOut = { isValid: false,
      errorMessage: 'head: illegal byte count -- 0' };
    deepEqual(validateInputs({option: '-c', value: 0, fileNames: ['file']}), expectedOut);
  });

  it('should return error message when number of files is 0', function(){
    let expectedOut = { isValid: false,
      errorMessage: 'head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]' }
    deepEqual(validateInputs({option: '-c', value: 10, fileNames: []}), expectedOut);
  });

  it('should return error message for invalid option', function(){
    let expectedOut = { isValid: false,
      errorMessage: 'head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]' }
    deepEqual(validateInputs({option: '-v', value: 10, fileNames: []}), expectedOut);
  });
});
