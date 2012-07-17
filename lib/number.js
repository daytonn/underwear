if (typeof Number.prototype.times === "undefined") {
    Number.prototype.times = function() {
        var args = argsWithThis.call(this, arguments);
        return _.times.apply(this, args);
    };
}
