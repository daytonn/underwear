Array.prototype.compact = function() {
  return _.compact.apply(_, [this].concat(_.toArray(arguments)));
};
