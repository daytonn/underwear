Underwear.defineMethod(Array.prototype, 'map', function() {
  return _.map.apply(_, [this].concat(_.toArray(arguments)));
});
