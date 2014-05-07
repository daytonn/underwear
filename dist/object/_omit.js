Underwear.defineMethod(Object.prototype, '_omit', function() {
  return _.omit.apply(this, [this].concat(_.toArray(arguments)));
});
