Underwear.defineMethod(Array.prototype, 'take', function() {
  return _.take.apply(_, [this].concat(_.toArray(arguments)));
});
