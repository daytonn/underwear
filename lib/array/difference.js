Array.prototype.difference = function() {
  return _.difference.apply(_, [this].concat(_.toArray(arguments)));
};
