(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var uw = require('./underwear-util');

//## Array methods
// List of Underscore's [Array methods](http://underscorejs.org/#arrays) we want to copy to `Array.prototype`
var methods = [
  "all", "any", "collect", "compact", "contains", "countBy",
  "detect", "difference", "each", "every", "filter", "find", "first",
  "flatten", "foldr", "groupBy", "include", "indexOf", "initial",
  "inject", "intersection", "invoke", "isEmpty", "last", "lastIndexOf",
  "map", "max", "min", "pluck", "reduce", "reduceRight", "reject",
  "rest", "select", "shuffle", "size", "some", "sortBy", "sortedIndex",
  "tail", "take", "toArray", "union", "uniq", "without", "zip"
];

// Copy each method to `Array.prototype`
_.each(methods, function(method) {
  uw.defineMethod(Array.prototype, method, function() {
    return _[method].apply(_, [this].concat(_.toArray(arguments)));
  });
});

//### sum
uw.defineMethod(Array.prototype, 'sum', function() {
  // `[1, 2, 3].sum(); // 6`
  return _.reduce(this, function(memo, num) {
    return memo + num;
  }, 0);
});

//### second
// Because the getting at the second item is usually as handy as `first`
uw.defineMethod(Array.prototype, 'second', function() {
  // `[1, 2, 3].second(); // 2`
  return this[1];
});

//### third
// Because it just seems right to have a `third` method
uw.defineMethod(Array.prototype, 'third', function() {
  // `[1, 2, 3].third(); // 3`
  return this[2];
});

//### isEmpty
uw.defineMethod(Array.prototype, 'isEmpty', function() {
  // `[].isEmpty(); // true`
  //
  // `[1, 2, 3].isEmpty(); // false`
  return _.isEmpty.call(this, this);
});

//### isNotEmpty
uw.defineMethod(Array.prototype, 'isNotEmpty', function() {
  // `[].isNotEmpty(); // false`
  //
  // `[1, 2, 3].isNotEmpty(); // true`
  return !_.isEmpty.call(this, this);
});

// ### Array.range
// `Array.range` is a "class" method on Array,
// it's not meant to be used with the `new` keyword
uw.defineMethod(Array, 'range', function() {
  // `Array.range(3); // [0, 1, 2]`
  return _.range.apply([], arguments);
});

},{"./underwear-util":2}],2:[function(require,module,exports){
module.exports = {
  //### defineMethod
  // Defines a method on the given object with the defineProperty
  // method with the appropriate properties for an inherited method
  //
  // `uw.defineMethod(Object.prototype, "foo", function() {});`
  defineMethod: function(prototype, method, func) {
    if (!prototype[method]) {
      Object.defineProperty(prototype, method, {
        writeable: false,
        configurable: false,
        enumerable: false,
        value: func
      });
    }
  },

  //### defineMethod
  // Defines an alias of a given method on the given object
  // with the defineProperty method with the appropriate
  // properties for an inherited method
  //
  // `uw.defineAlias(Arrat.prototype, "reverse", "backwards");`
  defineAlias: function(prototype, method, alias) {
    if (prototype[method]) {
      Object.defineProperty(prototype, alias, {
        writeable: false,
        configurable: false,
        enumerable: false,
        value: prototype[method]
      });
    }
  },

  //### requiresUnderscore
  // Throw an error if underscore is required for a given method
  //
  // uw.requiresUnderscore("foo");
  requiresUnderscore: function(method) {
    if (typeof _ === 'undefined') {
      throw new Error(method + ' requires underscore.js');
    }
  }
};

},{}]},{},[1])