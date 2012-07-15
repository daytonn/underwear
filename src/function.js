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