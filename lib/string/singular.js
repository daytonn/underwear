/*
  These rules translate from the plural form of a noun to its singular form.
*/
Object.defineProperty(String, 'singularizeRules', {
  writeable: true,
  configurable: false,
  enumerable: false,
  value: [
    [new RegExp('(m)en$', 'gi'), '$1an'],
    [new RegExp('(pe)ople$', 'gi'), '$1rson'],
    [new RegExp('(child)ren$', 'gi'), '$1'],
    [new RegExp('([ti])a$', 'gi'), '$1um'],
    [new RegExp('(hive)s$', "gi"), '$1'],
    [new RegExp('(naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he|(io))ses$','gi'), '$1$2sis'],
    [new RegExp('(tive)s$', 'gi'), '$1'],
    [new RegExp('(curve)s$', 'gi'), '$1'],
    [new RegExp('([lrae])ves$', 'gi'), '$1f'],
    [new RegExp('([^fo])ves$', 'gi'), '$1fe'],
    [new RegExp('(m)ovies$', 'gi'), '$1ovie'],
    [new RegExp('([^aeiouy]|qu)ies$', 'gi'), '$1y'],
    [new RegExp('(s)eries$', 'gi'), '$1eries'],
    [new RegExp('([m|l])ice$', 'gi'), '$1ouse'],
    [new RegExp('(bus)es$', 'gi'), '$1'],
    [new RegExp('(shoe)s$', 'gi'), '$1'],
    [new RegExp('(o)es$', 'gi'), '$1'],
    [new RegExp('(cris|ax|test)es$', 'gi'), '$1is'],
    [new RegExp('(x|ch|ss|sh)es$', 'gi'), '$1'],
    [new RegExp('(octop|vir)i$', 'gi'), '$1us'],
    [new RegExp('(alias|status)es$', 'gi'), '$1'],
    [new RegExp('^(ox)en', 'gi'), '$1'],
    [new RegExp('(vert|ind)ices$', 'gi'), '$1ex'],
    [new RegExp('(matr)ices$', 'gi'), '$1ix'],
    [new RegExp('(quiz)zes$', 'gi'), '$1'],
    [new RegExp('([aiou]|s)s$', 'gi'), '$1s'],
    [new RegExp('s$', 'gi'), '']
  ]
});

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

Underwear.defineMethod(String.prototype, 'singularize', function(count) {
  var result;
  var word = this.toString();

  if (_(String.uncountableWords).include(word)) {
    return word;
  }
  result = word;

  _(String.singularizeRules).find(function(rule) {
    var regex = rule[0];
    var replacement = rule[1];
    var value = regex.test(word) ? word.replace(regex, replacement) : null;
    return value ? (result = value) : false;
  });

  return result;
});

