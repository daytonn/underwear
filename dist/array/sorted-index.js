Underwear.defineMethod(Array.prototype, 'sortedIndex', function() {
  return _.sortedIndex.apply(_, [this].concat(_.toArray(arguments)));
});
