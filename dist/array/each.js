Underwear.defineMethod(Array.prototype, 'each', function() {
  return _.each.apply(_, [this].concat(_.toArray(arguments)));
});
