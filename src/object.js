(function() {
  //## Object methods
  // Only a limited number of Underscore's
  // [Object methods](http://underscorejs.org/#objects)
  // play nicely on the prototype
  var methods = [
    'each', 'keys', 'values', 'pairs', 'invert',
    'functions', 'pick', 'omit', 'defaults', 'map'
  ];

  // Copy each method to `Object.prototype`
  _.each(methods, function(method) {
    uw.defineMethod(Object.prototype, method, function() {
      return _[method].apply(this, [this].concat(_.toArray(arguments)));
    });
  });

  //### aliases
  // These methods do not play nicely with other libriaries
  // but are too handy to forego, so we make aliases
  var aliases = { extend: 'mixin', clone: 'dup', has: 'defines' };

  // Iterate over the aliases and copy them to the prototype
  _.each(aliases, function(alias, method) {
    uw.defineMethod(Object.prototype, alias, function() {
      return _[method].apply(this, [this].concat(_.toArray(arguments)));
    });
  });

  //#### Examples
  // `var obj = { one: 1 };`

  // `obj.mixin({ two: 2 }); // { one: 1, two: 2 }`

  // `obj.clone(); // { one: 1 }`

  // `obj.defines("one"); // true`

  //### bindAll
  // This method binds all of the objects functions to it's own
  // `this` context. Making `_.bindAll(this, [...methods]);` obsolute
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
