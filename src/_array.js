(function() {

    if (typeof Array.prototype.first === "undefined") {
        // Returns the first value of an array. Passing `n` will return the first `n` elements of the array.
        Array.prototype.first = function() {
            var args = argsWithThis.call(this, arguments);
            return _.first.apply(this, args);
        };
    }

    if (typeof Array.prototype.take === "undefined") {
        // Alias of first
        Array.prototype.take = Array.prototype.first;
    }

    if (typeof Array.prototype.rest === "undefined") {
        // Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
        Array.prototype.rest = function() {
            var args = argsWithThis.call(this, arguments);
            return _.rest.apply(this, args);
        };
    }

    if (typeof Array.prototype.tail === "undefined") {
        // Alias of rest
        Array.prototype.tail = Array.prototype.rest;
    }

    if (typeof Array.prototype.initial === "undefined") {
        // Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
        Array.prototype.initial = function() {
            var args = argsWithThis.call(this, arguments);
            return _.initial.apply(this, args);
        };
    }

    if (typeof Array.prototype.last === "undefined") {
        // Returns the last element of an array. Passing `n` will return the last `n` elements of the array.
        Array.prototype.last = function() {
            var args = argsWithThis.call(this, arguments);
            return _.last.apply(this, args);
        };
    }

    if (typeof Array.prototype.compact === "undefined") {
        // Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
        Array.prototype.compact = function() {
            var args = argsWithThis.call(this, arguments);
            return _.compact.apply(this, args);
        };
    }

    if (typeof Array.prototype.flatten === "undefined") {
        // Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
        Array.prototype.flatten = function(shallow) {
            var args = argsWithThis.call(this, arguments);
            return _.flatten.apply(this, args);
        };
    }

    if (typeof Array.prototype.without === "undefined") {
        // Returns a copy of the array with all instances of the values removed. === is used for the equality test.
        Array.prototype.without = function() {
            var args = argsWithThis.call(this, arguments);
            return _.without.apply(this, args);
        };
    }

    if (typeof Array.prototype.uniq == "undefined") {
        // Produces a duplicate-free version of the array, using === to test object equality. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iterator function.
        Array.prototype.uniq = function() {
            var args = argsWithThis.call(this, arguments);
            return _.uniq.apply(this, args);
        };
    }

    // Construct an array with the first item being this
    // and the following items mapped to arguments to work
    // as an underscore adapter method
    function argsWithThis(args) {
        var a = [this];

        if (typeof args !== "undefined") {
            _(Array.prototype.slice.call(args)).each(function(arg) {
                a.push(arg);
            });
        }

        return a;
    }

})();
