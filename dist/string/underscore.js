Underwear.defineMethod(String.prototype, 'underscore', function() {
  return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
});
