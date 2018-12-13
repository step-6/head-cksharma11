const isInvalidOption = option => option != "-n" && option != "-c";
const optionMapping = {'-n': 'line', '-c': 'byte'}

const validateHeadInputs = function({ option, value, fileNames }) {
  const isInvalidCount = value => value <= 0 || isNaN(value);

  const isFileCountInvalid = fileNames => fileNames.length == 0;

  if (isInvalidCount(value)) {
    return {
      isValid: false,
      errorMessage: "head: illegal "+optionMapping[option]+" count -- " + value
    };
  }

  if (isInvalidOption(option, value)) {
    return {
      isValid: false,
      errorMessage:
        "head: illegal option -- " +
        option +
        "\nusage: head [-n lines | -c bytes] [file ...]"
    };
  }

  if (isFileCountInvalid(fileNames)) {
    return {
      isValid: false,
      errorMessage:
        "head: option requires an argument -- " +
        option[1] +
        "\nusage: head [-n lines | -c bytes] [file ...]"
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

const validateTailInputs = function({option, value, fileNames}){
  const isInvalidCount = value => isNaN(value);
  
  if (isInvalidOption(option, value)) {
    return {
      isValid: false,
      errorMessage:
      "tail: illegal option -- "+option+"\n"+
      "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
  }

  if (isInvalidCount(value)) {
    return {
      isValid: false,
      errorMessage: "tail: illegal offset -- " + value
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
}

module.exports = {
  validateHeadInputs,
  validateTailInputs
};
