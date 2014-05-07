Underwear.defineMethod(String.prototype, 'unescape', function() {
  return _.unescape.apply(this, [this].concat(_.toArray(arguments)));
});
