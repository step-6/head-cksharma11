const parseInputs = function(inputs) {
  const option = inputs[0];

  if (isNumberOption(option)) {
    return createParsedInputs("-n", inputs[0].slice(1), inputs.slice(1));
  }

  if (isOptionWithCount(option)) {
    return createParsedInputs(
      inputs[0].slice(0, 2),
      inputs[0].substr(2),
      inputs.slice(1)
    );
  }

  if (isOptionWithoutCount(option)) {
    return createParsedInputs(
      inputs[0].slice(0, 2),
      inputs[1],
      inputs.slice(2)
    );
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
