Underwear.defineMethod(Array.prototype, 'min', function() {
  return _.min.apply(_, [this].concat(_.toArray(arguments)));
});
