Underwear.defineMethod(Array.prototype, 'tail', function() {
  return _.tail.apply(_, [this].concat(_.toArray(arguments)));
});
