Underwear.defineMethod(String.prototype, 'toNumber', function() {
  return this * 1 || 0;
});
