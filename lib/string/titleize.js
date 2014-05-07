Underwear.defineMethod(String.prototype, 'titleize', function() {
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
});
