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

},{"./underwear-util":6}],2:[function(require,module,exports){
//### defineProperty polyfill
// Blatantly stolen from [https://github.com/inexorabletash/polyfill](https://github.com/inexorabletash/polyfill)
// ES 15.2.3.6 Object.defineProperty ( O, P, Attributes )
// Partial support for most common case - getters, setters, and values
if (!Object.defineProperty || !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (e) { return false; } } ())) {
  var orig = Object.defineProperty;
  Object.defineProperty = function (o, prop, desc) {
    // In IE8 try built-in implementation for defining properties on DOM prototypes.
    if (orig) {
      try { return orig(o, prop, desc); } catch (e) {}
    }
    if (o !== Object(o)) { throw new Error("Object.defineProperty called on non-object"); }
    if (Object.prototype.__defineGetter__ && ('get' in desc)) {
      Object.prototype.__defineGetter__.call(o, prop, desc.get);
    }
    if (Object.prototype.__defineSetter__ && ('set' in desc)) {
      Object.prototype.__defineSetter__.call(o, prop, desc.set);
    }
    if ('value' in desc) {
      o[prop] = desc.value;
    }
    return o;
  };
}

},{}],3:[function(require,module,exports){
require('./define-property');
require('./utilities');
require('./object');
require('./array');
require('./string');

},{"./array":1,"./define-property":2,"./object":4,"./string":5,"./utilities":7}],4:[function(require,module,exports){
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

},{"./underwear-util":6}],5:[function(require,module,exports){
var uw = require('./underwear-util');
//## String methods

//### capitalize
// Capitalizes the string
//
// `"hello".capitalize(); // Hello`
uw.defineMethod(String.prototype, "capitalize", function() {
  uw.requiresUnderscore("capitalize");
  return this.charAt(0).toUpperCase() + this.slice(1);
});

//### trim
// Trims whitespace on either side of the string
//
// `" hello ".trim(); // 'hello'`
uw.defineMethod(String.prototype, "trim", function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
});

//### ltrim
// Trims whitespace on the left-hand side of the string
//
// `" hello ".ltrim(); // 'hello '`
uw.defineMethod(String.prototype, "ltrim", function() {
  return this.replace(/^\s+/, "");
});

//### rtrim
// Trims whitespace on the right-hand side of the string
//
// `" hello ".rtrim(); // ' hello'`
uw.defineMethod(String.prototype, "rtrim", function() {
  return this.replace(/\s+$/, "");
});

//### compact
// Removes all white space in the string
//
// `" he ll o ".compact(); // 'hello'`
uw.defineMethod(String.prototype, "compact", function() {
  return this.replace(/\s/g, "");
});

//### singleSpace
// Removes any double spacing, and trims the string
//
// `" hello    world ".singleSpace(); // 'hello world'`
uw.defineMethod(String.prototype, "singleSpace", function() {
  return this.trim().replace(/\s{1,}/g, " ");
});

//### titleize
// Capitalizes all the words and replaces some characters in the string to create a nicer looking title
//
// `"hello-world this_is a GreatTitle".titleize(); // Hello World This Is A Great Title`
uw.defineMethod(String.prototype, "titleize", function() {
  uw.requiresUnderscore("titleize");
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.capitalize();
  }).join(" ");
});

//### titleCase
// Alias of `titleize`
uw.defineAlias(String.prototype, "titleize", "titleCase");

//### dasherize
// Replaces underscores with dashes in the string
//
// `"hello_world".dasherize(); // hello-world`
uw.defineMethod(String.prototype, "dasherize", function() {
  return this.replace(/_/g, '-').toLowerCase();
});

//### humanize
// capitalizes the first word and turns underscores into spaces and strips a trailing "_id", if any
//
// `"this is-a_test String".humanize(); // `
uw.defineMethod(String.prototype, "humanize", function() {
  return this.replace(/_/g, ' ').replace(/^\s?/, "").toLowerCase().capitalize();
});

//### hyphenate
// Adds dashes between all spaces, underscores, and camel-cased words
//
// `"hello_there BigWorld".hyphenate(); // hello-there-big-world`
uw.defineMethod(String.prototype, "hyphenate", function() {
  return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
});

//### isBlank
// Determines if a string is blank
//
// `" ".isBlank(); // true`
//
// `"\n".isBlank(); // true`
uw.defineMethod(String.prototype, "isBlank", function() {
  return (/^(\s?)+$/).test(this);
});

//### isPresent
// Determines if the string is not blank
//
// `" ".isPresent(); // false`
//
// `"hello".isPresent(); // true`
uw.defineMethod(String.prototype, "isPresent", function() {
  return this.length > 0 && !this.isBlank();
});

//### truncate
// Truncates the string at a given length and adds elipses points
//
// `"hello".truncate(2); // he...`
uw.defineMethod(String.prototype, "truncate", function(length) {
  return (this.length > length) ? this.substring(0, length) + '...' : this;
});

//### toNumber
// Converts the string to a number
//
// `"1".toNumber(); // 1`
//
// `"1.23".toNumber(); // 1.23`
//
// `"-1".toNumber(); // -1`
//
// `"-1.23".toNumber(); // -1.23`
uw.defineMethod(String.prototype, "toNumber", function() {
  return this * 1 || 0;
});

//### camelize
// Removes spaces, underscores, and dashes and uppercases each word
//
// `"hello_great big-world".camelize(); // HelloGreatBigWorld`
uw.defineMethod(String.prototype, "camelize", function() {
  uw.requiresUnderscore("camelize");
  return _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.capitalize() : part.toLowerCase();
  }).join('');
});

//### constantize
// `"hello".constantize(); // `
uw.defineMethod(String.prototype, "constantize", function() {
  return this.camelize().capitalize();
});

//### each
// Executes an iterator function on each character
//
// `"hello".each(function(character) { alert(character); }); // alerts h-e-l-l-o respectively`
uw.defineMethod(String.prototype, "each", function(iterator) {
  uw.requiresUnderscore("each");
  return _.each.call(this, this.split(''), iterator);
});

//### underscore
// Makes an underscored, lowercase form from the expression in the string
//
// `"Hello World".underscore(); // hello_world`
uw.defineMethod(String.prototype, "underscore", function() {
  return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
});

//### isEmpty
// Determines emptiness of the string
//
// `"hello".isEmpty(); // false`
//
// `"".isEmpty(); // true`
uw.defineMethod(String.prototype, "isEmpty", function() {
  return this.length === 0;
});

//### isNotEmpty
// Determines 'fullness' of the string
//
// `"hello".isNotEmpty(); // true`
//
// `"".isNotEmpty(); // false`
uw.defineMethod(String.prototype, "isNotEmpty", function() {
  return this.length > 0;
});

//### includes
// Determines if a sub-string is within the string
//
// `"hello".includes("el"); // true`
uw.defineMethod(String.prototype, "includes", function(string) {
  var s = new RegExp(string, 'g');
  return this.match(s) ? true : false;
});

//### chunk
// Splits the string into chunks of `n`
//
// `"hello".chunk(2); // ["he", "ll", "o"]`
uw.defineMethod(String.prototype, "chunk", function(chunkSize) {
  chunkSize = chunkSize ? chunkSize : this.length;
  return this.match(new RegExp('.{1,' + chunkSize + '}', 'g'));
});

//### swapCase
// Switches the case of each character
//
// `"Hello".swapCase(); // hELLO`
uw.defineMethod(String.prototype, "swapCase", function() {
  return this.replace(/[A-Za-z]/g, function(s) {
    return (/[A-Z]/).test(s) ? s.toLowerCase() : s.toUpperCase();
  });
});

//### stripTags
// Strips HTML tags
//
// `"<p>hello</p>".stripTags(); // hello`
uw.defineMethod(String.prototype, "stripTags", function() {
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
});

//### wordCount
// Counts the number of words in the string, given
// a word it counts the occurences of that word
//
// `"hello world".wordCount(); // 2`
//
// `"hello world".wordCount("hello"); // 1`
uw.defineMethod(String.prototype, "wordCount", function(word) {
  uw.requiresUnderscore("wordCount");
  var matches;
  var string = this.stripTags();
  matches = (word) ? string.match(new RegExp(word, "g")) : string.match(/\b[A-Za-z_]+\b/g);
  return matches ? matches.length : 0;
});

//### wrap
// Wraps the string in a given string
//
// `"hello".wrap("'"); // 'hello'`
uw.defineMethod(String.prototype, "wrap", function(wrapper) {
  return wrapper.concat(this, wrapper);
});

//### unwrap
// Removes the given string from either side of the string
//
// `"'hello'".unwrap("'"); // hello`
uw.defineMethod(String.prototype, "unwrap", function(wrapper) {
  return this.replace(new RegExp("^" + wrapper + "(.+)" + wrapper + "$"), "$1");
});

//### escape
// Escapes a string for insertion into HTML, replacing &, <, >, ", and ' characters
//
// `"<p>hello & world</p>".escape();`
//
// `&lt;p&gt;hello &amp; world&lt;/p&gt;`
uw.defineMethod(String.prototype, "escape", function() {
  return _.escape.apply(this, [this].concat(_.toArray(arguments)));
});

//### unescape
// Escapes a string for insertion into HTML, replacing &, <, >, ", and ' characters
//
// `"&lt;p&gt;hello &amp; world&lt;/p&gt;".unescape();`
//
// `<p>hello & world</p>`
uw.defineMethod(String.prototype, "unescape", function() {
  return _.unescape.apply(this, [this].concat(_.toArray(arguments)));
});

//### toBoolean
// Converts truthy english words to boolean values
//
// `"true".toBoolean(); // true`
//
// `"yes".toBoolean(); // true`
//
// `"on".toBoolean(); // true`
//
// `"y".toBoolean(); // true`
//
// `"false".toBoolean(); // false`
//
// `"no".toBoolean(); // false`
//
// `"off".toBoolean(); // false`
//
// `"n".toBoolean(); // false`
uw.defineMethod(String.prototype, "toBoolean", function() {
  var truthyStrings = ["true", "yes", "on", "y"];
  var falseyStrings = ["false", "no", "off", "n"];
  if (_(truthyStrings).contains(this.toLowerCase())) {
    return true;
  } else if (_(falseyStrings).contains(this.toLowerCase())) {
    return false;
  } else {
    return this.isNotEmpty() ? true : false;
  }
});

//### trim
// Alias for `strip`
//
// `" hello ".trim(); // 'hello'`
uw.defineAlias(String.prototype, "trim", "strip");
//### ltrim
// Alias for `lstrip`
//
// `" hello ".ltrim(); // 'hello '`
uw.defineAlias(String.prototype, "ltrim", "lstrip");
//### rtrim
// Alias for `rstrip`
//
// `" hello ".rtrim(); // ' hello'`
uw.defineAlias(String.prototype, "rtrim", "rstrip");


},{"./underwear-util":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
(function (global){
// Type checking methods that check the `suspect` against
// the `constructor` and return a boolean value.

//### isTypeof
global.isTypeof = function isTypeof(constructor, suspect) {
  return suspect.constructor === constructor;
};

//### isNotTypeof
global.isNotTypeof = function isNotTypeof(constructor, suspect) {
  return suspect.constructor !== constructor;
};

//### isDefined
global.isDefined = function isDefined(suspect) {
  return !_.isUndefined(suspect);
};

//### isEqual
// Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
global.isEqual = _.isEqual;

//### isArguments
// Returns true if object is an Arguments object.
global.isArguments = _.isArguments;

//### isObject
// Returns true if value is an Object.
global.isObject = _.isObject;

//### isArray
// Returns true if object is an Array.
global.isArray = _.isArray;

//### isString
// Returns true if object is a String.
global.isString = _.isString;

//### isNumber
// Returns true if object is a Number (including NaN).
global.isNumber = _.isNumber;

//### isBoolean
// Returns true if object is either true or false.
global.isBoolean = _.isBoolean;

//### isFunction
// Returns true if object is a Function.
global.isFunction = _.isFunction;

//### isDate
// Returns true if object is a Date.
global.isDate = _.isDate;

//### isRegExp
// Returns true if object is a RegExp.
global.isRegExp = _.isRegExp;

//### isNaN
// Returns true if object is NaN.
global.isNaN = _.isNaN;

//### isNull
// Returns true if object is null.
global.isNull = _.isNull;

//### isUndefined
// Returns true if object is undefined.
global.isElement = _.isElement;

//### isUndefined
// Returns true if object is undefined.
global.isUndefined = _.isUndefined;

//### isDefined
// Returns true if object is not undefined.
global.isUndefined = _.isUndefined;

//### sequence
// Starts a sequence starting at 0 and increments by 1 every time it's called.
// In underwear.js `uid` has a different implementation than `_.uniqueId`
// To avoid confusion _.uniqueId has been renamed to `sequence` which is closer
// to what it actually does
global.sequence = _.uniqueId;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3])