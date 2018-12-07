const isOptionSpecified = function(input) {
  return input.startsWith("-");
};

const isNumberOption = function(input) {
  return isOptionSpecified(input) && isFinite(input[1]);
};

const isOptionWithCount = function(input) {
  return isOptionSpecified(input) && input.length > 2;
};

const isOptionWithoutCount = function(input) {
  return isOptionSpecified(input) && input.length == 2;
};

const getNumberOptions = function(inputs) {
  return {
    option: "-n",
    value: inputs[0].slice(1),
    fileNames: inputs.slice(1)
  };
};

const getOptionsWithCount = function(inputs) {
  return {
    option: inputs[0].slice(0, 2),
    value: inputs[0].substr(2),
    fileNames: inputs.slice(1)
  };
};

const getOptionsWithoutCount = function(inputs) {
  return {
    option: inputs[0].slice(0, 2),
    value: inputs[1],
    fileNames: inputs.slice(2)
  };
};

const parseInputs = function(inputs) {
  const defaultOptions = { option: "-n", value: 10, fileNames: inputs };

  if (isNumberOption(inputs[0])) {
    return getNumberOptions(inputs);
  }

  if (isOptionWithCount(inputs[0])) {
    return getOptionsWithCount(inputs);
  }

  if (isOptionWithoutCount(inputs[0])) {
    return getOptionsWithoutCount(inputs);
  }

  return defaultOptions;
};

module.exports = {
  parseInputs
};
