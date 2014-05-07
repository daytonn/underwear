Underwear.defineMethod(Object.prototype, '_functions', function() {
  return _.functions.apply(this, [this].concat(_.toArray(arguments)));
});
