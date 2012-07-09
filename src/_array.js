
if (typeof Array.prototype.first === "undefined") {
    // Returns the first value of an array. Passing `n` will return the first `n` elements of the array.
    Array.prototype.first = function(n) {
        return _.first.call(this, this, n);
    };
}

if (typeof Array.prototype.take === "undefined") {
    // Alias of first
    Array.prototype.take = Array.prototype.first;
}

if (typeof Array.prototype.rest === "undefined") {
    // Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
    Array.prototype.rest = function(i) {
        return _.rest.call(this, this, i);
    };
}

if (typeof Array.prototype.tail === "undefined") {
    // Alias of rest
    Array.prototype.tail = Array.prototype.rest;
}

if (typeof Array.prototype.initial === "undefined") {
    // Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
    Array.prototype.initial = function(n) {
        return _.initial.call(this, this, n);
    };
}

if (typeof Array.prototype.last === "undefined") {
    // Returns the last element of an array. Passing `n` will return the last `n` elements of the array.
    Array.prototype.last = function(n) {
        return _.last.call(this, this, n);
    };
}

if (typeof Array.prototype.compact === "undefined") {
    // Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
    Array.prototype.compact = function() {
        return _.compact.call(this, this);
    };
}
