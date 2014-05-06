Array.prototype.every = function() {
  return _.every.apply(_, [this].concat(_.toArray(arguments)));
};
