Underwear.defineMethod(String.prototype, 'camelize', function() {
  return _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
  }).join('');
});
