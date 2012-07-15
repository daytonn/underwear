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

if (typeof Function.prototype.defer === "undefined") {
    Function.prototype.defer = function() {
        var args = argsWithThis.call(this, arguments);
        return _.defer.apply(this, args);
    };
}

if (typeof Function.prototype.throttle === "undefined") {
    Function.prototype.throttle = function() {
        var args = argsWithThis.call(this, arguments);
        return _.throttle.apply(this, args);
    };
}

if (typeof Function.prototype.debounce === "undefined") {
    Function.prototype.debounce = function() {
        var args = argsWithThis.call(this, arguments);
        return _.debounce.apply(this, args);
    };
}

if (typeof Function.prototype.once === "undefined") {
    Function.prototype.once = function() {
        var args = argsWithThis.call(this, arguments);
        return _.once.apply(this, args);
    };
}

if (typeof Function.prototype.wrap === "undefined") {
    Function.prototype.wrap = function() {
        var args = argsWithThis.call(this, arguments);
        return _.wrap.apply(this, args);
    };
}

if (typeof Function.prototype.compose === "undefined") {
    Function.prototype.compose = function() {
        var args = argsWithThis.call(this, arguments);
        return _.compose.apply(this, args);
    };
}
