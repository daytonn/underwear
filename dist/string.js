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
  version: '2.0.4',

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

Underwear.defineMethod(String.prototype, 'camelize', function() {
  return _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
  }).join('');
});

Underwear.defineMethod(String.prototype, 'capitalize', function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
});

Underwear.defineMethod(String.prototype, 'chunk', function(chunkSize) {
  chunkSize = chunkSize ? chunkSize : this.length;
  return this.match(new RegExp('.{1,' + chunkSize + '}', 'g'));
});

Underwear.defineMethod(String.prototype, 'compact', function() {
  return this.replace(/\s/g, "");
});

Underwear.defineMethod(String.prototype, 'constantize', function() {
  var s = _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
  }).join('');
  return s.charAt(0).toUpperCase() + s.slice(1);
});

Underwear.defineMethod(String.prototype, 'dasherize', function() {
  return this.replace(/_/g, '-').toLowerCase();
});

Underwear.defineMethod(String.prototype, 'each', function(iterator) {
  return _.each.call(this, this.split(''), iterator);
});

Underwear.defineMethod(String.prototype, 'escape', function() {
  return _.escape.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(String.prototype, 'humanize', function() {
  var s = this.replace(/_/g, ' ').replace(/^\s?/, "").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
});

Underwear.defineMethod(String.prototype, 'hyphenate', function() {
  return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
});

Underwear.defineMethod(String.prototype, 'includes', function(string) {
  var s = new RegExp(string, 'g');
  return !!this.match(s);
});

Underwear.defineMethod(String.prototype, 'isBlank', function() {
  return (/^(\s?)+$/).test(this);
});

Underwear.defineMethod(String.prototype, 'isEmpty', function() {
  return this.length === 0;
});

Underwear.defineMethod(String.prototype, 'isNotEmpty', function() {
  return this.length > 0;
});

Underwear.defineMethod(String.prototype, 'isPresent', function() {
  return !(/^(\s?)+$/).test(this);
});

Underwear.defineMethod(String.prototype, 'lstrip', function() {
  return this.replace(/^\s+/, "");
});

Underwear.defineMethod(String.prototype, 'ltrim', function() {
  return this.replace(/^\s+/, "");
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

Underwear.defineMethod(String.prototype, 'rstrip', function() {
  return this.replace(/\s+$/, "");
});

Underwear.defineMethod(String.prototype, 'rtrim', function() {
  return this.replace(/\s+$/, "");
});

Underwear.defineMethod(String.prototype, 'singleSpace', function() {
  return this.trim().replace(/\s{1,}/g, " ");
});

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


Underwear.defineMethod(String.prototype, 'stripTags', function() {
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
});

Underwear.defineMethod(String.prototype, 'strip', function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
});

Underwear.defineMethod(String.prototype, 'swapCase', function() {
  return this.replace(/[A-Za-z]/g, function(s) {
    return (/[A-Z]/).test(s) ? s.toLowerCase() : s.toUpperCase();
  });
});

Underwear.defineMethod(String.prototype, 'titleCase', function() {
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
});

Underwear.defineMethod(String.prototype, 'titleize', function() {
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
});

Underwear.defineMethod(String.prototype, 'toBoolean', function() {
  var truthyStrings = ["true", "yes", "on", "y"];
  var falseyStrings = ["false", "no", "off", "n"];
  if (_(truthyStrings).contains(this.toLowerCase())) {
    return true;
  } else if (_(falseyStrings).contains(this.toLowerCase())) {
    return false;
  } else {
    return this.length > 0 ? true : false;
  }
});

Underwear.defineMethod(String.prototype, 'toNumber', function() {
  return this * 1 || 0;
});

Underwear.defineMethod(String.prototype, 'trim', function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
});

Underwear.defineMethod(String.prototype, 'truncate', function(length) {
  return (this.length > length) ? this.substring(0, length) + '...' : this;
});

Underwear.defineMethod(String.prototype, 'underscore', function() {
  return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
});

Underwear.defineMethod(String.prototype, 'unescape', function() {
  return _.unescape.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(String.prototype, 'unwrap', function(wrapper) {
  return this.replace(new RegExp("^" + wrapper + "(.+)" + wrapper + "$"), "$1");
});

Underwear.defineMethod(String.prototype, 'wordCount', function(word) {
  var matches;
  var string = this.stripTags();
  matches = (word) ? string.match(new RegExp(word, "g")) : string.match(/\b[A-Za-z_]+\b/g);
  return matches ? matches.length : 0;
});

Underwear.defineMethod(String.prototype, 'wrap', function(wrapper) {
  return wrapper.concat(this, wrapper);
});
