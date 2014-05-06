Array.prototype.sortBy = function() {
  return _.sortBy.apply(_, [this].concat(_.toArray(arguments)));
};
