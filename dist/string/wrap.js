Underwear.defineMethod(String.prototype, 'wrap', function(wrapper) {
  return wrapper.concat(this, wrapper);
});
