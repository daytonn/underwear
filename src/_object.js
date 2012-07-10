(function() {

    // Convenience method to filter out non objects and
    // throw an error on bad values
    function filterNonObjects(suspect, method) {
        if (suspect.constructor == Object) {
            return suspect;
        }
        else {
            throw new Error(method + " called on a non-object");
        }
    }

    //### keys
    if (typeof Object.prototype.keys === "undefined") {
        // Retrieve all the names of the object's properties.
        Object.prototype.keys = function() {
            filterNonObjects(this, "Object.keys()");
            var args = argsWithThis.call(this, arguments);
            return _.keys.apply(this, args);
        };
    }

})();