String.prototype.each = function(iterator) {
  return _.each.call(this, this.split(''), iterator);
};
