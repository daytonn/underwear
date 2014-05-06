Array.prototype.pluck = function() {
  return _.pluck.apply(_, [this].concat(_.toArray(arguments)));
};
