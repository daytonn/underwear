(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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