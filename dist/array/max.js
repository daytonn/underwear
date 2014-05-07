Underwear.defineMethod(Array.prototype, 'max', function() {
  return _.max.apply(_, [this].concat(_.toArray(arguments)));
});
