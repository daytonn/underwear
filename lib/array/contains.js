Array.prototype.contains = function() {
  return _.contains.apply(_, [this].concat(_.toArray(arguments)));
};
