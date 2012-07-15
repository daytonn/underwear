//### isEqual
// Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
Namespace.isEqual = _.isEqual;

//### isArguments
// Returns true if object is an Arguments object.
Namespace.isArguments = _.isArguments;

//### isObject
// Returns true if value is an Object.
Namespace.isObject = _.isObject;

//### isArray
// Returns true if object is an Array.
Namespace.isArray = _.isArray;

//### isString
// Returns true if object is a String.
Namespace.isString = _.isString;

//### isNumber
// Returns true if object is a Number (including NaN).
Namespace.isNumber = _.isNumber;

//### isBoolean
// Returns true if object is either true or false.
Namespace.isBoolean = _.isBoolean;

//### isFunction
// Returns true if object is a Function.
Namespace.isFunction = _.isFunction;

//### isDate
// Returns true if object is a Date.
Namespace.isDate = _.isDate;

//### isRegExp
// Returns true if object is a RegExp.
Namespace.isRegExp = _.isRegExp;

//### isNaN
// Returns true if object is NaN.
Namespace.isNaN = _.isNaN;

//### isNull
// Returns true if object is null.
Namespace.isNull = _.isNull;

//### isUndefined
// Returns true if object is undefined.
Namespace.isElement = _.isElement;

//### isUndefined
// Returns true if object is undefined.
Namespace.isUndefined = _.isUndefined;

//### isDefined
// Returns true if object is not undefined.
Namespace.isUndefined = _.isUndefined;
Namespace.isDefined = function(suspect) {
    return !_.isUndefined(suspect);
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

//### Object.isEmpty
if (typeof Object.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    Object.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

//### Object.tap
if (typeof Object.prototype.tap === "undefined") {
    // 
    Object.prototype.tap = function() {
        var args = argsWithThis.call(this, arguments);
        return _.tap.apply(this, args);
    };
}

//### String.escape
if (typeof String.prototype.escape === "undefined") {
    // Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
    String.prototype.escape = function() {
        var args = argsWithThis.call(this, arguments);
        return _.escape.apply(this, args);
    };
}