(function() {

    //### first
    if (typeof Array.prototype.first === "undefined") {
        // Returns the first value of an array. Passing `n` will return the first `n` elements of the array.
        Array.prototype.first = function() {
            var args = argsWithThis.call(this, arguments);
            return _.first.apply(this, args);
        };
    }

    //### take (first)
    if (typeof Array.prototype.take === "undefined") {
        // Alias of first
        Array.prototype.take = Array.prototype.first;
    }

    //### rest
    if (typeof Array.prototype.rest === "undefined") {
        // Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
        Array.prototype.rest = function() {
            var args = argsWithThis.call(this, arguments);
            return _.rest.apply(this, args);
        };
    }

    //### tail (rest)
    if (typeof Array.prototype.tail === "undefined") {
        // Alias of rest
        Array.prototype.tail = Array.prototype.rest;
    }

    //### initial
    if (typeof Array.prototype.initial === "undefined") {
        // Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
        Array.prototype.initial = function() {
            var args = argsWithThis.call(this, arguments);
            return _.initial.apply(this, args);
        };
    }

    //### last
    if (typeof Array.prototype.last === "undefined") {
        // Returns the last element of an array. Passing `n` will return the last `n` elements of the array.
        Array.prototype.last = function() {
            var args = argsWithThis.call(this, arguments);
            return _.last.apply(this, args);
        };
    }

    //### compact
    if (typeof Array.prototype.compact === "undefined") {
        // Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
        Array.prototype.compact = function() {
            var args = argsWithThis.call(this, arguments);
            return _.compact.apply(this, args);
        };
    }

    //### flatten
    if (typeof Array.prototype.flatten === "undefined") {
        // Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
        Array.prototype.flatten = function(shallow) {
            var args = argsWithThis.call(this, arguments);
            return _.flatten.apply(this, args);
        };
    }

    //### without
    if (typeof Array.prototype.without === "undefined") {
        // Returns a copy of the array with all instances of the values removed. === is used for the equality test.
        Array.prototype.without = function() {
            var args = argsWithThis.call(this, arguments);
            return _.without.apply(this, args);
        };
    }

    //### uniq
    if (typeof Array.prototype.uniq == "undefined") {
        // Produces a duplicate-free version of the array, using === to test object equality. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iterator function.
        Array.prototype.uniq = function() {
            var args = argsWithThis.call(this, arguments);
            return _.uniq.apply(this, args);
        };
    }

    //### intersection
    if (typeof Array.prototype.intersection === "undefined") {
        // Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
        Array.prototype.intersection = function() {
            var args = argsWithThis.call(this, arguments);
            return _.intersection.apply(this, args);
        };
    }

    //### union
    if (typeof Array.prototype.union === "undefined") {
        // Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
        Array.prototype.union = function() {
            var args = argsWithThis.call(this, arguments);
            return _.union.apply(this, args);
        };
    }

    //### difference
    if (typeof Array.prototype.difference === "undefined") {
        // Similar to without, but returns the values from array that are not present in the other arrays.
        Array.prototype.difference = function() {
            var args = argsWithThis.call(this, arguments);
            return _.difference.apply(this, args);
        };
    }

    //### zip
    if (typeof Array.prototype.zip === "undefined") {
        // Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
        Array.prototype.zip = function() {
            var args = argsWithThis.call(this, arguments);
            return _.zip.apply(this, args);
        };
    }

    //### indexOf
    if (typeof Array.prototype.indexOf === "undefined") {
        // Returns the index at which value can be found in the array, or -1 if value is not present in the array. Uses the native indexOf function unless it's missing. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search.
        Array.prototype.indexOf = function() {
            var args = argsWithThis.call(this, arguments);
            return _.indexOf.apply(this, args);
        };
    }

    //### lastIndexOf
    if (typeof Array.prototype.lastIndexOf === "undefined") {
        // Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the native lastIndexOf function if possible.
        Array.prototype.lastIndexOf = function() {
            var args = argsWithThis.call(this, arguments);
            return _.lastIndexOf.apply(this, args);
        };
    }

    //### range
    if (typeof Array.prototype.range === "undefined") {
        // A function to create flexibly-numbered lists of integers, handy for `each` and `map` loops. start, if omitted, defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented) by step, exclusive.
        Array.range = function() {
            return _.range.apply(this, arguments);
        };
    }
})();