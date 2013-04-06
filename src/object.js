(function() {

    // List of Underscore methods we want Object to have
    var methods = [
      'any',
      'all',
      'clone',
      'collect',
      'defaults',
      'detect',
      'every',
      'filter',
      'find',
      'foldr',
      'groupBy',
      'has',
      'include',
      'inject',
      'invoke',
      'keys',
      'map',
      'max',
      'min',
      'pick',
      'pluck',
      'reduce',
      'reduceRight',
      'reject',
      'select',
      'shuffle',
      'some',
      'sortBy',
      'values'
    ];

    // Copy the Underscore methods to the `Object.prototype`
    _.each(methods, function(method) {
      if (Object.prototype[method]) { return; }
      Object.prototype[method] = function() {
        return _[method].apply(this, [this].concat(_.toArray(arguments)));
      };
    });

    //### functions
    Object.prototype.functions = function() {
      // Filter out custom defined functions when listing an objects functions
      return _(_.functions.call(this, this)).reject(customDefinedMethods);
    };

    //### methods
    Object.prototype.methods = function() {
      var m = [];
      // Return a list of all prototype methods
      for (var prop in Object.prototype) {
        if (this[prop].constructor == Function) {
          m.push(prop);
        }
      }
      return m;
    };

    //### merge
    Object.prototype.merge = function() {
      // Alias underscore's `extend` as `merge` to keep jQuery from crying
      return _.extend.apply(this, [this].concat(_.toArray(arguments)));
    };

    // Utility methods

    //### isEmpty
    if (typeof Object.prototype.isEmpty === "undefined") {
        // Returns true if object contains no values.
        Object.prototype.isEmpty = function() {
            return _.isEmpty.call(this, this);
        };
    }

    function customDefinedMethods(func) {
      var custom_methods = [methods, 'functions', 'methods', 'merge', 'isEmpty'].flatten();
      return _(custom_methods).contains(func);
    }

})();
