Underwear.defineMethod(Array.prototype, 'groupBy', function() {
  return _.groupBy.apply(_, [this].concat(_.toArray(arguments)));
});
