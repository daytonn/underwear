Array.prototype.lastIndexOf = function() {
  return _.lastIndexOf.apply(_, [this].concat(_.toArray(arguments)));
};
