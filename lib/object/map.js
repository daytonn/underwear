Underwear.defineMethod(Object.prototype, '_map', function() {
  return _.map.apply(this, [this].concat(_.toArray(arguments)));
});
