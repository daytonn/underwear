Underwear.defineMethod(Array.prototype, 'find', function() {
  return _.find.apply(_, [this].concat(_.toArray(arguments)));
});
