
function isTypeOf(constructor, suspect) {
  return suspect.constructor == constructor;
}

function isNotTypeOf(constructor, suspect) {
  return suspect.constructor != constructor;
}
(function() {

  var methods = [
    "all",
    "any",
    "collect",
    "compact",
    "contains",
    "countBy",
    "detect",
    "difference",
    "each",
    "every",
    "filter",
    "find",
    "first",
    "flatten",
    "foldr",
    "groupBy",
    "include",
    "indexOf",
    "initial",
    "inject",
    "intersection",
    "invoke",
    "isEmpty",
    "last",
    "lastIndexOf",
    "map",
    "max",
    "min",
    "pluck",
    "reduce",
    "reduceRight",
    "reject",
    "rest",
    "select",
    "shuffle",
    "size",
    "some",
    "sortBy",
    "sortedIndex",
    "tail",
    "take",
    "toArray",
    "union",
    "uniq",
    "without",
    "zip"
  ];


  _.each(methods, function(method) {
    if (Array.prototype[method]) { return; }
    Array.prototype[method] = function() {
      return _[method].apply(_, [this].concat(_.toArray(arguments)));
    };
  });


  if (!Array.range) {
    Array.range = function() {
      return _.range.apply([], arguments);
    }
  }

  var nativeMethods = [
    {
        func: Array.prototype.forEach,
        alias: 'each'
    }
  ];

  _.each(nativeMethods, function(nativeMethod) {
    if (nativeMethod.func) {
        Array.prototype[nativeMethod.alias] = nativeMethod.func;
    }
  });


  if (typeof Array.prototype.isEmpty === "undefined") {
      Array.prototype.isEmpty = function() {
          return _.isEmpty.call(this, this);
      };
  }

})();
(function() {

    var methods = [
      'all',
      'any',
      'bindAll',
      'clone',
      'collect',
      'defaults',
      'detect',
      'every',
      'filter',
      'find',
      'foldr',
      'groupBy',
      'has',
      'include',
      'inject',
      'invoke',
      'keys',
      'map',
      'max',
      'min',
      'pick',
      'pluck',
      'reduce',
      'reduceRight',
      'reject',
      'select',
      'shuffle',
      'some',
      'sortBy',
      'values'
    ];

    _.each(methods, function(method) {
      if (Object.prototype[method]) { return; }
      Object.prototype[method] = function() {
        return _[method].apply(this, [this].concat(_.toArray(arguments)));
      };
    });

    Object.prototype.functions = function() {
      return _(_.functions.call(this, this)).reject(customDefinedMethods);
    };

    Object.prototype.methods = function() {
      var m = [];
      for (var prop in Object.prototype) {
        if (this[prop].constructor == Function) {
          m.push(prop);
        }
      }
      return m;
    };

    Object.prototype.merge = function() {
      return _.extend.apply(this, [this].concat(_.toArray(arguments)));
    };


    if (typeof Object.prototype.isEmpty === "undefined") {
        Object.prototype.isEmpty = function() {
            return _.isEmpty.call(this, this);
        };
    }

    if (typeof Object.prototype.tap === "undefined") {
        Object.prototype.tap = function() {
            return _.tap.apply(this, [this].concat(_.toArray(arguments)));
        };
    }

    function customDefinedMethods(func) {
      var custom_methods = [methods, 'functions', 'methods', 'merge', 'each', 'forEach', 'isEmpty', 'tap'].flatten();
      return _(custom_methods).contains(func);
    }

})();
(function() {

    var methods = [
        'bind',
        'compose',
        'debounce',
        'defer',
        'delay',
        'memoize',
        'once',
        'throttle',
        'wrap'
    ];

    _.each(methods, function(method) {
      if (!Function.prototype[method]) {
          Function.prototype[method] = function() {
            return _[method].apply(this, [this].concat(_.toArray(arguments)));
          };
      }
    });

})();
var Template = (function() {

    function Template(src) {
        if (src.match(/^#/)) {
            this.src = document.getElementById(src.replace(/^#/, '')).innerHTML;
        }
        else {
            this.src = src;
        }
    }

    Template.prototype.render = function(data, settings) {
        return _.template(this.src, data, settings);
    };

    return Template;
})();
isEqual = _.isEqual;

isArguments = _.isArguments;

isObject = _.isObject;

isArray = _.isArray;

isString = _.isString;

isNumber = _.isNumber;

isBoolean = _.isBoolean;

isFunction = _.isFunction;

isDate = _.isDate;

isRegExp = _.isRegExp;

isNaN = _.isNaN;

isNull = _.isNull;

isElement = _.isElement;

isUndefined = _.isUndefined;

isUndefined = _.isUndefined;

sequence = _.uniqueId;

function uid () {

    function S4() {
       return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1);
    }

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();

};

var isDefined = function(suspect) {
    return !_.isUndefined(suspect);
}

if (typeof String.prototype.isEmpty === "undefined") {
    String.prototype.isEmpty = function() {
        return _.isEmpty(this);
    };
}

if (typeof String.prototype.escape === "undefined") {
    String.prototype.escape = function() {
        return _.escape.apply(this, [this].concat(_.toArray(arguments)));
    };
}
