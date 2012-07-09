
if (typeof Array.prototype.first === "undefined") {
    // Returns the first value of an array. Passing `n` will return the first `n` elements of the array.
    Array.prototype.first = function(n) {
        return _.first.call(this, this, n);
    };
}

if (typeof Array.prototype.take === "undefined") {
    Array.prototype.take = Array.prototype.first;
}

if (typeof Array.prototype.rest === "undefined") {
    // Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
    Array.prototype.rest = function(i) {
        return _.rest.call(this, this, i);
    };
}

if (typeof Array.prototype.tail === "undefined") {
    Array.prototype.tail = Array.prototype.rest;
}

if (typeof Array.prototype.initial === "undefined") {
    // Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
    Array.prototype.initial = function(n) {
        return _.initial.call(this, this, n);
    };
}
