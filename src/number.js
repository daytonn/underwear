//### times
if (typeof Number.prototype.times === "undefined") {
    // Invokes the given iterator function n times.
    Number.prototype.times = function() {
        var args = argsWithThis.call(this, arguments);
        return _.times.apply(this, args);
    };
}