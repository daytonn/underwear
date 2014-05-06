Object.prototype._clone = function() {
  return _.clone.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._defaults = function() {
  return _.defaults.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._extend = function() {
  return _.extend.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._functions = function() {
  return _(_.functions.apply(this, [this].concat(_.toArray(arguments)))).reject(function(func) {
    return _([
      '_keys', '_values', '_pairs', '_invert',
      '_functions', '_pick', '_omit', '_defaults', '_map',
      "_clone",
      "_defined",
      "_dup",
      "_extend",
      "_has",
      "_mixin"
    ]).contains(func);
  });
};

Object.prototype._has = function() {
  return _.has.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._invert = function() {
  return _.invert.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._keys = function() {
  return _.keys.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._map = function() {
  return _.map.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._omit = function() {
  return _.omit.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._pairs = function() {
  return _.pairs.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._pick = function() {
  return _.pick.apply(this, [this].concat(_.toArray(arguments)));
};

Object.prototype._values = function() {
  return _.values.apply(this, [this].concat(_.toArray(arguments)));
};
