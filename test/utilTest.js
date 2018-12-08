const { deepEqual } = require('assert');
const { zip } = require('../src/util.js');

describe('zip', function(){
  it('should zip two arrays of same length', function(){
    deepEqual(zip([1],[1]),[[1,1]]);
    deepEqual(zip([1,2,3],[4,5,6]),[[1,4],[2,5],[3,6]]);
  });

  it('should zip arrays with different lengths', function(){
    deepEqual(zip([1,2,3],[4,5,6,11,2]),[[1,4],[2,5],[3,6]]);
    deepEqual(zip([1,2,3,1,2,3],[4,5,6]),[[1,4],[2,5],[3,6]]);
  });
});
