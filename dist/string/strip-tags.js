Underwear.defineMethod(String.prototype, 'stripTags', function() {
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
});
