Underwear.defineMethod(Array.prototype, 'first', function() {
  return _.first.apply(_, [this].concat(_.toArray(arguments)));
});
