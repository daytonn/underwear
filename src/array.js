(function() {
  //## Array methods
  // List of Underscore's [Array methods](http://underscorejs.org/#arrays) we want to copy to `Array.prototype`
  var methods = [
    "all", "any", "collect", "compact", "contains", "countBy",
    "detect", "difference", "every", "filter", "find", "first",
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

})();
