Underwear.defineMethod(Array.prototype, 'invoke', function() {
  return _.invoke.apply(_, [this].concat(_.toArray(arguments)));
});
