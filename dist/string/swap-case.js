String.prototype.swapCase = function() {
  return this.replace(/[A-Za-z]/g, function(s) {
    return (/[A-Z]/).test(s) ? s.toLowerCase() : s.toUpperCase();
  });
};
