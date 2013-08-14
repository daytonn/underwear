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

  var deferredNativeMethods = [
    "every",
    "filter",
    "indexOf",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "some"
  ];

  // Copy each method to `Array.prototype`
  _.each(methods, function(method) {
    // Warn if we're going to overwrite a method that exists
    if (Array.prototype[method]) {
      if (!_(deferredNativeMethods).contains(method)) return;
      console.warn("Array.prototype." + method + " is being overwritten by underwear.js");
    }

    Object.defineProperty(Array.prototype, method, {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return _[method].apply(_, [this].concat(_.toArray(arguments)));
      }
    });
  });

  if (!Array.prototype.sum) {
    Object.defineProperty(Array.prototype, 'sum', {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return _.reduce(this, function(memo, num) {
          return memo + num;
        }, 0);
      }
    });
  }

  // ### Array.range
  // `Array.range` is a "class" method on Array,
  // it's not meant to be used with the `new` keyword
  if (!Array.range) {
    Object.defineProperty(Array, 'range', {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return _.range.apply([], arguments);
      }
    });
  }

  // List of native functions we wish to alias
  var nativeMethods = [{
    // ### each
    // each is an alias of forEach if it exists
    func: Array.prototype.forEach,
    alias: 'each'
  }];

  // Create aliases of native methods
  _.each(nativeMethods, function(nativeMethod) {
    if (nativeMethod.func) {
      Object.defineProperty(Array.prototype, nativeMethod.alias, {
        writeable: false,
        configurable: false,
        enumerable: false,
        value: nativeMethod.func
      });
    }
  });

// ## Utility methods

  if (typeof Array.prototype.isEmpty === "undefined") {
    // Returns true if object contains no values.
    Object.defineProperty(Array.prototype, 'isEmpty', {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: _.isEmpty.call(this, this)
    });
  }

  if (typeof Array.prototype.isNotEmpty === "undefined") {
    // Returns true if object contains values.
    Object.defineProperty(Array.prototype, 'isNotEmpty', {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return !_.isEmpty.call(this, this);
      }
    });
  }

})();
