String.uncountableWords || Object.defineProperty(String, 'uncountableWords', {
  writeable: true,
  configurable: false,
  enumerable: false,
  value: [
    'equipment',
    'information',
    'rice',
    'money',
    'species',
    'series',
    'fish',
    'sheep',
    'moose',
    'deer',
    'news'
  ]
});

/*
  These rules translate from the singular form of a noun to its plural form.
*/
Object.defineProperty(String, 'pluralizeRules', {
  writeable: true,
  configurable: false,
  enumerable: false,
  value: [
    [new RegExp('(m)an$', 'gi'), '$1en'],
    [new RegExp('(pe)rson$', 'gi'), '$1ople'],
    [new RegExp('(child)$', 'gi'), '$1ren'],
    [new RegExp('^(ox)$', 'gi'), '$1en'],
    [new RegExp('(ax|test)is$', 'gi'), '$1es'],
    [new RegExp('(octop|vir)us$', 'gi'), '$1i'],
    [new RegExp('(alias|status)$', 'gi'), '$1es'],
    [new RegExp('(bu)s$', 'gi'), '$1ses'],
    [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
    [new RegExp('([ti])um$', 'gi'), '$1a'],
    [new RegExp('sis$', 'gi'), 'ses'],
    [new RegExp('(?:([^f])fe|([lr])?f)$', 'gi'), '$1$2ves'],
    [new RegExp('([^aeiouy]|qu)y$', 'gi'), '$1ies'],
    [new RegExp('(matr|vert|ind)(ix|ex)$', 'gi'), '$1ices'],
    [new RegExp('(x|ch|ss|sh)$', 'gi'), '$1es'],
    [new RegExp('([m|l])ouse$', 'gi'), '$1ice'],
    [new RegExp('(quiz)$', 'gi'), '$1zes'],
    [new RegExp('s$', 'gi'), 's'],
    [new RegExp('$', 'gi'), 's']
  ]
});

Underwear.defineMethod(String.prototype, 'pluralize', function(count) {
  var result;
  var word = this.toString();
  if (count) {
    count = Math.round(count);
    result = (count === 1) ? word.singularize() : word.pluralize();
  } else {
    if (_(String.uncountableWords).include(word)) {
      return word;
    }
    result = word;

    _(String.pluralizeRules).find(function(rule) {
      var regex = rule[0];
      var replacement = rule[1];
      var value = regex.test(word) ? word.replace(regex, replacement) : null;
      return value ? (result = value) : false;
    });
  }

  return result;
});
