Underwear.defineMethod(Array.prototype, 'union', function() {
  return _.union.apply(_, [this].concat(_.toArray(arguments)));
});
