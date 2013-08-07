(function() {

  var methods = [
    'each',
    'keys',
    'values',
    'pairs',
    'invert',
    'functions',
    'pick',
    'omit',
    'defaults',
    'tap'
  ];

  _.each(methods, function(method) {
    if (Object.prototype[method]) { return; }
    Object.defineProperty(Object.prototype, method, {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return _[method].apply(this, [this].concat(_.toArray(arguments)));
      }
    });
  });

  var aliases = {
    extend: 'mixin',
    clone: 'dup',
    has: 'defines'
  };

  _.each(aliases, function(alias, method) {
    if (Object.prototype[alias]) { return; }
    Object.defineProperty(Object.prototype, alias, {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function() {
        return _[method].apply(this, [this].concat(_.toArray(arguments)));
      }
    });
  });

})();