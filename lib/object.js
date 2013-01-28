(function() {

    var methods = [
      'all',
      'any',
      'bindAll',
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

    _.each(methods, function(method) {
      if (Object.prototype[method]) { return; }
      Object.prototype[method] = function() {
        return _[method].apply(this, [this].concat(_.toArray(arguments)));
      };
    });

    Object.prototype.functions = function() {
      return _(_.functions.call(this, this)).reject(customDefinedMethods);
    };

    Object.prototype.methods = function() {
      var m = [];
      for (var prop in Object.prototype) {
        if (this[prop].constructor == Function) {
          m.push(prop);
        }
      }
      return m;
    };

    Object.prototype.merge = function() {
      return _.extend.apply(this, [this].concat(_.toArray(arguments)));
    };


    if (typeof Object.prototype.isEmpty === "undefined") {
        Object.prototype.isEmpty = function() {
            return _.isEmpty.call(this, this);
        };
    }

    if (typeof Object.prototype.tap === "undefined") {
        Object.prototype.tap = function() {
            return _.tap.apply(this, [this].concat(_.toArray(arguments)));
        };
    }

    function customDefinedMethods(func) {
      var custom_methods = [methods, 'functions', 'methods', 'merge', 'each', 'forEach', 'isEmpty', 'tap'].flatten();
      return _(custom_methods).contains(func);
    }

})();
