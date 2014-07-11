Underwear.defineMethod(String.prototype, 'constantize', function() {
  if (this.match(/_|-|\s/)) {
    var s = _(this.split(/_|-|\s/g)).map(function(part, i) {
      return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
    }).join('');
    return s.charAt(0).toUpperCase() + s.slice(1);
  } else {
    return this.toString();
  }
});
