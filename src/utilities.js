//### isEqual
// Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
isEqual = _.isEqual;

//### isArguments
// Returns true if object is an Arguments object.
isArguments = _.isArguments;

//### isObject
// Returns true if value is an Object.
isObject = _.isObject;

//### isArray
// Returns true if object is an Array.
isArray = _.isArray;

//### isString
// Returns true if object is a String.
isString = _.isString;

//### isNumber
// Returns true if object is a Number (including NaN).
isNumber = _.isNumber;

//### isBoolean
// Returns true if object is either true or false.
isBoolean = _.isBoolean;

//### isFunction
// Returns true if object is a Function.
isFunction = _.isFunction;

//### isDate
// Returns true if object is a Date.
isDate = _.isDate;

//### isRegExp
// Returns true if object is a isRegExp.
isRegExp = _.isRegExp;

//### isNaN
// Returns true if object is a isNaN.
isNaN = _.isNaN;

//### isNull
// Returns true if object is a isNull.
isNull = _.isNull;

//### isUndefined
// Returns true if object is a isUndefined.
isUndefined = _.isUndefined;

//### Object.isEmpty
if (typeof Object.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    Object.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

//### Array.isEmpty
if (typeof Array.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    Array.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

//### String.isEmpty
if (typeof String.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    String.prototype.isEmpty = function() {
        return _.isEmpty(this);
    };
}

//### isElement
if (typeof Object.prototype.isElement === "undefined") {
    // Returns true if object is a DOM element.
    Object.prototype.isElement = function() {
        return _.isElement.call(this, this);
    };
}