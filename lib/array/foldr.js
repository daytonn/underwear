Underwear.defineMethod(Array.prototype, 'foldr', function() {
  return _.foldr.apply(_, [this].concat(_.toArray(arguments)));
});
