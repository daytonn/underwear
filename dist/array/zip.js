Underwear.defineMethod(Array.prototype, 'zip', function() {
  return _.zip.apply(_, [this].concat(_.toArray(arguments)));
});
