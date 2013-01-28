(function() {

  // List of Underscore methods we want to copy to `Array.prototype`
  var methods = [
    "all",
    "any",
    "collect",
    "compact",
    "contains",
    "countBy",
    "detect",
    "difference",
    "each",
    "every",
    "filter",
    "find",
    "first",
    "flatten",
    "foldr",
    "groupBy",
    "include",
    "indexOf",
    "initial",
    "inject",
    "intersection",
    "invoke",
    "isEmpty",
    "last",
    "lastIndexOf",
    "map",
    "max",
    "min",
    "pluck",
    "reduce",
    "reduceRight",
    "reject",
    "rest",
    "select",
    "shuffle",
    "size",
    "some",
    "sortBy",
    "sortedIndex",
    "tail",
    "take",
    "toArray",
    "union",
    "uniq",
    "without",
    "zip"
  ];


  // Copy each method to `Array.prototype`
  _.each(methods, function(method) {
    if (Array.prototype[method]) { return; }
    Array.prototype[method] = function() {
      return _[method].apply(_, [this].concat(_.toArray(arguments)));
    };
  });


  // ### Array.range
  // `Array.range` is a "class" method on Array,
  // it's not meant to be used with the `new` keyword
  if (!Array.range) {
    Array.range = function() {
      return _.range.apply([], arguments);
    }
  }

  // List of native functions we wish to defer to
  var nativeMethods = [
    {
        // ### each
        // each is an alias of forEach if it exists
        func: Array.prototype.forEach,
        alias: 'each'
    }
  ];

  // Create aliases of native methods
  _.each(nativeMethods, function(nativeMethod) {
    if (nativeMethod.func) {
        Array.prototype[nativeMethod.alias] = nativeMethod.func;
    }
  });

// ## Utility methods

  if (typeof Array.prototype.isEmpty === "undefined") {
      // Returns true if object contains no values.
      Array.prototype.isEmpty = function() {
          return _.isEmpty.call(this, this);
      };
  }

})();
