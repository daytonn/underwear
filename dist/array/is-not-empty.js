Array.prototype.isNotEmpty = function() {
  return !_.isEmpty.call(this, this);
};
