Underwear.defineMethod(String.prototype, 'escape', function() {
  return _.escape.apply(this, [this].concat(_.toArray(arguments)));
});
