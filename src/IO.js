const isNumber = function(numberCandidate) {
  return !isNaN(numberCandidate);
};

const isOptionSpecified = function(option) {
  return option.startsWith("-");
};

const isNumberOption = function(option) {
  return isOptionSpecified(option) && isNumber(option[1]);
};

const isOptionWithCount = function(option) {
  return isOptionSpecified(option) && option.length > 2;
};

const isOptionWithoutCount = function(option) {
  return isOptionSpecified(option) && option.length == 2;
};

const getNumberOptions = function(inputs) {
  return {
    option: "-n",
    count: inputs[0].slice(1),
    fileNames: inputs.slice(1)
  };
};

const getOptionsWithCount = function(inputs) {
  return {
    option: inputs[0].slice(0, 2),
    count: inputs[0].substr(2),
    fileNames: inputs.slice(1)
  };
};

const getOptionsWithoutCount = function(inputs) {
  return {
    option: inputs[0].slice(0, 2),
    count: inputs[1],
    fileNames: inputs.slice(2)
  };
};

const getDefaultOptions = function(inputs) {
  return { option: "-n", count: 10, fileNames: inputs };
};

const parseInputs = function(inputs) {
  const option = inputs[0];

  if (isNumberOption(option)) {
    return getNumberOptions(inputs);
  }

  if (isOptionWithCount(option)) {
    return getOptionsWithCount(inputs);
  }

  if (isOptionWithoutCount(option)) {
    return getOptionsWithoutCount(inputs);
  }

  return getDefaultOptions(inputs);
};

module.exports = {
  parseInputs
};
