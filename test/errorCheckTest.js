const {equal, deeEqual} = require('assert');
const {checkErrors} = require('../src/errorCheck.js');

describe('checkErrors', function(){
  it('should return 0 when no errors exists', function(){
    equal(checkErrors({option: '-n', value: 10, fileNames: ['file']}), 0);
  });
  
  it('should return error message when value is 0 and option is -n', function(){
    let errorMessage = 'head: illegal line count -- 0';
    equal(checkErrors({option: '-n', value: 0, fileNames: ['file']}), errorMessage);
  });
  
  it('should return error message when value is 0 and option is -c', function(){
    let errorMessage = 'head: illegal byte count -- 0';
    equal(checkErrors({option: '-c', value: 0, fileNames: ['file']}), errorMessage);
  });
  
  it('should return error message when number of files is 0', function(){
    let errorMessage = 'head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]'
    equal(checkErrors({option: '-c', value: 10, fileNames: []}), errorMessage);
  });

});
