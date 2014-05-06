Object.prototype._values = function() {
  return _.values.apply(this, [this].concat(_.toArray(arguments)));
};
