Namespace.isEqual = _.isEqual;

Namespace.isArguments = _.isArguments;

Namespace.isObject = _.isObject;

Namespace.isArray = _.isArray;

Namespace.isString = _.isString;

Namespace.isNumber = _.isNumber;

Namespace.isBoolean = _.isBoolean;

Namespace.isFunction = _.isFunction;

Namespace.isDate = _.isDate;

Namespace.isRegExp = _.isRegExp;

Namespace.isNaN = _.isNaN;

Namespace.isNull = _.isNull;

Namespace.isElement = _.isElement;

Namespace.isUndefined = _.isUndefined;

Namespace.isUndefined = _.isUndefined;
Namespace.isDefined = function(suspect) {
    return !_.isUndefined(suspect);
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

if (typeof Object.prototype.isEmpty === "undefined") {
    Object.prototype.isEmpty = function() {
        return _.isEmpty.call(this, this);
    };
}

if (typeof Object.prototype.tap === "undefined") {
    Object.prototype.tap = function() {
        var args = argsWithThis.call(this, arguments);
        return _.tap.apply(this, args);
    };
}
