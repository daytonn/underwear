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

//### values
if (typeof Object.prototype.values === "undefined") {
    // Return all of the values of the object's properties.
    Object.prototype.values = function() {
        filterNonObjects(this, "Object.values()");
        var args = argsWithThis.call(this, arguments);
        return _.values.apply(this, args);
    };
}

//### functions
if (typeof Object.prototype.functions === "undefined") {
    // Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object.
    Object.prototype.functions = function() {
        var args = argsWithThis.call(this, arguments);
        var functions = _.functions.apply(this, args);
        // Filter out the methods that underwear defines on the Object
        return functions.without('functions',
                                 'keys',
                                 'values',
                                 'extend',
                                 'pick',
                                 'defaults',
                                 'clone',
                                 'isEqual',
                                 'isEmpty',
                                 'isElement',
                                 'isArguments',
                                 'isObject',
                                 'isArray',
                                 'isNumber',
                                 'isBoolean',
                                 'isFunction',
                                 'isDate',
                                 'isRegExp',
                                 'isFinite',
                                 'isNaN',
                                 'isNull',
                                 'isUndefined',
                                 'tap',
                                 'each');
    };

    Function.prototype.functions = Object.prototype.functions;
}

//### extend
if (typeof Object.prototype.extend === "undefined") {
    // Copy all of the properties in the source objects over to the destination object, and return the destination object. It's in-order, so the last source will override properties of the same name in previous arguments.
    Object.prototype.extend = function() {
        var args = argsWithThis.call(this, arguments);
        return _.extend.apply(this, args);
    };
}

//### pick
if (typeof Object.prototype.pick === "undefined") {
    // Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys).
    Object.prototype.pick = function() {
        var args = argsWithThis.call(this, arguments);
        return _.pick.apply(this, args);
    };
}

//### defaults
if (typeof Object.prototype.defaults === "undefined") {
    // Fill in missing properties in object with default values from the defaults objects, and return the object. As soon as the property is filled, further defaults will have no effect.
    Object.prototype.defaults = function() {
        var args = argsWithThis.call(this, arguments);
        return _.defaults.apply(this, args);
    };
}

//### clone
if (typeof Object.prototype.clone === "undefined") {
    // Create a shallow-copied clone of the object. Any nested objects or arrays will be copied by reference, not duplicated.
    Object.prototype.clone = function() {
        return _.clone(this);
    };
}