Underwear.defineMethod(Object.prototype, '_clone', function() {
  return _.clone.apply(this, [this].concat(_.toArray(arguments)));
});
