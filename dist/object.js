(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var uw = require('./underwear-util');
//## Object methods
// Only a limited number of Underscore's
// [Object methods](http://underscorejs.org/#objects)
// play nicely on the prototype
var methods = [
  'keys', 'values', 'pairs', 'invert',
  'functions', 'pick', 'omit', 'defaults', 'map'
];

// Copy each method to `Object.prototype`
_.each(methods, function(method) {
  uw.defineMethod(Object.prototype, method, function() {
    return _[method].apply(this, [this].concat(_.toArray(arguments)));
  });
});

//### aliases
// These methods do not play nicely with other libriaries
// but are too handy to forego, so we make aliases
var aliases = { extend: 'mixin', clone: 'dup', has: 'defines' };

// Iterate over the aliases and copy them to the prototype
_.each(aliases, function(alias, method) {
  uw.defineMethod(Object.prototype, alias, function() {
    return _[method].apply(this, [this].concat(_.toArray(arguments)));
  });
});

//#### Examples
// `var obj = { one: 1 };`

// `obj.mixin({ two: 2 }); // { one: 1, two: 2 }`

// `obj.clone(); // { one: 1 }`

// `obj.defines("one"); // true`

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