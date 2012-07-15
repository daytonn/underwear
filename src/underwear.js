// Pass a namespace (defaults to `window`) and an argsWithThis method into the closure.
// This keeps Underwear's only method out of the global namespace and provides the
// ability to namespace all global functions created by Underwear.
(function(Namespace, argsWithThis) {
    //= require "_underscore"
    var _ = Namespace._;
    //= require "utilities"
    //= require "array"
    //= require "object"
    //= require "collection"
    //= require "function"
    //= require "number"
    //= require "uniqueid"
})(window,
    //### argsWithThis
    // Construct an array with the first item being `this` (Array instance) and the
    // following items mapped to arguments which works as an underscore adapter method
    function(args) {
        var a = Array.prototype.slice.call(args);
        a.unshift(this);
        return a;
    }
);