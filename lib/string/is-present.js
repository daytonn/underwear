Underwear.defineMethod(String.prototype, 'isPresent', function() {
  return !(/^(\s?)+$/).test(this);
});
