(function() {

    // List of function methods we want to steal from Underscore
    var methods = [
        'bind',
        'compose',
        'debounce',
        'defer',
        'delay',
        'memoize',
        'once',
        'throttle',
        'wrap'
    ];

    // Copy methods to `Function.prototype`
    _.each(methods, function(method) {
      if (!Function.prototype[method]) {
          Function.prototype[method] = function() {
            return _[method].apply(this, [this].concat(_.toArray(arguments)));
          };
      }
    });

})();
