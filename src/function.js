//### bind
if (typeof Function.prototype.bind === "undefined") {
    // Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. Optionally, bind arguments to the function to pre-fill them, also known as partial application.
    Function.prototype.bind = function() {
        var args = argsWithThis.call(this, arguments);
        return _.bind.apply(this, args);
    };
}

//### bindAll
// Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked. Very handy for binding functions that are going to be used as event handlers, which would otherwise be invoked with a fairly useless this. If no methodNames are provided, all of the object's function properties will be bound to it.
if (typeof Function.prototype.bindAll === "undefined") {
    // Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. Optionally, bind arguments to the function to pre-fill them, also known as partial application.
    Function.prototype.bindAll = function() {
        var args = argsWithThis.call(this, arguments);
        return _.bindAll.apply(this, args);
    };
}

if (typeof Object.prototype.bindAll === "undefined") {
    Object.prototype.bindAll = Function.prototype.bindAll;
}

//### memoize
if (typeof Function.prototype.memoize === "undefined") {
    // Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key.
    Function.prototype.memoize = function() {
        var args = argsWithThis.call(this, arguments);
        return _.memoize.apply(this, args);
    };
}

//### delay
if (typeof Function.prototype.delay === "undefined") {
    // Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.
    Function.prototype.delay = function() {
        var args = argsWithThis.call(this, arguments);
        return _.delay.apply(this, args);
    };
}

//### defer
if (typeof Function.prototype.defer === "undefined") {
    // Defers invoking the function until the current call stack has cleared, similar to using setTimeout with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.
    Function.prototype.defer = function() {
        var args = argsWithThis.call(this, arguments);
        return _.defer.apply(this, args);
    };
}

//### throttle
if (typeof Function.prototype.throttle === "undefined") {
    // Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.
    Function.prototype.throttle = function() {
        var args = argsWithThis.call(this, arguments);
        return _.throttle.apply(this, args);
    };
}