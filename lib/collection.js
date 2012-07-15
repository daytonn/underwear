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

if (typeof Object.prototype.reduce === "undefined") {
    Object.prototype.reduce = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reduce.apply(this, args);
    };
}

if (typeof Object.prototype.inject === "undefined") {
    Object.prototype.inject = Object.prototype.reduce;
}

if (typeof Object.prototype.reduceRight === "undefined") {
    Object.prototype.reduceRight = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reduceRight.apply(this, args);
    };
}

if (typeof Object.prototype.foldr === "undefined") {
    Object.prototype.foldr = Object.prototype.reduceRight;
}

if (typeof Object.prototype.find === "undefined") {
    Object.prototype.find = function() {
        var args = argsWithThis.call(this, arguments);
        return _.find.apply(this, args);
    };
}

if (typeof Object.prototype.detect === "undefined") {
    Object.prototype.detect = Object.prototype.find;
}

if (typeof Object.prototype.filter === "undefined") {
    Object.prototype.filter = function() {
        var args = argsWithThis.call(this, arguments);
        return _.filter.apply(this, args);
    };
}

if (typeof Object.prototype.select == 'undefined') {
    Object.prototype.select = Object.prototype.filter;
}

if (typeof Object.prototype.reject === "undefined") {
    Object.prototype.reject = function() {
        var args = argsWithThis.call(this, arguments);
        return _.reject.apply(this, args);
    };
}

if (typeof Object.prototype.every === "undefined") {
    Object.prototype.every = function() {
        var args = argsWithThis.call(this, arguments);
        return _.every.apply(this, args);
    };
}

if (typeof Object.prototype.all == 'undefined') {
    Object.prototype.all = Object.prototype.every;
}

if (typeof Object.prototype.some === "undefined") {
    Object.prototype.some = function() {
        var args = argsWithThis.call(this, arguments);
        return _.some.apply(this, args);
    };
}

if (typeof Object.prototype.any == 'undefined') {
    Object.prototype.any = Object.prototype.some;
}

if (typeof Object.prototype.include === "undefined") {
    Object.prototype.include = function() {
        var args = argsWithThis.call(this, arguments);
        return _.include.apply(this, args);
    };
}

if (typeof Object.prototype.contains === "undefined") {
    Object.prototype.contains = Object.prototype.include;
}

if (typeof Object.prototype.invoke === "undefined") {
    Object.prototype.invoke = function() {
        var args = argsWithThis.call(this, arguments);
        return _.invoke.apply(this, args);
    };
}

if (typeof Object.prototype.pluck === "undefined") {
    Object.prototype.pluck = function() {
        var args = argsWithThis.call(this, arguments);
        return _.pluck.apply(this, args);
    };
}

if (typeof Object.prototype.max === "undefined") {
    Object.prototype.max = function() {
        var args = argsWithThis.call(this, arguments);
        return _.max.apply(this, args);
    };
}
