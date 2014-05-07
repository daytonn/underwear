Underwear.defineMethod(String.prototype, 'trim', function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
});
