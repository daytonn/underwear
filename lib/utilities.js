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

isUndefined = _.isUndefined;

if (typeof Object.prototype.isEmpty === "undefined") {
    Object.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

if (typeof Array.prototype.isEmpty === "undefined") {
    Array.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

if (typeof String.prototype.isEmpty === "undefined") {
    String.prototype.isEmpty = function() {
        return _.isEmpty(this);
    };
}

if (typeof Object.prototype.isElement === "undefined") {
    Object.prototype.isElement = function() {
        return _.isElement.call(this, this);
    };
}
