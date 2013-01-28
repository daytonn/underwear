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


  _.each(methods, function(method) {
    if (Array.prototype[method]) { return; }
    Array.prototype[method] = function() {
      return _[method].apply(_, [this].concat(_.toArray(arguments)));
    };
  });


  if (!Array.range) {
    Array.range = function() {
      return _.range.apply([], arguments);
    }
  }

  var nativeMethods = [
    {
        func: Array.prototype.forEach,
        alias: 'each'
    }
  ];

  _.each(nativeMethods, function(nativeMethod) {
    if (nativeMethod.func) {
        Array.prototype[nativeMethod.alias] = nativeMethod.func;
    }
  });


  if (typeof Array.prototype.isEmpty === "undefined") {
      Array.prototype.isEmpty = function() {
          return _.isEmpty.call(this, this);
      };
  }

})();
