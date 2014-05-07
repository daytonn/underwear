Underwear.defineMethod(Array.prototype, 'size', function() {
  return _.size.apply(_, [this].concat(_.toArray(arguments)));
});
