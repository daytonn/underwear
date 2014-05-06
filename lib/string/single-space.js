String.prototype.singleSpace = function() {
  return this.trim().replace(/\s{1,}/g, " ");
};
