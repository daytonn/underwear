Underwear.defineMethod(Array.prototype, 'all', function() {
  return _.all.apply(_, [this].concat(_.toArray(arguments)));
});
