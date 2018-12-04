const getNLines = function(contents, n=10){
  return contents.split('\n', n).join('\n');
}

const getNCharacters = function(contents, n){
  return contents.split('', n).join('');
}

module.exports = {
  getNLines,
  getNCharacters
}
