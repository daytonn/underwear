if (typeof Array.prototype.each === "undefined") {
    Array.prototype.each = function() {
        var args = argsWithThis.call(this, arguments);
        return _.each.apply(this, args);
    };
}

if (typeof Object.prototype.each === "undefined") {
    Object.prototype.each = function() {
        var args = argsWithThis.call(this, arguments);
        return _.each.apply(this, args);
    };
}

if (typeof Object.prototype.forEach === "undefined") {
    Object.prototype.forEach = Object.prototype.each;
}

if (typeof Object.prototype.map === "undefined") {
    Object.prototype.map = function() {
        var args = argsWithThis.call(this, arguments);
        return _.map.apply(this, args);
    };
}

if (typeof Object.prototype.collect === "undefined") {
    Object.prototype.collect = Object.prototype.map;
}
