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

Underwear.defineMethod(Array.prototype, 'all', function() {
  return _.all.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'any', function() {
  return _.any.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'collect', function() {
  return _.collect.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'compact', function() {
  return _.compact.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'contains', function() {
  return _.contains.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'countBy', function() {
  return _.countBy.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'detect', function() {
  return _.detect.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'difference', function() {
  return _.difference.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'each', function() {
  return _.each.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'every', function() {
  return _.every.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'filter', function() {
  return _.filter.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'find', function() {
  return _.find.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'first', function() {
  return _.first.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'flatten', function() {
  return _.flatten.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'foldr', function() {
  return _.foldr.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'groupBy', function() {
  return _.groupBy.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'include', function() {
  return _.include.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'indexOf', function() {
  return _.indexOf.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'initial', function() {
  return _.initial.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'inject', function() {
  return _.inject.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'intersection', function() {
  return _.intersection.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'invoke', function() {
  return _.invoke.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'isEmpty', function() {
  return _.isEmpty.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'isNotEmpty', function() {
  return !_.isEmpty.call(this, this);
});

Underwear.defineMethod(Array.prototype, 'lastIndexOf', function() {
  return _.lastIndexOf.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'last', function() {
  return _.last.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'map', function() {
  return _.map.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'max', function() {
  return _.max.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'min', function() {
  return _.min.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'pluck', function() {
  return _.pluck.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array, 'range', function() {
  return _.range.apply([], arguments);
});

Underwear.defineMethod(Array.prototype, 'reduceRight', function() {
  return _.reduceRight.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'reduce', function() {
  return _.reduce.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'reject', function() {
  return _.reject.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'rest', function() {
  return _.rest.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'second', function() {
  return this[1];
});

Underwear.defineMethod(Array.prototype, 'select', function() {
  return _.select.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'shuffle', function() {
  return _.shuffle.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'size', function() {
  return _.size.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'some', function() {
  return _.some.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'sortBy', function() {
  return _.sortBy.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'sortedIndex', function() {
  return _.sortedIndex.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'sum', function() {
  // `[1, 2, 3].sum(); // 6`
  return _.reduce(this, function(memo, num) {
    return memo + num;
  }, 0);
});

Underwear.defineMethod(Array.prototype, 'tail', function() {
  return _.tail.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'take', function() {
  return _.take.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'third', function() {
  return this[2];
});

Underwear.defineMethod(Array.prototype, 'union', function() {
  return _.union.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'uniq', function() {
  return _.uniq.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'without', function() {
  return _.without.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Array.prototype, 'zip', function() {
  return _.zip.apply(_, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_clone', function() {
  return _.clone.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_defaults', function() {
  return _.defaults.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_extend', function() {
  return _.extend.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_functions', function() {
  return _.functions.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_keys', function() {
  return _.keys.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_map', function() {
  return _.map.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_omit', function() {
  return _.omit.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_pairs', function() {
  return _.pairs.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_pick', function() {
  return _.pick.apply(this, [this].concat(_.toArray(arguments)));
});

Underwear.defineMethod(Object.prototype, '_values', function() {
  return _.values.apply(this, [this].concat(_.toArray(arguments)));
});

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

isArguments = _.isArguments;

isArray = _.isArray;

isBoolean = _.isBoolean;

isDate = _.isDate;

isDefined = function (suspect) {
  return !_.isUndefined(suspect);
};

isElement = _.isElement;

isEmpty = function(suspect) {
  return !!!(suspect && suspect.length > 0);
};

isEqual = _.isEqual;

isFunction = _.isFunction;

isNaN = _.isNaN;

isNotTypeof = function (constructor, suspect) {
  return suspect.constructor !== constructor;
};

isNull = _.isNull;

isNumber = _.isNumber;

isObject = _.isObject;

isRegExp = _.isRegExp;


isString = _.isString;

isTypeof = function (constructor, suspect) {
  return suspect.constructor === constructor;
};

isUndefined = _.isUndefined;

sequence = _.uniqueId;
