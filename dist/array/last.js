Underwear.defineMethod(Array.prototype, 'last', function() {
  return _.last.apply(_, [this].concat(_.toArray(arguments)));
});
