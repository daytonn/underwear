Underwear.defineMethod(Object.prototype, '_keys', function() {
  return _.keys.apply(this, [this].concat(_.toArray(arguments)));
});
