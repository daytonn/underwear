Underwear.defineMethod(Object.prototype, '_pick', function() {
  return _.pick.apply(this, [this].concat(_.toArray(arguments)));
});
