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
            expect(isEqual(null, null)).toBeTruthy();
            expect(isEqual()).toBeTruthy();

            expect(!isEqual(0, -0)).toBeTruthy();
            expect(!isEqual(-0, 0)).toBeTruthy();
            expect(!isEqual(null, undefined)).toBeTruthy();
            expect(!isEqual(undefined, null)).toBeTruthy();
        });

        it("should make String object and primitive comparisons", function() {
            expect(isEqual("Curly", "Curly")).toBeTruthy();
            expect(isEqual(new String("Curly"), new String("Curly"))).toBeTruthy();
            expect(isEqual(new String("Curly"), "Curly")).toBeTruthy();
            expect(isEqual("Curly", new String("Curly"))).toBeTruthy();

            expect(!isEqual("Curly", "Larry")).toBeTruthy();
            expect(!isEqual(new String("Curly"), new String("Larry"))).toBeTruthy();
            expect(!isEqual(new String("Curly"), {toString: function(){ return "Curly"; }})).toBeTruthy();
        });

        it("should make Number object and primitive comparisons", function() {
            expect(isEqual(75, 75)).toBeTruthy();
            expect(isEqual(new Number(75), new Number(75))).toBeTruthy();
            expect(isEqual(75, new Number(75))).toBeTruthy();
            expect(isEqual(new Number(75), 75)).toBeTruthy();
            expect(!isEqual(new Number(0), -0)).toBeTruthy();
            expect(!isEqual(0, new Number(-0))).toBeTruthy();

            expect(!isEqual(new Number(75), new Number(63))).toBeTruthy();
            expect(!isEqual(new Number(63), {valueOf: function(){ return 63; }})).toBeTruthy();
        });

        it("should make Comparisons involving `NaN`", function() {
            expect(isEqual(NaN, NaN)).toBeTruthy();
            expect(!isEqual(61, NaN)).toBeTruthy();
            expect(!isEqual(new Number(79), NaN)).toBeTruthy();
            expect(!isEqual(Infinity, NaN)).toBeTruthy();
        });

        it("should make Boolean object and primitive comparisons", function() {
            expect(isEqual(true, true)).toBeTruthy();
            expect(isEqual(new Boolean, new Boolean)).toBeTruthy();
            expect(isEqual(true, new Boolean(true))).toBeTruthy();
            expect(isEqual(new Boolean(true), true)).toBeTruthy();
            expect(!isEqual(new Boolean(true), new Boolean)).toBeTruthy();
        });

        it("should make Common type coercions", function() {
            expect(!isEqual(true, new Boolean(false))).toBeTruthy();
            expect(!isEqual("75", 75)).toBeTruthy();
            expect(!isEqual(new Number(63), new String(63))).toBeTruthy();
            expect(!isEqual(75, "75")).toBeTruthy();
            expect(!isEqual(0, "")).toBeTruthy();
            expect(!isEqual(1, true)).toBeTruthy();
            expect(!isEqual(new Boolean(false), new Number(0))).toBeTruthy();
            expect(!isEqual(false, new String(""))).toBeTruthy();
            expect(!isEqual(12564504e5, new Date(2009, 9, 25))).toBeTruthy();
        });

        it("should make Date comparisons", function() {
            expect(isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25))).toBeTruthy();
            expect(!isEqual(new Date(2009, 9, 25), new Date(2009, 11, 13))).toBeTruthy();
            expect(!isEqual(new Date(2009, 11, 13), {
              getTime: function(){
                return 12606876e5;
              }
            })).toBeTruthy();
            expect(!isEqual(new Date("Curly"), new Date("Curly"))).toBeTruthy();
        });

        it("should make Function comparisons", function() {
            expect(!isEqual(First, Second)).toBeTruthy();
        });

        it("should make RegExps comparisons", function() {
            expect(isEqual(/(?:)/gim, /(?:)/gim)).toBeTruthy();
            expect(!isEqual(/(?:)/g, /(?:)/gi)).toBeTruthy();
            expect(!isEqual(/Moe/gim, /Curly/gim)).toBeTruthy();
            expect(!isEqual(/(?:)/gi, /(?:)/g)).toBeTruthy();
            expect(!isEqual(/Curly/g, {source: "Larry", global: true, ignoreCase: false, multiline: false})).toBeTruthy();
        });

        it("should make Empty arrays, array-like objects, and object literal comparisons", function() {
            expect(isEqual({}, {})).toBeTruthy();
            expect(isEqual([], [])).toBeTruthy();
            expect(isEqual([{}], [{}])).toBeTruthy();
            expect(!isEqual({length: 0}, [])).toBeTruthy();
            expect(!isEqual([], {length: 0})).toBeTruthy();
            expect(!isEqual({}, [])).toBeTruthy();
            expect(!isEqual([], {})).toBeTruthy();
        });

        it("should compare Arrays with primitive and object values", function() {
            expect(isEqual([1, "Larry", true], [1, "Larry", true])).toBeTruthy();
            expect(isEqual([(/Moe/g), new Date(2009, 9, 25)], [(/Moe/g), new Date(2009, 9, 25)])).toBeTruthy();
        });

        it("should compare Multi-dimensional arrays", function() {
            var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            expect(isEqual(a, b)).toBeTruthy();
        });

        it("should compare Array elements and properties", function() {
            var a = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            var b = [new Number(47), false, "Larry", /Moe/, new Date(2009, 11, 13), ['running', 'biking', new String('programming')], {a: 47}];
            a.forEach = a.map = a.filter = a.every = a.indexOf = a.lastIndexOf = a.some = a.reduce = a.reduceRight = null;
            b.join = b.pop = b.reverse = b.shift = b.slice = b.splice = b.concat = b.sort = b.unshift = null;

            expect(isEqual(a, b)).toBeTruthy();
            a.push("White Rocks");
            expect(!isEqual(a, b)).toBeTruthy();
            a.push("East Boulder");
            b.push("Gunbarrel Ranch", "Teller Farm");
            expect(!isEqual(a, b)).toBeTruthy();
        });

        it("should compare Simple objects", function() {
            expect(isEqual({a: "Curly", b: 1, c: true}, {a: "Curly", b: 1, c: true})).toBeTruthy();
            expect(isEqual({a: /Curly/g, b: new Date(2009, 11, 13)}, {a: /Curly/g, b: new Date(2009, 11, 13)})).toBeTruthy();
            expect(!isEqual({a: 63, b: 75}, {a: 61, b: 55})).toBeTruthy();
            expect(!isEqual({a: 63, b: 75}, {a: 61, c: 55})).toBeTruthy();
            expect(!isEqual({a: 1, b: 2}, {a: 1})).toBeTruthy();
            expect(!isEqual({a: 1}, {a: 1, b: 2})).toBeTruthy();
            expect(!isEqual({x: 1, y: undefined}, {x: 1, z: 2})).toBeTruthy();
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
            expect(isEqual(a, b)).toBeTruthy();
        });

        it("should compare Instances", function() {
            expect(isEqual(new First, new First)).toBeTruthy();
            expect(!isEqual(new First, new Second)).toBeTruthy();
            expect(!isEqual({value: 1}, new First)).toBeTruthy();
            expect(!isEqual({value: 2}, new Second)).toBeTruthy();
        });

        it("should compare Circular Arrays", function() {
            (a = []).push(a);
            (b = []).push(b);
            expect(isEqual(a, b)).toBeTruthy();
            a.push(new String("Larry"));
            b.push(new String("Larry"));
            expect(isEqual(a, b)).toBeTruthy();
            a.push("Shemp");
            b.push("Curly");
            expect(!isEqual(a, b)).toBeTruthy();
        });

        it("should compare Circular Objects", function() {
            a = {abc: null};
            b = {abc: null};
            a.abc = a;
            b.abc = b;
            expect(isEqual(a, b)).toBeTruthy();
            a.def = 75;
            b.def = 75;
            expect(isEqual(a, b)).toBeTruthy();
            a.def = new Number(75);
            b.def = new Number(63);
            expect(!isEqual(a, b)).toBeTruthy();
        });

        it("should compare Cyclic Structures", function() {
            a = [{abc: null}];
            b = [{abc: null}];
            (a[0].abc = a).push(a);
            (b[0].abc = b).push(b);
            expect(isEqual(a, b)).toBeTruthy();
            a[0].def = "Larry";
            b[0].def = "Larry";
            expect(isEqual(a, b)).toBeTruthy();
            a[0].def = new String("Larry");
            b[0].def = new String("Curly");
            expect(!isEqual(a, b)).toBeTruthy();
        });

        it("should compare Complex Circular References", function() {
            a = {foo: {b: {foo: {c: {foo: null}}}}};
            b = {foo: {b: {foo: {c: {foo: null}}}}};
            a.foo.b.foo.c.foo = a;
            b.foo.b.foo.c.foo = b;
            expect(isEqual(a, b)).toBeTruthy();
        });

        it("should compare Chained object", function() {
            expect(!isEqual(_({x: 1, y: undefined}).chain(), _({x: 1, z: 2}).chain())).toBeTruthy();
            expect(_({x: 1, y: 2}).chain().isEqual(_({x: 1, y: 2}).chain()).value()).toBeTruthy();
        });
    });

    describe("isEmpty", function() {
        it("should test strings for emptiness", function() {
            expect(''.isEmpty()).toBeTruthy();
            expect('moe'.isEmpty()).toBeFalsy();
        });
    });

    describe("isElement", function() {
        it("should test for Elements", function() {
            expect(isElement('div')).toBeFalsy();
            var element = document.getElementsByTagName ? document.getElementsByTagName('div')[0]
                                                        : document.body.firstChild;

            expect(isElement(element)).toBeTruthy();
        });
    });

    describe("isArguments", function() {
        it("should test for arguments", function() {
            var args = (function(){ return arguments; })(1, 2, 3);
            expect(isArguments('string')).toBeFalsy();
            expect(isArguments(_.isArguments)).toBeFalsy();
            expect(isArguments(args)).toBeTruthy();
            expect(isArguments(_.toArray(args))).toBeFalsy();
            expect(isArguments([1,2,3])).toBeFalsy();
        });
    });

    describe("isObject", function() {
        it("should test for objects", function() {
            expect(isObject(arguments)).toBeTruthy();
            expect(isObject([1, 2, 3])).toBeTruthy();
            expect(isObject(document.body)).toBeTruthy();
            expect(isObject(function () {})).toBeTruthy();
            expect(isObject(null)).toBeFalsy();
            expect(isObject(undefined)).toBeFalsy();
            expect(isObject('string')).toBeFalsy();
            expect(isObject(12)).toBeFalsy();
            expect(isObject(true)).toBeFalsy();
            expect(isObject(new String('string'))).toBeTruthy();
        });
    });

    describe("isArray", function() {
        it("should test for arrays", function() {
            expect(isArray(arguments)).toBeFalsy();
            expect(isArray([1, 2, 3])).toBeTruthy();
        });
    });

    describe("isString", function() {
        it("should test for strings", function() {
            expect(_.isString(document.body)).toBeFalsy();
            expect(_.isString([1, 2, 3].join(', '))).toBeTruthy();
        });
    });

    describe("isNumber", function() {
        it("should test for numbers", function() {
            expect(isNumber('string')).toBeFalsy();
            expect(isNumber(arguments)).toBeFalsy();
            expect(isNumber(undefined)).toBeFalsy();
            expect(isNumber(3 * 4 - 7 / 10)).toBeTruthy();
            expect(isNumber(NaN)).toBeTruthy();
            expect(isNumber(Infinity)).toBeTruthy();
            expect(isNumber('1')).toBeFalsy();
        });
    });

    describe("isBoolean", function() {
        it("should test for boolean values", function() {
            expect(isBoolean(2)).toBeFalsy();
            expect(isBoolean("string")).toBeFalsy();
            expect(isBoolean("false")).toBeFalsy();
            expect(isBoolean("true")).toBeFalsy();
            expect(isBoolean(arguments)).toBeFalsy();
            expect(isBoolean(undefined)).toBeFalsy();
            expect(isBoolean(NaN)).toBeFalsy();
            expect(isBoolean(null)).toBeFalsy();
            expect(isBoolean(true)).toBeTruthy();
            expect(isBoolean(false)).toBeTruthy();
        });
    });

    describe("isFunction", function() {
        it("should test for functions", function() {
            expect(isFunction([1, 2, 3])).toBeFalsy();
            expect(isFunction('moe')).toBeFalsy();
            expect(isFunction(_.isFunction)).toBeTruthy();
        });
    });

    describe("isDate", function() {
        it("should test for dates", function() {
            expect(isDate(100)).toBeFalsy();
            expect(isDate({})).toBeFalsy();
            expect(isDate(new Date())).toBeTruthy();
        });
    });

    describe("isRegExp", function() {
        it("should test for regex's", function() {
            expect(isRegExp(_.identity)).toBeFalsy();
            expect(isRegExp(/identity/)).toBeTruthy();
        });
    });

    describe("isNaN", function() {
        it("should test for NaN", function() {
            expect(isNaN(undefined)).toBeFalsy();
            expect(isNaN(null)).toBeFalsy();
            expect(isNaN(0)).toBeFalsy();
            expect(isNaN(NaN)).toBeTruthy();
        });
    });

    describe("isNull", function() {
        it("test for null", function() {
            expect(isNull(undefined)).toBeFalsy();
            expect(isNull(NaN)).toBeFalsy();
            expect(isNull(null)).toBeTruthy();
        });
    });

    describe("isUndefined", function() {
        it("should test for undefined", function() {
            expect(isUndefined(1)).toBeFalsy();
            expect(isUndefined(null)).toBeFalsy();
            expect(isUndefined(false)).toBeFalsy();
            expect(isUndefined(NaN)).toBeFalsy();
            expect(isUndefined()).toBeTruthy();
            expect(isUndefined(undefined)).toBeTruthy();
        });
    });

    describe("isDefined", function() {
        it("should test for undefined", function() {
            expect(isDefined(1)).toBeTruthy();
            expect(isDefined(null)).toBeTruthy();
            expect(isDefined(false)).toBeTruthy();
            expect(isDefined(NaN)).toBeTruthy();
            expect(isDefined()).toBeFalsy();
            expect(isDefined(undefined)).toBeFalsy();
        });
    });

    describe("uniqueID", function() {
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