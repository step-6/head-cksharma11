const { equal, deepEqual } = require('assert');
const {
  parseInputs
} = require('../src/util.js');

describe('parseInputs', function(){
  it('should categorize head inptes and return object with option as -n', function(){
    let userArgs = ['-n5', 'file1'];
    deepEqual(parseInputs(userArgs),{ option: '-n', value: 5, fileNames: ['file1'] });
  });
  
  it('should categorize head inptes and return object with option as -c', function(){
    let userArgs = ['-c5', 'file1'];
    deepEqual(parseInputs(userArgs),{ option: '-c', value: 5, fileNames: ['file1'] });
  });
  
  it('should return default values', function(){
    let userArgs = ['file1'];
    deepEqual(parseInputs(userArgs),{ option: '-n', value: 10, fileNames: ['file1'] });
  });
  
  it('should categorize head inptes without passing option i.e. -11', function(){
    let userArgs = ['-11', 'file1'];
    deepEqual(parseInputs(userArgs),{ option: '-n', value: 11, fileNames: ['file1'] });
  });
});
