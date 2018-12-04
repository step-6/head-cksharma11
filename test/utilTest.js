const { equal, deepEqual } = require('assert');
const {
  applyFunction
} = require('../src/util.js');

const add = (a, b) => a+b;

describe('applyFunction', function(){
  it('should call given function with arg1 and arg2', function(){
    equal(applyFunction(add, 5, 5), 10);
  });
});
