Underwear.defineMethod(String.prototype, 'isBlank', function() {
  return (/^(\s?)+$/).test(this);
});
