Underwear.defineMethod(Array.prototype, 'isEmpty', function() {
  return _.isEmpty.apply(_, [this].concat(_.toArray(arguments)));
});
