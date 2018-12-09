const zip = function(list1, list2){
  let maxLength = Math.min(list1.length, list2.length);
  let zippedList = [];
  for(let index = 0; index < maxLength; index++){
    zippedList[index] = [list1[index],list2[index]];
  };
  return zippedList;
};

module.exports = {
  zip
}
