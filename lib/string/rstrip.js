Underwear.defineMethod(String.prototype, 'rstrip', function() {
  return this.replace(/\s+$/, "");
});
