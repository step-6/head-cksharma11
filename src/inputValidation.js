const isInvalidOption = option => option != "-n" && option != "-c";
const optionMapping = { "-n": "line", "-c": "byte" };
const headUsageMessage = "usage: head [-n lines | -c bytes] [file ...]";
const tailUsageMessage =
  "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

const validateHeadInputs = function({ option, count, fileNames }) {
  const isInvalidCount = count => count <= 0 || isNaN(count);

  const isFileCountInvalid = fileNames => fileNames.length == 0;

  if (isInvalidOption(option, count)) {
    return {
      isValid: false,
      errorMessage: `head: illegal option -- ${option}\n${headUsageMessage}`
    };
  }

  if (isInvalidCount(count)) {
    return {
      isValid: false,
      errorMessage: `head: illegal ${optionMapping[option]} count -- ${count}`
    };
  }

  if (isFileCountInvalid(fileNames)) {
    return {
      isValid: false,
      errorMessage: `head: option requires an argument -- ${
        option[1]
      }\n${headUsageMessage}`
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

const validateTailInputs = function({ option, count, fileNames }) {
  const isInvalidCount = count => isNaN(count);

  if (isInvalidOption(option, count)) {
    return {
      isValid: false,
      errorMessage: `tail: illegal option -- ${option}\n${tailUsageMessage}`
    };
  }

  if (isInvalidCount(count)) {
    return {
      isValid: false,
      errorMessage: `tail: illegal offset -- ${count}`
    };
  }

  return {
    isValid: true,
    errorMessage: ""
  };
};

module.exports = {
  validateHeadInputs,
  validateTailInputs
};
