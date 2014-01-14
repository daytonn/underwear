(function() {
  var methods = [
    'each', 'keys', 'values', 'pairs', 'invert',
    'functions', 'pick', 'omit', 'defaults', 'map'
  ];

  _.each(methods, function(method) {
    uw.defineMethod(Object.prototype, method, function() {
      return _[method].apply(this, [this].concat(_.toArray(arguments)));
    });
  });

  var aliases = { extend: 'mixin', clone: 'dup', has: 'defines' };

  _.each(aliases, function(alias, method) {
    uw.defineMethod(Object.prototype, alias, function() {
      return _[method].apply(this, [this].concat(_.toArray(arguments)));
    });
  });





  uw.defineMethod(Object.prototype, "bindAll", function() {
    var context = this;
    _.functions(this).each(function(func) {
      var original = context[func];
      context[func] = function() {
        return original.apply(context, arguments);
      };
    });
  });
})();
