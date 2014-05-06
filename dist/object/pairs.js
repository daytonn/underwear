Object.prototype._pairs = function() {
  return _.pairs.apply(this, [this].concat(_.toArray(arguments)));
};
