if (typeof Function.prototype.bind === "undefined") {
    Function.prototype.bind = function() {
        var args = argsWithThis.call(this, arguments);
        return _.bind.apply(this, args);
    };
}

if (typeof Function.prototype.bindAll === "undefined") {
    Function.prototype.bindAll = function() {
        var args = argsWithThis.call(this, arguments);
        return _.bindAll.apply(this, args);
    };
}

if (typeof Object.prototype.bindAll === "undefined") {
    Object.prototype.bindAll = Function.prototype.bindAll;
}

if (typeof Function.prototype.memoize === "undefined") {
    Function.prototype.memoize = function() {
        var args = argsWithThis.call(this, arguments);
        return _.memoize.apply(this, args);
    };
}

if (typeof Function.prototype.delay === "undefined") {
    Function.prototype.delay = function() {
        var args = argsWithThis.call(this, arguments);
        return _.delay.apply(this, args);
    };
}
