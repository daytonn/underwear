(function() {
  var methods = [
    'each', 'keys', 'values', 'pairs', 'invert',
    'functions', 'pick', 'omit', 'defaults'
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





})();
