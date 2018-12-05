const { equal, deepEqual } = require('assert');
const {
  parseInputs
} = require('../src/util.js');

describe('parseInputs', function(){
  it('should categorize head inptes and return object', function(){
    let userArgs = ['-n5', 'file1'];
    deepEqual(parseInputs(userArgs),{ option: '-n', value: 5, fileNames: ['file1'] });
  });
});
