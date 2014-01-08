
function isTypeof(constructor, suspect) {
  return suspect.constructor == constructor;
}

function isNotTypeof(constructor, suspect) {
  return suspect.constructor != constructor;
}

isEqual = _.isEqual;

isArguments = _.isArguments;

isObject = _.isObject;

isArray = _.isArray;

isString = _.isString;

isNumber = _.isNumber;

isBoolean = _.isBoolean;

isFunction = _.isFunction;

isDate = _.isDate;

isRegExp = _.isRegExp;

isNaN = _.isNaN;

isNull = _.isNull;

isElement = _.isElement;

isUndefined = _.isUndefined;

isUndefined = _.isUndefined;

sequence = _.uniqueId;

function uid() {
  function S4() {
    return ((( 1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function isDefined(suspect) {
  return !_.isUndefined(suspect);
}
