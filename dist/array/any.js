Underwear.defineMethod(Array.prototype, 'any', function() {
  return _.any.apply(_, [this].concat(_.toArray(arguments)));
});
