Underwear.defineMethod(Array.prototype, 'filter', function() {
  return _.filter.apply(_, [this].concat(_.toArray(arguments)));
});
