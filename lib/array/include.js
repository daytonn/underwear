Underwear.defineMethod(Array.prototype, 'include', function() {
  return _.include.apply(_, [this].concat(_.toArray(arguments)));
});
