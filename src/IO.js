const parseInputs = function(userArgs) {
  const startingArgs = userArgs[0];
  let option = userArgs[0].slice(0, 2);
  let fileNames = userArgs.slice(1);

  if (isNumberOption(startingArgs)) {
    return createParsedInputs("-n", userArgs[0].slice(1), fileNames);
  }

  if (isOptionWithCount(startingArgs)) {
    return createParsedInputs(option, userArgs[0].substr(2), fileNames);
  }

  if (isOptionWithoutCount(startingArgs)) {
    return createParsedInputs(option, userArgs[1], userArgs.slice(2));
  }

  return getDefaultOptions(userArgs);
};

const isNumber = function(numberCandidate) {
  return !isNaN(numberCandidate);
};

const isOptionSpecified = function(startingArgs) {
  return startingArgs.startsWith("-");
};

const isNumberOption = function(startingArgs) {
  return isOptionSpecified(startingArgs) && isNumber(startingArgs[1]);
};

const isOptionWithCount = function(startingArgs) {
  return isOptionSpecified(startingArgs) && startingArgs.length > 2;
};

const isOptionWithoutCount = function(startingArgs) {
  return isOptionSpecified(startingArgs) && startingArgs.length == 2;
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
