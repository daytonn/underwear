Underwear.defineMethod(Array.prototype, 'reduce', function() {
  return _.reduce.apply(_, [this].concat(_.toArray(arguments)));
});
