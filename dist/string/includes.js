String.prototype.includes = function(string) {
  var s = new RegExp(string, 'g');
  return !!this.match(s);
};
