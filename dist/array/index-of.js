Array.prototype.indexOf = function() {
  return _.indexOf.apply(_, [this].concat(_.toArray(arguments)));
};
