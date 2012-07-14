//### each
// Iterates over a list of elements, yielding each in turn to an iterator function. The iterator is bound to the context object, if one is passed. Each invocation of iterator is called with three arguments: (element, index, list). If list is a JavaScript object, iterator's arguments will be (value, key, list). Delegates to the native forEach function if it exists.
if (typeof Array.prototype.each === "undefined") {
    Array.prototype.each = function() {
        var args = argsWithThis.call(this, arguments);
        return _.each.apply(this, args);
    };
}

if (typeof Object.prototype.each === "undefined") {
    Object.prototype.each = function() {
        var args = argsWithThis.call(this, arguments);
        return _.each.apply(this, args);
    };
}

if (typeof Object.prototype.forEach === "undefined") {
    Object.prototype.forEach = Object.prototype.each;
}

//### map, collect
// Produces a new array of values by mapping each value in list through a transformation function (iterator). If the native map method exists, it will be used instead. If list is a JavaScript object, iterator's arguments will be (value, key, list).
if (typeof Object.prototype.map === "undefined") {
    Object.prototype.map = function() {
        var args = argsWithThis.call(this, arguments);
        return _.map.apply(this, args);
    };
}

if (typeof HTMLCollection.prototype.map === "undefined") {
    HTMLCollection.prototype.map = function() {
        var args = argsWithThis.call(this, arguments);
        return _.map.apply(this, args);
    };
}

if (typeof Object.prototype.collect === "undefined") {
    Object.prototype.collect = Object.prototype.map;
}

//### reduce, inject
// Also known as inject and foldl, reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iterator.
if (typeof Object.prototype.reduce === "undefined") {
    Object.prototype.reduce = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reduce.apply(this, args);
    };
}

if (typeof Object.prototype.inject === "undefined") {
    Object.prototype.inject = Object.prototype.reduce;
}

//### reduceRight, foldr
// The right-associative version of reduce. Delegates to the JavaScript 1.8 version of reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a language with lazy evaluation.
if (typeof Object.prototype.reduceRight === "undefined") {
    Object.prototype.reduceRight = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reduceRight.apply(this, args);
    };
}

if (typeof Object.prototype.foldr === "undefined") {
    Object.prototype.foldr = Object.prototype.reduceRight;
}

//### find, detect
// Looks through each value in the list, returning the first one that passes a truth test (iterator). The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list.
if (typeof Object.prototype.find === "undefined") {
    Object.prototype.find = function() {
        var args = argsWithThis.call(this, arguments);
        return _.find.apply(this, args);
    };
}

if (typeof Object.prototype.detect === "undefined") {
    Object.prototype.detect = Object.prototype.find;
}

//### filter
// Looks through each value in the list, returning an array of all the values that pass a truth test (iterator). Delegates to the native filter method, if it exists.
if (typeof Object.prototype.filter === "undefined") {
    Object.prototype.filter = function() {
        var args = argsWithThis.call(this, arguments);
        return _.filter.apply(this, args);
    };
}

if (typeof Object.prototype.select == 'undefined') {
    Object.prototype.select = Object.prototype.filter;
}

//### reject
// Returns the values in list without the elements that the truth test (iterator) passes. The opposite of filter.
if (typeof Object.prototype.reject === "undefined") {
    Object.prototype.reject = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reject.apply(this, args);
    };
}

//### every, all
// Returns true if all of the values in the list pass the iterator truth test. Delegates to the native method every, if present.
if (typeof Object.prototype.every === "undefined") {
    Object.prototype.every = function() {
        var args = argsWithThis.call(this, arguments);
        return _.every.apply(this, args);
    };
}

if (typeof Object.prototype.all == 'undefined') {
    Object.prototype.all = Object.prototype.every;
}