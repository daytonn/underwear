Underwear.defineMethod(Array.prototype, 'initial', function() {
  return _.initial.apply(_, [this].concat(_.toArray(arguments)));
});
