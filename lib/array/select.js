Array.prototype.select = function() {
  return _.select.apply(_, [this].concat(_.toArray(arguments)));
};
