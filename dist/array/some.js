Underwear.defineMethod(Array.prototype, 'some', function() {
  return _.some.apply(_, [this].concat(_.toArray(arguments)));
});
