Underwear.defineMethod(Array.prototype, 'detect', function() {
  return _.detect.apply(_, [this].concat(_.toArray(arguments)));
});
