(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
// Type checking methods that check the `suspect` against
// the `constructor` and return a boolean value.

//### isTypeof
global.isTypeof = function isTypeof(constructor, suspect) {
  return suspect.constructor === constructor;
};

//### isNotTypeof
global.isNotTypeof = function isNotTypeof(constructor, suspect) {
  return suspect.constructor !== constructor;
};

//### isDefined
global.isDefined = function isDefined(suspect) {
  return !_.isUndefined(suspect);
};

//### isEqual
// Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
global.isEqual = _.isEqual;

//### isArguments
// Returns true if object is an Arguments object.
global.isArguments = _.isArguments;

//### isObject
// Returns true if value is an Object.
global.isObject = _.isObject;

//### isArray
// Returns true if object is an Array.
global.isArray = _.isArray;

//### isString
// Returns true if object is a String.
global.isString = _.isString;

//### isNumber
// Returns true if object is a Number (including NaN).
global.isNumber = _.isNumber;

//### isBoolean
// Returns true if object is either true or false.
global.isBoolean = _.isBoolean;

//### isFunction
// Returns true if object is a Function.
global.isFunction = _.isFunction;

//### isDate
// Returns true if object is a Date.
global.isDate = _.isDate;

//### isRegExp
// Returns true if object is a RegExp.
global.isRegExp = _.isRegExp;

//### isNaN
// Returns true if object is NaN.
global.isNaN = _.isNaN;

//### isNull
// Returns true if object is null.
global.isNull = _.isNull;

//### isUndefined
// Returns true if object is undefined.
global.isElement = _.isElement;

//### isUndefined
// Returns true if object is undefined.
global.isUndefined = _.isUndefined;

//### isDefined
// Returns true if object is not undefined.
global.isUndefined = _.isUndefined;

//### sequence
// Starts a sequence starting at 0 and increments by 1 every time it's called.
// In underwear.js `uid` has a different implementation than `_.uniqueId`
// To avoid confusion _.uniqueId has been renamed to `sequence` which is closer
// to what it actually does
global.sequence = _.uniqueId;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])