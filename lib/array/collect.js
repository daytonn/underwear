Underwear.defineMethod(Array.prototype, 'collect', function() {
  return _.collect.apply(_, [this].concat(_.toArray(arguments)));
});
