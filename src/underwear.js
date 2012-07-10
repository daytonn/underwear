(function() {
    //### argsWithThis
    // Construct an array with the first item being `this` (Array instance) and the
    // following items mapped to arguments which works as an underscore adapter method
    function argsWithThis(args) {
        var a = Array.prototype.slice.call(args);
        a.unshift(this);
        return a;
    }

    //= require "_underscore"
    //= require "_array"
    //= require "_object"
})();
