Underwear.defineMethod(Array.prototype, 'uniq', function() {
  return _.uniq.apply(_, [this].concat(_.toArray(arguments)));
});
