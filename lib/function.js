(function() {

    var methods = [
        'bind',
        'memoize',
        'delay',
        'defer',
        'throttle',
        'debounce',
        'once',
        'wrap',
        'compose'
    ];

    _.each(methods, function(method) {
      if (!Function.prototype[method]) {
          Function.prototype[method] = function() {
            return _[method].apply(this, [this].concat(_.toArray(arguments)));
          };
      }
    });

})();
