Underwear.defineMethod(Array.prototype, 'inject', function() {
  return _.inject.apply(_, [this].concat(_.toArray(arguments)));
});
