(function(global) {
  global.isArguments = _.isArguments;
})(global || window || this);

(function(global) {
  global.isArray = _.isArray;
})(global || window || this);

(function(global) {
  global.isBoolean = _.isBoolean;
})(global || window || this);

(function(global) {
  global.isDate = _.isDate;
})(global || window || this);

(function(global) {
  global.isDefined = function (suspect) {
    return !_.isUndefined(suspect);
  };
})(global || window || this);

(function(global) {
  global.isElement = _.isElement;
})(global || window || this);

(function(global) {
  global.isEmpty = function(suspect) {
    return !!!(suspect && suspect.length > 0);
  };
})(global || window || this);

(function(global) {
  global.isEqual = _.isEqual;
})(global || window || this);

(function(global) {
  global.isFunction = _.isFunction;
})(global || window || this);

(function(global) {
  global.isNaN = _.isNaN;
})(global || window || this);

(function(global) {
  global.isNotTypeof = function (constructor, suspect) {
    return suspect.constructor !== constructor;
  };
})(global || window || this);

(function(global) {
  global.isNull = _.isNull;
})(global || window || this);

(function(global) {
  global.isNumber = _.isNumber;
})(global || window || this);

(function(global) {
  global.isObject = _.isObject;
})(global || window || this);

(function(global) {
  global.isRegExp = _.isRegExp;
})(global || window || this);

(function(global) {
  global.isString = _.isString;
})(global || window || this);

(function(global) {
  global.isTypeof = function (constructor, suspect) {
    return suspect.constructor === constructor;
  };
})(global || window || this);

(function(global) {
  global.isUndefined = _.isUndefined;
})(global || window || this);

(function(global) {
  global.sequence = _.uniqueId;
})(global || window || this);
