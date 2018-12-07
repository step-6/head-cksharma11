const zip = function(list_1, list_2){
  let maxLength = Math.min(list_1.length, list_2.length);
  let zippedList = [];
  for(let index = 0; index < maxLength; index++){
    zippedList[index] = [list_1[index],list_2[index]];
  };
  return zippedList;
};

module.exports = {
  zip
}
