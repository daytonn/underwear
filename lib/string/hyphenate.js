Underwear.defineMethod(String.prototype, 'hyphenate', function() {
  return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
});
