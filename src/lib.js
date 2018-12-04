const getNLines = function(contents, n=10){
  return contents.split('\n', n).join('\n');
}

module.exports = {
  getNLines
}
