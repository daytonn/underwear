String.prototype.strip = function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
};
