// Create a namespace for the magic method
var Underwear = {
    //### argsWithThis
    // Construct an array with the first item being `this` (Array instance) and the
    // following items mapped to arguments which works as an underscore adapter method
    argsWithThis: function(args) {
        var a = Array.prototype.slice.call(args);
        a.unshift(this);
        return a;
    }
};

(function(argsWithThis) {
    //= require "_underscore"
    //= require "array"
    //= require "object"
})(Underwear.argsWithThis);