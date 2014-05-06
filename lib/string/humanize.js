String.prototype.humanize = function() {
  var s = this.replace(/_/g, ' ').replace(/^\s?/, "").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
