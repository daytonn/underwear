Underwear.defineMethod(Array.prototype, 'intersection', function() {
  return _.intersection.apply(_, [this].concat(_.toArray(arguments)));
});
