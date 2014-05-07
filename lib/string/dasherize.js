Underwear.defineMethod(String.prototype, 'dasherize', function() {
  return this.replace(/_/g, '-').toLowerCase();
});
