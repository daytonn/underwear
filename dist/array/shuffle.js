Underwear.defineMethod(Array.prototype, 'shuffle', function() {
  return _.shuffle.apply(_, [this].concat(_.toArray(arguments)));
});
