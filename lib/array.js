(function() {
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

  _.each(methods, function(method) {
    if (Array.prototype[method]) {
      if (_(deferredNativeMethods).contains(method)) return;
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

  var nativeMethods = [{
    func: Array.prototype.forEach,
    alias: 'each'
  }];

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


  if (typeof Array.prototype.isEmpty === "undefined") {
    Object.defineProperty(Array.prototype, 'isEmpty', {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: _.isEmpty.call(this, this)
    });
  }

  if (typeof Array.prototype.isNotEmpty === "undefined") {
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
