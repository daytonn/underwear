Object.prototype._defaults = function() {
  return _.defaults.apply(this, [this].concat(_.toArray(arguments)));
};
