describe("Utilities", function() {

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
            expect(isEqual(null, null)).toBeTrue();
            expect(isEqual()).toBeTrue();

            expect(!isEqual(0, -0)).toBeTrue();
            expect(!isEqual(-0, 0)).toBeTrue();
            expect(!isEqual(null, undefined)).toBeTrue();
            expect(!isEqual(undefined, null)).toBeTrue();
        });

        it("should make String object and primitive comparisons", function() {
            expect(isEqual("Curly", "Curly")).toBeTrue();
            expect(isEqual(new String("Curly"), new String("Curly"))).toBeTrue();
            expect(isEqual(new String("Curly"), "Curly")).toBeTrue();
            expect(isEqual("Curly", new String("Curly"))).toBeTrue();

            expect(!isEqual("Curly", "Larry")).toBeTrue();
            expect(!isEqual(new String("Curly"), new String("Larry"))).toBeTrue();
            expect(!isEqual(new String("Curly"), {toString: function(){ return "Curly"; }})).toBeTrue();
        });

        it("should make Number object and primitive comparisons", function() {
            expect(isEqual(75, 75)).toBeTrue();
            expect(isEqual(new Number(75), new Number(75))).toBeTrue();
            expect(isEqual(75, new Number(75))).toBeTrue();
            expect(isEqual(new Number(75), 75)).toBeTrue();
            expect(!isEqual(new Number(0), -0)).toBeTrue();
            expect(!isEqual(0, new Number(-0))).toBeTrue();

            expect(!isEqual(new Number(75), new Number(63))).toBeTrue();
            expect(!isEqual(new Number(63), {valueOf: function(){ return 63; }})).toBeTrue();
        });

        it("should make Comparisons involving `NaN`", function() {
            expect(isEqual(NaN, NaN)).toBeTrue();
            expect(!isEqual(61, NaN)).toBeTrue();
            expect(!isEqual(new Number(79), NaN)).toBeTrue();
            expect(!isEqual(Infinity, NaN)).toBeTrue();
        });

        it("should make Boolean object and primitive comparisons", function() {
            expect(isEqual(true, true)).toBeTrue();
            expect(isEqual(new Boolean, new Boolean)).toBeTrue();
            expect(isEqual(true, new Boolean(true))).toBeTrue();
            expect(isEqual(new Boolean(true), true)).toBeTrue();
            expect(!isEqual(new Boolean(true), new Boolean)).toBeTrue();
        });

        it("should make Common type coercions", function() {
            expect(!isEqual(true, new Boolean(false))).toBeTrue();
            expect(!isEqual("75", 75)).toBeTrue();
            expect(!isEqual(new Number(63), new String(63))).toBeTrue();
            expect(!isEqual(75, "75")).toBeTrue();
            expect(!isEqual(0, "")).toBeTrue();
            expect(!isEqual(1, true)).toBeTrue();
            expect(!isEqual(new Boolean(false), new Number(0))).toBeTrue();
            expect(!isEqual(false, new String(""))).toBeTrue();
            expect(!isEqual(12564504e5, new Date(2009, 9, 25))).toBeTrue();
        });

        it("should make Date comparisons", function() {
            expect(isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25))).toBeTrue();
            expect(!isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13))).toBeTrue();
            expect(!isEqual(new Date(2009, 11, 13), {
              getTime: function(){
                return 12606876e5;
              }
            })).toBeTrue();
            expect(!isEqual(new Date("Curly"), new Date("Curly"))).toBeTrue();
        });

        it("should make Function comparisons", function() {
            expect(!isEqual(First, Second)).toBeTrue();
        });

        it("should make RegExps comparisons", function() {
            expect(isEqual(/(?:)/gim, /(?:)/gim)).toBeTrue();
            expect(!isEqual(/(?:)/g, /(?:)/gi)).toBeTrue();
            expect(!isEqual(/Moe/gim, /Curly/gim)).toBeTrue();
            expect(!isEqual(/(?:)/gi, /(?:)/g)).toBeTrue();
            expect(!isEqual(/Curly/g, {source: "Larry", global: true, ignoreCase: false, multiline: false})).toBeTrue();
        });

        it("should make Empty arrays, array-like objects, and object literal comparisons", function() {
            expect(isEqual({}, {})).toBeTrue();
            expect(isEqual([], [])).toBeTrue();
            expect(isEqual([{}], [{}])).toBeTrue();
            expect(!isEqual({length: 0}, [])).toBeTrue();
            expect(!isEqual([], {length: 0})).toBeTrue();
            expect(!isEqual({}, [])).toBeTrue();
            expect(!isEqual([], {})).toBeTrue();
        });

        it("should compare Arrays with primitive and object values", function() {
            expect(isEqual([1, "Larry", true], [1, "Larry", true])).toBeTrue();
            expect(isEqual([(/Moe/g), new Date(2009, 9, 25)], [(/Moe/g), new Date(2009, 9, 25)])).toBeTrue();
        });

        it("should compare Multi-dimensional arrays", function() {
            var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            expect(isEqual(a, b)).toBeTrue();
        });

        it("should compare Array elements and properties", function() {
            var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
            b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

            expect(isEqual(a, b)).toBeTrue();
            a.push("White Rocks");
            expect(!isEqual(a, b)).toBeTrue();
            a.push("East Boulder");
            b.push("Gunbarrel Ranch", "Teller Farm");
            expect(!isEqual(a, b)).toBeTrue();
        });

        it("should compare Simple objects", function() {
            expect(isEqual({a: "Curly", b: 1, c: true}, {a: "Curly", b: 1, c: true})).toBeTrue();
            expect(isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)})).toBeTrue();
            expect(!isEqual({a: 63, b: 75}, {a: 61, b: 55})).toBeTrue();
            expect(!isEqual({a: 63, b: 75}, {a: 61, c: 55})).toBeTrue();
            expect(!isEqual({a: 1, b: 2}, {a: 1})).toBeTrue();
            expect(!isEqual({a: 1}, {a: 1, b: 2})).toBeTrue();
            expect(!isEqual({x: 1, y: undefined}, {x: 1, z: 2})).toBeTrue();
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
            expect(isEqual(a, b)).toBeTrue();
        });

        it("should compare Instances", function() {
            expect(isEqual(new First, new First)).toBeTrue();
            expect(!isEqual(new First, new Second)).toBeTrue();
            expect(!isEqual({value: 1}, new First)).toBeTrue();
            expect(!isEqual({value: 2}, new Second)).toBeTrue();
        });

        it("should compare Circular Arrays", function() {
            (a = []).push(a);
            (b = []).push(b);
            expect(isEqual(a, b)).toBeTrue();
            a.push(new String("Larry"));
            b.push(new String("Larry"));
            expect(isEqual(a, b)).toBeTrue();
            a.push("Shemp");
            b.push("Curly");
            expect(!isEqual(a, b)).toBeTrue();
        });

        it("should compare Circular Objects", function() {
            a = {abc: null};
            b = {abc: null};
            a.abc = a;
            b.abc = b;
            expect(isEqual(a, b)).toBeTrue();
            a.def = 75;
            b.def = 75;
            expect(isEqual(a, b)).toBeTrue();
            a.def = new Number(75);
            b.def = new Number(63);
            expect(!isEqual(a, b)).toBeTrue();
        });

        it("should compare Cyclic Structures", function() {
            a = [{abc: null}];
            b = [{abc: null}];
            (a[0].abc = a).push(a);
            (b[0].abc = b).push(b);
            expect(isEqual(a, b)).toBeTrue();
            a[0].def = "Larry";
            b[0].def = "Larry";
            expect(isEqual(a, b)).toBeTrue();
            a[0].def = new String("Larry");
            b[0].def = new String("Curly");
            expect(!isEqual(a, b)).toBeTrue();
        });

        it("should compare Complex Circular References", function() {
            a = {foo: {b: {foo: {c: {foo: null}}}}};
            b = {foo: {b: {foo: {c: {foo: null}}}}};
            a.foo.b.foo.c.foo = a;
            b.foo.b.foo.c.foo = b;
            expect(isEqual(a, b)).toBeTrue();
        });

        it("should compare Chained object", function() {
            expect(!isEqual(_({x: 1, y: undefined}).chain(), _({x: 1, z: 2}).chain())).toBeTrue();
            expect(_({x: 1, y: 2}).chain().isEqual(_({x: 1, y: 2}).chain()).value()).toBeTrue();
        });
    });

    describe("isEmpty", function() {
        it("should test strings for emptiness", function() {
            expect(''.isEmpty()).toBeTrue();
            expect('moe'.isEmpty()).toBeFalse();
        });
    });

    describe("isElement", function() {
        it("should test for Elements", function() {
            expect(isElement('div')).toBeFalse();
            var element = document.getElementsByTagName ? document.getElementsByTagName('div')[0]
                                                        : document.body.firstChild;

            expect(isElement(element)).toBeTrue();
        });
    });

    describe("isArguments", function() {
        it("should test for arguments", function() {
            var args = (function(){ return arguments; })(1, 2, 3);
            expect(isArguments('string')).toBeFalse();
            expect(isArguments(_.isArguments)).toBeFalse();
            expect(isArguments(args)).toBeTrue();
            expect(isArguments(_.toArray(args))).toBeFalse();
            expect(isArguments([1,2,3])).toBeFalse();
        });
    });

    describe("isObject", function() {
        it("should test for objects", function() {
            expect(isObject(arguments)).toBeTrue();
            expect(isObject([1, 2, 3])).toBeTrue();
            expect(isObject(document.body)).toBeTrue();
            expect(isObject(function () {})).toBeTrue();
            expect(isObject(null)).toBeFalse();
            expect(isObject(undefined)).toBeFalse();
            expect(isObject('string')).toBeFalse();
            expect(isObject(12)).toBeFalse();
            expect(isObject(true)).toBeFalse();
            expect(isObject(new String('string'))).toBeTrue();
        });
    });

    describe("isArray", function() {
        it("should test for arrays", function() {
            expect(isArray(arguments)).toBeFalse();
            expect(isArray([1, 2, 3])).toBeTrue();
        });
    });

    describe("isString", function() {
        it("should test for strings", function() {
            expect(_.isString(document.body)).toBeFalse();
            expect(_.isString([1, 2, 3].join(', '))).toBeTrue();
        });
    });

    describe("isNumber", function() {
        it("should test for numbers", function() {
            expect(isNumber('string')).toBeFalse();
            expect(isNumber(arguments)).toBeFalse();
            expect(isNumber(undefined)).toBeFalse();
            expect(isNumber(3 * 4 - 7 / 10)).toBeTrue();
            expect(isNumber(NaN)).toBeTrue();
            expect(isNumber(Infinity)).toBeTrue();
            expect(isNumber('1')).toBeFalse();
        });
    });

    describe("isBoolean", function() {
        it("should test for boolean values", function() {
            expect(isBoolean(2)).toBeFalse();
            expect(isBoolean("string")).toBeFalse();
            expect(isBoolean("false")).toBeFalse();
            expect(isBoolean("true")).toBeFalse();
            expect(isBoolean(arguments)).toBeFalse();
            expect(isBoolean(undefined)).toBeFalse();
            expect(isBoolean(NaN)).toBeFalse();
            expect(isBoolean(null)).toBeFalse();
            expect(isBoolean(true)).toBeTrue();
            expect(isBoolean(false)).toBeTrue();
        });
    });

    describe("isFunction", function() {
        it("should test for functions", function() {
            expect(isFunction([1, 2, 3])).toBeFalse();
            expect(isFunction('moe')).toBeFalse();
            expect(isFunction(_.isFunction)).toBeTrue();
        });
    });

    describe("isDate", function() {
        it("should test for dates", function() {
            expect(isDate(100)).toBeFalse();
            expect(isDate({})).toBeFalse();
            expect(isDate(new Date())).toBeTrue();
        });
    });

    describe("isRegExp", function() {
        it("should test for regex's", function() {
            expect(isRegExp(_.identity)).toBeFalse();
            expect(isRegExp(/identity/)).toBeTrue();
        });
    });

    describe("isNaN", function() {
        it("should test for NaN", function() {
            expect(isNaN(undefined)).toBeFalse();
            expect(isNaN(null)).toBeFalse();
            expect(isNaN(0)).toBeFalse();
            expect(isNaN(NaN)).toBeTrue();
        });
    });

    describe("isNull", function() {
        it("test for null", function() {
            expect(isNull(undefined)).toBeFalse();
            expect(isNull(NaN)).toBeFalse();
            expect(isNull(null)).toBeTrue();
        });
    });

    describe("isUndefined", function() {
        it("should test for undefined", function() {
            var undef;
            var assigned = 'assigned';
            expect(isUndefined(1)).toBeFalse();
            expect(isUndefined(null)).toBeFalse();
            expect(isUndefined(false)).toBeFalse();
            expect(isUndefined(NaN)).toBeFalse();
            expect(isUndefined()).toBeTrue();
            expect(isUndefined(undefined)).toBeTrue();
            expect(isUndefined(undef)).toBeTrue();
            expect(isUndefined(assigned)).toBeFalse();
        });
    });

    describe("isDefined", function() {
        it("should test for undefined", function() {
            var undef;
            var assigned = 'assigned';
            expect(isDefined(1)).toBeTrue();
            expect(isDefined(null)).toBeTrue();
            expect(isDefined(false)).toBeTrue();
            expect(isDefined(NaN)).toBeTrue();
            expect(isDefined()).toBeFalse();
            expect(isDefined(undefined)).toBeFalse();
            expect(isDefined(undef)).toBeFalse();
            expect(isDefined(assigned)).toBeTrue();
        });
    });

    describe("uid", function() {
        it("should generate 36 character quasi-unique strings", function() {
            var ids = [];
            var i = 0;
            Array.range(1, 10).map(function(id) {
                var uuid = new RegExp(/[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/);
                expect(uuid.test(uid())).toBeTrue();
                expect(uid().length).toEqual(36);
            });
        });
    });

    describe("escape", function() {
        it("should escape a string with esacapeable characters", function() {
            expect('Curly, Larry & Moe'.escape()).toEqual("Curly, Larry &amp; Moe");
        });
    });

    describe("sequence", function() {
        it("should generate sequential numbers", function() {
            Array.range(1, 10).each(function(i) {
                expect(sequence()).toEqual(i.toString());
            });
        });

        it("should generate sequential numbers with a prefix", function() {
            expect(sequence('test_')).toEqual('test_10');
        });
    });

});