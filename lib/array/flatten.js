Array.prototype.flatten = function() {
  return _.flatten.apply(_, [this].concat(_.toArray(arguments)));
};
