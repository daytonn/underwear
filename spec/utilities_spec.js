require("./spec_helper");
var _ = require("underscore");
require("../lib/utilities");

describe("Utilities", function() {
  describe("isTypeof", function() {
    it("can detect a string", function() {
      expect(isTypeof(String, '')).to.equal(true);
    });

    it("can distinguish between an Array and an Object", function() {
      expect(isTypeof(Array, [])).to.equal(true);
      expect(isTypeof(Object, [])).to.equal(false);
    });
  });

  describe("isNotTypeof", function() {
    it("inverts detection", function() {
      expect(isNotTypeof(Array, '')).to.equal(true);
    });

    it("can distinguish between an Array and an Object", function() {
      expect(isNotTypeof(Object, [])).to.equal(true);
      expect(isNotTypeof(Array, [])).to.equal(false);
    });
  });

  describe("isEqual", function() {
    function First() {
      this.value = 1;
    }
    First.prototype.value = 1;
    function Second() {
      this.value = 1;
    }

    Second.prototype.value = 2;

    // Basic equality and identity comparisons.
    it("should make basic equality and identity comparisons", function() {
      expect(isEqual(null, null)).to.equal(true);
      expect(isEqual()).to.equal(true);

      expect(!isEqual(0, -0)).to.equal(true);
      expect(!isEqual(-0, 0)).to.equal(true);
      expect(!isEqual(null, undefined)).to.equal(true);
      expect(!isEqual(undefined, null)).to.equal(true);
    });

    it("should make String object and primitive comparisons", function() {
      expect(isEqual("Curly", "Curly")).to.equal(true);
      expect(isEqual(new String("Curly"), new String("Curly"))).to.equal(true);
      expect(isEqual(new String("Curly"), "Curly")).to.equal(true);
      expect(isEqual("Curly", new String("Curly"))).to.equal(true);

      expect(isEqual("Curly", "Larry")).to.equal(false);
      expect(isEqual(new String("Curly"), new String("Larry"))).to.equal(false);
      expect(isEqual(new String("Curly"), {toString: function(){ return "Curly"; }})).to.equal(false);
    });

    it("should make Number object and primitive comparisons", function() {
      expect(isEqual(75, 75)).to.equal(true);
      expect(isEqual(new Number(75), new Number(75))).to.equal(true);
      expect(isEqual(75, new Number(75))).to.equal(true);
      expect(isEqual(new Number(75), 75)).to.equal(true);
      expect(isEqual(new Number(0), -0)).to.equal(false);
      expect(isEqual(0, new Number(-0))).to.equal(false);

      expect(isEqual(new Number(75), new Number(63))).to.equal(false);
      expect(isEqual(new Number(63), {valueOf: function(){ return 63; }})).to.equal(false);
    });

    it("should make Comparisons involving `NaN`", function() {
      expect(isEqual(NaN, NaN)).to.equal(true);
      expect(isEqual(61, NaN)).to.equal(false);
      expect(isEqual(new Number(79), NaN)).to.equal(false);
      expect(isEqual(Infinity, NaN)).to.equal(false);
    });

    it("should make Boolean object and primitive comparisons", function() {
      expect(isEqual(true, true)).to.equal(true);
      expect(isEqual(new Boolean, new Boolean)).to.equal(true);
      expect(isEqual(true, new Boolean(true))).to.equal(true);
      expect(isEqual(new Boolean(true), true)).to.equal(true);
      expect(isEqual(new Boolean(true), new Boolean)).to.equal(false);
    });

    it("should make Common type coercions", function() {
      expect(isEqual(true, new Boolean(false))).to.equal(false);
      expect(isEqual("75", 75)).to.equal(false);
      expect(isEqual(new Number(63), new String(63))).to.equal(false);
      expect(isEqual(75, "75")).to.equal(false);
      expect(isEqual(0, "")).to.equal(false);
      expect(isEqual(1, true)).to.equal(false);
      expect(isEqual(new Boolean(false), new Number(0))).to.equal(false);
      expect(isEqual(false, new String(""))).to.equal(false);
      expect(isEqual(12564504e5, new Date(2009, 9, 25))).to.equal(false);
    });

    it("should make Date comparisons", function() {
      expect(isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25))).to.equal(true);
      expect(isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13))).to.equal(false);
      expect(isEqual(new Date(2009, 11, 13), {
        getTime: function(){
          return 12606876e5;
        }
      })).to.equal(false);
      expect(isEqual(new Date("Curly"), new Date("Curly"))).to.equal(false);
    });

    it("should make Function comparisons", function() {
      expect(isEqual(First, Second)).to.equal(false);
    });

    it("should make RegExps comparisons", function() {
      expect(isEqual(/(?:)/gim, /(?:)/gim)).to.equal(true);
      expect(isEqual(/(?:)/g, /(?:)/gi)).to.equal(false);
      expect(isEqual(/Moe/gim, /Curly/gim)).to.equal(false);
      expect(isEqual(/(?:)/gi, /(?:)/g)).to.equal(false);
      expect(isEqual(/Curly/g, {source: "Larry", global: true, ignoreCase: false, multiline: false})).to.equal(false);
    });

    it("should make Empty arrays, array-like objects, and object literal comparisons", function() {
      expect(isEqual({}, {})).to.equal(true);
      expect(isEqual([], [])).to.equal(true);
      expect(isEqual([{}], [{}])).to.equal(true);
      expect(isEqual({length: 0}, [])).to.equal(false);
      expect(isEqual([], {length: 0})).to.equal(false);
      expect(isEqual({}, [])).to.equal(false);
      expect(isEqual([], {})).to.equal(false);
    });

    it("should compare Arrays with primitive and object values", function() {
      expect(isEqual([1, "Larry", true], [1, "Larry", true])).to.equal(true);
      expect(isEqual([(/Moe/g), new Date(2009, 9, 25)], [(/Moe/g), new Date(2009, 9, 25)])).to.equal(true);
    });

    it("should compare Multi-dimensional arrays", function() {
      var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
      var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
      expect(isEqual(a, b)).to.equal(true);
    });

    it("should compare Array elements and properties", function() {
      var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
      var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
      a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
      b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

      expect(isEqual(a, b)).to.equal(true);
      a.push("White Rocks");
      expect(isEqual(a, b)).to.equal(false);
      a.push("East Boulder");
      b.push("Gunbarrel Ranch", "Teller Farm");
      expect(isEqual(a, b)).to.equal(false);
    });

    it("should compare Simple objects", function() {
      expect(isEqual({a: "Curly", b: 1, c: true}, {a: "Curly", b: 1, c: true})).to.equal(true);
      expect(isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)})).to.equal(true);
      expect(isEqual({a: 63, b: 75}, {a: 61, b: 55})).to.equal(false);
      expect(isEqual({a: 63, b: 75}, {a: 61, c: 55})).to.equal(false);
      expect(isEqual({a: 1, b: 2}, {a: 1})).to.equal(false);
      expect(isEqual({a: 1}, {a: 1, b: 2})).to.equal(false);
      expect(isEqual({x: 1, y: undefined}, {x: 1, z: 2})).to.equal(false);
    });

    it("should compare nested objects", function() {
      // `A` contains nested objects and arrays.
      a = {
        name: new String("Moe Howard"),
        age: new Number(77),
        stooge: true,
        hobbies: ["acting"],
        film: {
          name: "Sing a Song of Six Pants",
          release: new Date(1947, 9, 30),
          stars: [new String("Larry Fine"), "Shemp Howard"],
          minutes: new Number(16),
          seconds: 54
        }
      };

      // `B` contains equivalent nested objects and arrays.
      b = {
        name: new String("Moe Howard"),
        age: new Number(77),
        stooge: true,
        hobbies: ["acting"],
        film: {
          name: "Sing a Song of Six Pants",
          release: new Date(1947, 9, 30),
          stars: [new String("Larry Fine"), "Shemp Howard"],
          minutes: new Number(16),
          seconds: 54
        }
      };
      expect(isEqual(a, b)).to.equal(true);
    });

    it("should compare Instances", function() {
      expect(isEqual(new First, new First)).to.equal(true);
      expect(isEqual(new First, new Second)).to.equal(false);
      expect(isEqual({value: 1}, new First)).to.equal(false);
      expect(isEqual({value: 2}, new Second)).to.equal(false);
    });

    it("should compare Circular Arrays", function() {
      (a = []).push(a);
      (b = []).push(b);
      expect(isEqual(a, b)).to.equal(true);
      a.push(new String("Larry"));
      b.push(new String("Larry"));
      expect(isEqual(a, b)).to.equal(true);
      a.push("Shemp");
      b.push("Curly");
      expect(isEqual(a, b)).to.equal(false);
    });

    it("should compare Circular Objects", function() {
      a = {abc: null};
      b = {abc: null};
      a.abc = a;
      b.abc = b;
      expect(isEqual(a, b)).to.equal(true);
      a.def = 75;
      b.def = 75;
      expect(isEqual(a, b)).to.equal(true);
      a.def = new Number(75);
      b.def = new Number(63);
      expect(isEqual(a, b)).to.equal(false);
    });

    it("should compare Cyclic Structures", function() {
      a = [{abc: null}];
      b = [{abc: null}];
      (a[0].abc = a).push(a);
      (b[0].abc = b).push(b);
      expect(isEqual(a, b)).to.equal(true);
      a[0].def = "Larry";
      b[0].def = "Larry";
      expect(isEqual(a, b)).to.equal(true);
      a[0].def = new String("Larry");
      b[0].def = new String("Curly");
      expect(isEqual(a, b)).to.equal(false);
    });

    it("should compare Complex Circular References", function() {
      a = {foo: {b: {foo: {c: {foo: null}}}}};
      b = {foo: {b: {foo: {c: {foo: null}}}}};
      a.foo.b.foo.c.foo = a;
      b.foo.b.foo.c.foo = b;
      expect(isEqual(a, b)).to.equal(true);
    });

    it("should compare Chained object", function() {
      expect(isEqual(_({x: 1, y: undefined}).chain(), _({x: 1, z: 2}).chain())).to.equal(false);
      expect(_({x: 1, y: 2}).chain().isEqual(_({x: 1, y: 2}).chain()).value()).to.equal(true);
    });
  });

  describe("isEmpty", function() {
    it("should test strings for emptiness", function() {
      expect(''.isEmpty()).to.equal(true);
      expect('moe'.isEmpty()).to.equal(false);
    });
  });

  describe("isElement", function() {
    xit("should test for Elements", function() {
      expect(isElement('div')).to.equal(false);
      var element = document.getElementsByTagName ? document.getElementsByTagName('div')[0]
      : document.body.firstChild;

      expect(isElement(element)).to.equal(false);
    });
  });

  describe("isArguments", function() {
    it("should test for arguments", function() {
      var args = (function(){ return arguments; })(1, 2, 3);
      expect(isArguments('string')).to.equal(false);
      expect(isArguments(_.isArguments)).to.equal(false);
      expect(isArguments(args)).to.equal(true);
      expect(isArguments(_.toArray(args))).to.equal(false);
      expect(isArguments([1,2,3])).to.equal(false);
    });
  });

  describe("isObject", function() {
    it("should test for objects", function() {
      expect(isObject(arguments)).to.equal(true);
      expect(isObject([1, 2, 3])).to.equal(true);
      // expect(isObject(document.body)).to.equal(false);
      expect(isObject(function () {})).to.equal(true);
      expect(isObject(null)).to.equal(false);
      expect(isObject(undefined)).to.equal(false);
      expect(isObject('string')).to.equal(false);
      expect(isObject(12)).to.equal(false);
      expect(isObject(true)).to.equal(false);
      expect(isObject(new String('string'))).to.equal(true);
    });
  });

  describe("isArray", function() {
    it("should test for arrays", function() {
      expect(isArray(arguments)).to.equal(false);
      expect(isArray([1, 2, 3])).to.equal(true);
    });
  });

  describe("isString", function() {
    it("should test for strings", function() {
      // expect(_.isString(document.body)).to.equal(false);
      expect(_.isString([1, 2, 3].join(', '))).to.equal(true);
    });
  });

  describe("isNumber", function() {
    it("should test for numbers", function() {
      expect(isNumber('string')).to.equal(false);
      expect(isNumber(arguments)).to.equal(false);
      expect(isNumber(undefined)).to.equal(false);
      expect(isNumber(3 * 4 - 7 / 10)).to.equal(true);
      expect(isNumber(NaN)).to.equal(true);
      expect(isNumber(Infinity)).to.equal(true);
      expect(isNumber('1')).to.equal(false);
    });
  });

  describe("isBoolean", function() {
    it("should test for boolean values", function() {
      expect(isBoolean(2)).to.equal(false);
      expect(isBoolean("string")).to.equal(false);
      expect(isBoolean("false")).to.equal(false);
      expect(isBoolean("true")).to.equal(false);
      expect(isBoolean(arguments)).to.equal(false);
      expect(isBoolean(undefined)).to.equal(false);
      expect(isBoolean(NaN)).to.equal(false);
      expect(isBoolean(null)).to.equal(false);
      expect(isBoolean(true)).to.equal(true);
      expect(isBoolean(false)).to.equal(true);
    });
  });

  describe("isFunction", function() {
    it("should test for functions", function() {
      expect(isFunction([1, 2, 3])).to.equal(false);
      expect(isFunction('moe')).to.equal(false);
      expect(isFunction(_.isFunction)).to.equal(true);
    });
  });

  describe("isDate", function() {
    it("should test for dates", function() {
      expect(isDate(100)).to.equal(false);
      expect(isDate({})).to.equal(false);
      expect(isDate(new Date())).to.equal(true);
    });
  });

  describe("isRegExp", function() {
    it("should test for regex's", function() {
      expect(isRegExp(_.identity)).to.equal(false);
      expect(isRegExp(/regex/)).to.equal(true);
    });
  });

  describe("isNaN", function() {
    it("should test for NaN", function() {
      expect(isNaN(undefined)).to.equal(false);
      expect(isNaN(null)).to.equal(false);
      expect(isNaN(0)).to.equal(false);
      expect(isNaN(NaN)).to.equal(true);
    });
  });

  describe("isNull", function() {
    it("test for null", function() {
      expect(isNull(undefined)).to.equal(false);
      expect(isNull(NaN)).to.equal(false);
      expect(isNull(null)).to.equal(true);
    });
  });

  describe("isUndefined", function() {
    it("should test for undefined", function() {
      var undef;
      var assigned = 'assigned';
      expect(isUndefined(1)).to.equal(false);
      expect(isUndefined(null)).to.equal(false);
      expect(isUndefined(false)).to.equal(false);
      expect(isUndefined(NaN)).to.equal(false);
      expect(isUndefined()).to.equal(true);
      expect(isUndefined(undefined)).to.equal(true);
      expect(isUndefined(undef)).to.equal(true);
      expect(isUndefined(assigned)).to.equal(false);
    });
  });

  describe("isDefined", function() {
    it("should test for undefined", function() {
      var undef;
      var assigned = 'assigned';
      expect(isDefined(1)).to.equal(true);
      expect(isDefined(null)).to.equal(true);
      expect(isDefined(false)).to.equal(true);
      expect(isDefined(NaN)).to.equal(true);
      expect(isDefined()).to.equal(false);
      expect(isDefined(undefined)).to.equal(false);
      expect(isDefined(undef)).to.equal(false);
      expect(isDefined(assigned)).to.equal(true);
    });
  });

  describe("sequence", function() {
    it("should generate sequential numbers", function() {
      Array.range(1, 10).each(function(i) {
        expect(sequence()).to.equal(i.toString());
      });
    });

    it("should generate sequential numbers with a prefix", function() {
      expect(sequence('test_')).to.equal('test_10');
    });
  });

});
