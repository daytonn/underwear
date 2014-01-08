(function() {
  var methods = [
    "all", "any", "collect", "compact", "contains", "countBy",
    "detect", "difference", "every", "filter", "find", "first",
    "flatten", "foldr", "groupBy", "include", "indexOf", "initial",
    "inject", "intersection", "invoke", "isEmpty", "last", "lastIndexOf",
    "map", "max", "min", "pluck", "reduce", "reduceRight", "reject",
    "rest", "select", "shuffle", "size", "some", "sortBy", "sortedIndex",
    "tail", "take", "toArray", "union", "uniq", "without", "zip"
  ];

  _.each(methods, function(method) {
    uw.defineMethod(Array.prototype, method, function() {
      return _[method].apply(_, [this].concat(_.toArray(arguments)));
    });
  });

  uw.defineMethod(Array.prototype, 'sum', function() {
    return _.reduce(this, function(memo, num) {
      return memo + num;
    }, 0);
  });

  uw.defineMethod(Array.prototype, 'second', function() {
    return this[1];
  });

  uw.defineMethod(Array.prototype, 'third', function() {
    return this[2];
  });

  uw.defineMethod(Array.prototype, 'isEmpty', function() {
    return _.isEmpty.call(this, this);
  });

  uw.defineMethod(Array.prototype, 'isNotEmpty', function() {
    return !_.isEmpty.call(this, this);
  });

  uw.defineMethod(Array, 'range', function() {
    return _.range.apply([], arguments);
  });

})();
