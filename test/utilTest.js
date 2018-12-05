const { equal, deepEqual } = require('assert');
const {
  parseInputs
} = require('../src/util.js');

describe('parseInputs', function(){
  it('should return empty array in fileNames key when no file name given', function(){
    deepEqual(parseInputs(),{ option: 'n', numOfLines: 10, fileNames: [] });
  });

  it('should insert given file names in fileNames key', function(){
    deepEqual(parseInputs('file1', 'file2'),{ option: 'n', numOfLines: 10, fileNames: ['file1', 'file2'] });
  });
});
