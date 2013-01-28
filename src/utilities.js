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
// Returns true if object is a RegExp.
isRegExp = _.isRegExp;

//### isNaN
// Returns true if object is NaN.
isNaN = _.isNaN;

//### isNull
// Returns true if object is null.
isNull = _.isNull;

//### isUndefined
// Returns true if object is undefined.
isElement = _.isElement;

//### isUndefined
// Returns true if object is undefined.
isUndefined = _.isUndefined;

//### isDefined
// Returns true if object is not undefined.
isUndefined = _.isUndefined;

//### sequence
// Starts a sequence starting at 0 and increments by 1 every time it's called.
// In underwear.js `uniqueID` has a different implementation than `_.uniqueId`
// To avoid confusion _.uniqueId has been renamed to `sequence` which is closer
// to what it actually does
sequence = _.uniqueId;

//### uid
function uid () {

    function S4() {
       return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1);
    }

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();

};

//### isDefined
var isDefined = function(suspect) {
    return !_.isUndefined(suspect);
}

//### String.isEmpty
if (typeof String.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    String.prototype.isEmpty = function() {
        return _.isEmpty(this);
    };
}

//### String.escape
if (typeof String.prototype.escape === "undefined") {
    // Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
    String.prototype.escape = function() {
        return _.escape.apply(this, [this].concat(_.toArray(arguments)));
    };
}
