Underwear.defineMethod(Array.prototype, 'rest', function() {
  return _.rest.apply(_, [this].concat(_.toArray(arguments)));
});
