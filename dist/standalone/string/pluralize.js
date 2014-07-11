//### defineProperty polyfill
// Blatantly stolen from [https://github.com/inexorabletash/polyfill](https://github.com/inexorabletash/polyfill)
// ES 15.2.3.6 Object.defineProperty ( O, P, Attributes )
// Partial support for most common case - getters, setters, and values
if (!Object.defineProperty || !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (e) { return false; } } ())) {
  var orig = Object.defineProperty;
  Object.defineProperty = function (o, prop, desc) {
    // In IE8 try built-in implementation for defining properties on DOM prototypes.
    if (orig) {
      try { return orig(o, prop, desc); } catch (e) {}
    }
    if (o !== Object(o)) { throw new Error("Object.defineProperty called on non-object"); }
    if (Object.prototype.__defineGetter__ && ('get' in desc)) {
      Object.prototype.__defineGetter__.call(o, prop, desc.get);
    }
    if (Object.prototype.__defineSetter__ && ('set' in desc)) {
      Object.prototype.__defineSetter__.call(o, prop, desc.set);
    }
    if ('value' in desc) {
      o[prop] = desc.value;
    }
    return o;
  };
}

var Underwear = Underwear || {
  version: '2.0.6',

  //### defineMethod
  // Defines a method on the given object with the defineProperty
  // method with the appropriate properties for an inherited method
  //
  // `uw.defineMethod(Object.prototype, "foo", function() {});`
  defineMethod: function(prototype, method, func) {
    if (!prototype[method]) {
      Object.defineProperty(prototype, method, {
        writeable: false,
        configurable: false,
        enumerable: false,
        value: func
      });
    }
  },

  //### defineMethod
  // Defines an alias of a given method on the given object
  // with the defineProperty method with the appropriate
  // properties for an inherited method
  //
  // `uw.defineAlias(Array.prototype, "reverse", "backwards");`
  defineAlias: function(prototype, method, alias) {
    if (prototype[method]) {
      Object.defineProperty(prototype, alias, {
        writeable: false,
        configurable: false,
        enumerable: false,
        value: prototype[method]
      });
    }
  }
};

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
