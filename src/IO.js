const parseInputs = function(inputs) {
  const startingArgs = inputs[0];
  let option = inputs[0].slice(0, 2);
  let fileNames = inputs.slice(1);

  if (isNumberOption(startingArgs)) {
    return createParsedInputs("-n", inputs[0].slice(1), fileNames);
  }

  if (isOptionWithCount(startingArgs)) {
    return createParsedInputs(option, inputs[0].substr(2), fileNames);
  }

  if (isOptionWithoutCount(startingArgs)) {
    return createParsedInputs(option, inputs[1], inputs.slice(2));
  }

  return getDefaultOptions(inputs);
};

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

const createParsedInputs = function(option, count, fileNames) {
  return { option, count, fileNames };
};

const getDefaultOptions = function(inputs) {
  return { option: "-n", count: 10, fileNames: inputs };
};

module.exports = {
  parseInputs
};
