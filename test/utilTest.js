const { equal, deepEqual } = require('assert');
const {
  applyFunction,
  parseInputs
} = require('../src/util.js');

const add = (a, b) => a+b;

describe('applyFunction', function(){
  it('should call given function with arg1 and arg2', function(){
    equal(applyFunction(add, 5, 5), 10);
  });
});

describe('parseInputs', function(){
  it('should return empty array in fileNames key when no file name given', function(){
    deepEqual(parseInputs(),{ option: 'n', numOfLines: 10, fileNames: [] });
  });

  it('should insert given file names in fileNames key', function(){
    deepEqual(parseInputs('file1', 'file2'),{ option: 'n', numOfLines: 10, fileNames: ['file1', 'file2'] });
  });
});
