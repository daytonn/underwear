Underwear.defineMethod(Array.prototype, 'reject', function() {
  return _.reject.apply(_, [this].concat(_.toArray(arguments)));
});
