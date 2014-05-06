Object.prototype._extend = function() {
  return _.extend.apply(this, [this].concat(_.toArray(arguments)));
};
