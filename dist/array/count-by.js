Array.prototype.countBy = function() {
  return _.countBy.apply(_, [this].concat(_.toArray(arguments)));
};
