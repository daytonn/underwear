describe("Object", function() {

    describe("keys", function() {
        it("should extract an object's keys into an array", function() {
            var obj = { one: 1, two: 2 };
            expect( obj.keys().join(', ') ).toEqual('one, two');
        });
    });

    describe("values", function() {

        it("extract an object's values into an array", function() {
            expect( { one: 1, two: 2 }.values().join(', ') ).toEqual('1, 2');
        });
    });

    describe("functions", function() {

        it("should return a list of the object's functions ", function() {
            var obj = { a: 'dash', b: _.map, c: (/yo/), d: _.reduce };
            expect( obj.functions() ).toEqual(['b', 'd']);
        });

        it("should include prototype methods", function() {
            function Animal() {}
            Animal.prototype.run = function() {};
            var animal = new Animal;
            var Person = function() {};
            Person.prototype.speak = function() {};
            var person = new Person;

            expect( person.functions() ).toEqual(['speak']);
            expect( animal.functions() ).toEqual(['run']);
        });

    });

    describe("methods", function() {

        var prototypeMethods = [
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
            'functions',
            'groupBy',
            'has',
            'include',
            'inject',
            'invoke',
            'isEmpty',
            'keys',
            'map',
            'max',
            'merge',
            'methods',
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
            'tap',
            'values'
        ];

        it("returns the prototype methods excluding the instance methods", function() {
            var obj = { a: 'dash', b: _.map, c: (/yo/), d: _.reduce };
            expect(obj.methods().length).toEqual(prototypeMethods.length);
            expect(_(obj.methods()).contains('b')).toBeFalse();
            expect(_(obj.methods()).contains('d')).toBeFalse();
        });

    });

    describe("merge", function() {

        it("should merge an object with properties from another object", function() {
            var result;
            expect( {}.merge({ a: 'b' }).a ).toEqual('b');
        });

        it("should replace the properties in calling object with the extension object", function() {
            expect( {a:'x'}.merge({a:'b'}).a ).toEqual('b');
        });

        it("should not override properties not in the extension object", function() {
            expect( { x: 'x' }.merge({ a: 'b' }).x ).toEqual('x');
        });

        it("should merge from multiple objects", function() {
            expect( { x: 'x' }.merge({ a: 'a', b: 'b' }) ).toEqual({ x: 'x', a: 'a', b: 'b' });
        });

        it("should override any defined properties with the last extension object passed", function() {
            var result = { x: 'x' }.merge({ a: 'a', x: 2 }, { a: 'b' });
            expect(result).toEqual({ x: 2, a: 'b' });
        });

        it("should copy undefined values", function() {
            result = {}.merge({ a: void 0, b: null });
            expect(result.a).toEqual(void 0);
            expect(result.b).toEqual(null);
        });

    });

    describe("pick", function() {

        it("should restrict propertiees to those named", function() {
            var result;
            result = { a:1, b:2, c:3 }.pick('a', 'c');
            expect(result).toEqual({ a:1, c:3 });
        });

        it("should restrict properties to those named in an array", function() {
            result = { a:1, b:2, c:3 }.pick(['b', 'c']);
            expect(result).toEqual({ b:2, c:3 });
        });

        it("should restrict properties to those named in mixed args", function() {
            result = { a:1, b:2, c:3 }.pick(['a'], 'b');
            expect(result).toEqual({ a:1, b:2 });
        });

    });

    describe("defaults", function() {

        var options;

        beforeEach(function() {
            options = { zero: 0, one: 1, empty: "", nan: NaN, string: "string" };
        });

        it("should not overwrite existing properties", function() {
            options.defaults({ zero: 1, one: 10, twenty: 20 });
            expect(options.zero).toEqual(0);
            expect(options.one).toEqual(1);
        });

        it("should fill in properties which don't exist in the object", function() {
            options.defaults({ zero: 1, one: 10, twenty: 20 });
            expect(options.twenty).toEqual(20);
        });

        it("should keep the first value a given key was set", function() {
            options.defaults({ empty: "full" }, { nan: "nan" }, { word: "word" }, { word: "dog" });
            expect(options.empty).toEqual("");
            expect(_.isNaN(options.nan)).toBeTrue();
            expect(options.word).toEqual("word");
        });

    });

    describe("clone", function() {

        var moe;
        var clone;

        beforeEach(function() {
            moe = { name: 'moe', lucky: [13, 27, 34] };
            clone = moe.clone();
        });

        it("should clone the attributes of an object", function() {
            expect(clone.name).toEqual('moe');
        });

        it("should not change the original object when changing shallow attributes", function() {
            clone.name = 'curly';
            expect(clone.name).toEqual('curly');
            expect(moe.name).toEqual('moe');
        });

        it("changes the original object when changing deep attributes", function() {
            clone.lucky.push(101);
            expect(moe.lucky.last()).toEqual(101);
        });

    });

    describe("has", function() {
        it("should have an alias for hasOwnProperty", function() {
            var foo = {
                test: 'Hello',
                method: function() {

                }
            };
            expect(foo.has('test')).toBeTruthy();
            expect(foo.has('method')).toBeTruthy();
        });
    });

// Collection methods
    describe("collection methods", function() {

        var obj;

        beforeEach(function() {
            obj = {
                one: 1,
                two: 2,
                three: 3
            };
        });

        describe("map", function() {
            it("maps over each item", function() {
                var expected = {};
                obj.map(function(value, key) {
                    expected[key] = value;
                });
                expect(expected).toEqual(obj);
            });

            it("is aliased as collect", function() {
                var expected = {};
                obj.collect(function(value, key) {
                    expected[key] = value;
                });
                expect(expected).toEqual(obj);
            });

            it("takes a context", function() {
                var tripled = obj.map(function(num) { return num * this.multiplier; }, { multiplier: 3 });
                expect(tripled.join(', ')).toEqual('3, 6, 9');
            });
        });

        describe("reduce", function() {
            it("sums the object values", function() {
                var sum = obj.reduce(function(sum, num) { return sum + num; }, 0);
                expect(sum).toEqual(6);
            });

            it("is aliased as inject", function() {
                var sum = obj.inject(function(sum, num) { return sum + num; }, 0);
                expect(sum).toEqual(6);
            });

            it("reduces with a default initial value", function() {
                var sum = obj.reduce(function(sum, num) { return sum + num; });
                expect(sum).toEqual(6);
            });

            it("reduces an empty array to undefined as a special case", function() {
                expect({}.reduce(function() {}, undefined)).toEqual(undefined);
            });

            it("throws an error when reducing an empty array without the undefined flag", function() {
                expect(function() {
                    ({}).reduce(function() {});
                }).toThrow('Reduce of empty array with no initial value');
            });
        });

        describe("reduceRight", function() {

            var obj;
            var numbers;

            beforeEach(function() {
                obj = {
                    one: 'foo',
                    two: 'bar',
                    three: 'baz'
                };
                numbers = { one: 1, two: 2, three: 3, four: 4 };
            });

            it("performs right folds", function() {
                var list = obj.reduceRight(function(memo, str) { return memo + str; }, '');
                expect(list).toEqual('bazbarfoo');
            });

            it("is aliased as foldr", function() {
                var list = obj.foldr(function(memo, str){ return memo + str; }, '');
                expect(list).toEqual('bazbarfoo');
            });

            it("uses a default initial value", function() {
                var list = obj.foldr(function(memo, str){ return memo + str; });
                expect(list).toEqual('bazbarfoo');
            });

            it("passes undefined as a special case", function() {
                expect(({}).reduceRight(function() {}, undefined)).toEqual(undefined);
            });

            it("throws an error on empty objects with no initial value", function() {
                expect(function() {
                    ({}).reduceRight(function() {});
                }).toThrow('Reduce of empty array with no initial value');
            });

            it("returns the first found `value`", function() {
                expect(numbers.find(function(n) { return n > 2; })).toEqual(3);
            });

            it("returns `undefined` if `value` is not found", function() {
                expect(numbers.find(function() { return false; })).toEqual(void 0);
            });
        });

        describe("detect", function() {
            it("finds the first `2` and breaks the loop", function() {
                var result = ({ one: 1, two: 2, three: 3 }).detect(function(num){ return num * 2 === 4; });
                expect(result).toEqual(2);
            });
        });

        describe("select", function() {
            var obj;

            beforeEach(function() {
                obj = {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                    five: 5,
                    six: 6
                };
            });

            it("selects values that pass the iterator", function() {
                var evens = obj.select(function(num){ return num % 2 === 0; });
                expect(evens.join(', ')).toEqual('2, 4, 6');
            });

            it("is aliased as filter", function() {
                var evens = obj.filter(function(num){ return num % 2 === 0; });
                expect(evens.join(', ')).toEqual('2, 4, 6');
            });
        });

        describe("reject", function() {
            var obj;

            beforeEach(function() {
                obj = {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                    five: 5,
                    six: 6
                };
            });

            it("rejects values that return true from the callback", function() {
                var odds = obj.reject(function(num) { return num % 2 === 0; });
                expect(odds.join(', ')).toEqual('1, 3, 5');
            });
        });

        describe("every", function() {
            it("returns true if all elements pass the truth test", function() {
                expect(({}).every(_.identity)).toBeTruthy();
                expect(({ one: true, two: true, three: true }).every(_.identity)).toBeTruthy();

                expect(({ one: 0, two:  10, three: 28 }).every(function(num) { return num % 2 === 0; })).toBeTruthy();

                expect(({ one: 1 }).every(_.identity) === true).toBeTruthy();
                expect(({ one: 0 }).every(_.identity) === false).toBeTruthy();
            });

            it("returns false if every element doesn't pass the truth test", function() {
                expect(({ one: 0, two: 11, three: 28 }).every(function(num){ return num % 2 === 0; })).toBeFalsy();
                expect(({ one: true, two: false, three: true }).every(_.identity)).toBeFalsy();
            });

            it("is aliased as all", function() {
                expect(({ one: true, two: true, three: true }).all(_.identity)).toBeTruthy();
            });
        });

        describe("some", function() {
            var has_value;

            beforeEach(function() {
                has_value = function(value) {
                    return !!value;
                };
            });

            it("returns false on an empty object", function() {
                expect(({}).some(has_value)).toBeFalsy();
            });

            it("returns false with all false values", function() {
                expect(({ one: false, two: false, three: false }).some(has_value)).toBeFalsy();
            });

            it("returns true with one true value", function() {
                expect(({ one: false, two: false, three: true }).some(has_value)).toBeTruthy();
            });

            it("returns true with one string present", function() {
                expect(({ one: null, two: 0, three: 'yes', four: false}).some(has_value)).toBeTruthy();
            });

            it("returns false with falsy all values", function() {
                expect(({ one: null, two: 0, three: '', four: false}).some(has_value), 'falsy values');
            });

            it("returns false if no values return true from the iterator", function() {
                expect(({ one: 1, two: 11, three: 29}).some(function(num) { return num % 2 === 0; })).toBeFalsy();
            });

            it("returns true when at least one value returns true from the iterator", function() {
                expect(({ one: 1, two: 10, three: 29 }).some(function(num){ return num % 2 === 0; })).toBeTruthy();
            });

            it("converts values to boolean", function() {
                expect(({ one: 1 }).some(_.identity)).toBeTruthy();
                expect(({ one: 0 }).some(_.identity)).toBeFalsy();
            });

            it("is aliased as any", function() {
                expect(({ one: false, two: false, three: true }).any()).toBeTruthy();
            });
        });

        describe("include", function() {
            it("returns true if a value exists", function() {
                expect(({ one: 1, two: 2, three: 3 }).include(2)).toBeTruthy();
            });

            it("returns false if a value does not exist", function() {
                expect(({ one: 1, two: 3, three: 9 }).include(2)).toBeFalsy();
            });
        });

        describe("invoke", function() {
            it("invokes a method on each value of an array", function() {
                var obj = {
                    one: { foo: function() { return 'one'; } }
                };

                expect(obj.invoke('foo')[0]).toEqual('one');
            });
        });

        describe("pluck", function() {
            it("pulls names out of objects", function() {
                var people = {
                    one: { name : 'moe', age : 30 },
                    two: { name : 'curly', age : 50 }
                };
                expect(people.pluck('name').join(', ')).toEqual('moe, curly');
            });
        });

        describe("max", function() {

            var obj;

            beforeEach(function() {
                obj = [1, 2, 3];
            });

            it("performs a regular Math.max", function() {
                expect(obj.max()).toEqual(3);
            });

            it("performs a computation based max", function() {
                var neg = obj.max(function(num){ return -num; });
                expect(neg).toEqual(1);
            });

            it("returns -Infinity on empty objects", function() {
                expect(({}).max()).toEqual(-Infinity);
            });
        });

        describe("min", function() {

            var obj;

            beforeEach(function() {
                obj = { one: 1, two: 2, three: 3 };
            });

            it("performs a regular Math.min", function() {
                expect(obj.min()).toEqual(1);
            });

            it("performs a computation based min", function() {
                var neg = obj.min(function(num){ return -num; });
                expect(neg).toEqual(3);
            });

            it("returns Infinity on empty objects", function() {
                expect(({}).min()).toEqual(Infinity);
            });

            it("returns the minimum date", function() {
                var now = new Date(9999999999);
                var then = new Date(0);
                expect(({ one: now, two: then }).min()).toEqual(then);
            });
        });

        describe("sortBy", function() {
            it("sorts with a comparator", function() {
                var people = {
                    one: { name : 'curly', age : 50 },
                    two: { name : 'moe', age : 30 }
                };
                people = people.sortBy(function(person) { return person.age; });
                expect(people.pluck('name').join(', ')).toEqual('moe, curly');
            });

            it("sorts undefined values", function() {
                var list = {
                    one: undefined,
                    two: 4,
                    three: 1,
                    four: undefined,
                    five: 3,
                    six: 2
                };
                expect(list.sortBy(_.identity).join(',')).toEqual('1,2,3,4,,');
            });

            it("sorts strings", function() {
                var list = {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four"
                };
                var sorted = list.sortBy('length');
                expect(sorted.join(' ')).toEqual('one two four three');
            });
        });

        describe("groupBy", function() {
            it("groups values by a comparator", function() {
                var parity = ({ one: 1, two: 2, three: 3, four: 4, five: 5, six: 6}).groupBy(function(num) { return num % 2; });
                expect(parity[0].join(', ')).toEqual('2, 4, 6');
                expect(parity[1].join(', ')).toEqual('1, 3, 5');
            });

            it("groups by property values if given a string", function() {
                var list = {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                    five: "five",
                    six: "six",
                    seven: "seven",
                    eight: "eight",
                    nine: "nine",
                    then: "ten"
                };
                var grouped = list.groupBy('length');
                expect(grouped['3'].join(' ')).toEqual('one two six ten');
                expect(grouped['4'].join(' ')).toEqual('four five nine');
                expect(grouped['5'].join(' ')).toEqual('three seven eight');
            });
        });

        describe("shuffle", function() {
            var numbers;
            var shuffled;

            beforeEach(function() {
                numbers = {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                    five: 5,
                    six: 6,
                    seven: 7,
                    eight: 8,
                    nine: 9
                };
                shuffled = numbers.shuffle();
            });

            it("does not modify original object", function() {
                expect(numbers.values().join(', ')).toEqual('1, 2, 3, 4, 5, 6, 7, 8, 9');
            });

            it("contains the same members before and after shuffle", function() {
                expect(shuffled.values().sort().join(',')).toEqual(numbers.values().join(','));
            });

            it("shuffles the array", function() {
                expect(shuffled == numbers).toBeFalsy();
            });
        });

    });

    describe("Function helpers", function() {
        describe("bind", function() {
            var func;

            beforeEach(function() {
                func = function(arg) { return "name: " + (this.name || arg); };
            });

            it("should bind a function to a context", function() {
                var context = { name : 'moe' };
                var bound = func.bind(context);
                expect(bound()).toEqual('name: moe');
            });

            it("should bind without specifying a context", function() {
                var bound = func.bind(undefined, 'curly');
                expect(bound()).toEqual('name: curly');
            });

            it("should partially apply properties in advance", function() {
                func = function(salutation, name) { return salutation + ': ' + name; };
                func = func.bind(this, 'hello');
                expect(func('moe')).toEqual('hello: moe');
            });

            it("should", function() {
                func = function(salutation, name) { return salutation + ': ' + name; };
                func = func.bind(this, 'hello');
                func = func.bind(this, 'curly');
                expect(func()).toEqual('hello: curly');
            });

            it("should partially applly context in advance and accept multiple arguments", function() {
                func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
                func = func.bind(this, 'hello', 'moe', 'curly');
                expect(func()).toEqual('hello: moe curly');

            });

            it("should bind a function to numbers and strings", function() {
                func = function(context, message) { expect(this).toEqual(context); };
                func.bind(0, 0, 'can bind a function to `0`')();
                func.bind('', '', 'can bind a function to an empty string')();
            });

            it("should not be bound when using new", function() {
                // These tests are only meaningful when using a browser without a native bind function
                // To test this with a modern browser, set underscore's nativeBind to undefined
                var F = function () { return this; };
                var Boundf = F.bind({ hello: "moe curly" });
                expect(new Boundf().hello).toEqual(undefined);
                expect(Boundf().hello).toEqual("moe curly");
            });
        });

        describe("bindAll", function() {
            var curly;
            var moe;

            beforeEach(function() {
                curly = { name: 'curly' };
                moe = {
                  name: 'moe',
                  getName: function() { return 'name: ' + this.name; },
                  sayHi: function() { return 'hi: ' + this.name; }
                };
            });

            it("should bind an unbound function to the current object", function() {
                curly.getName = moe.getName;
                moe.bindAll('getName', 'sayHi');
                curly.sayHi = moe.sayHi;
                expect(curly.getName()).toEqual('name: curly');
            });

            it("should remain bound to the original object", function() {
                curly.getName = moe.getName;
                moe.bindAll('getName', 'sayHi');
                curly.sayHi = moe.sayHi;
                expect(curly.sayHi()).toEqual('hi: moe');
            });

            it("should bind all functions to the object with no arguments", function() {
                curly.getName = moe.getName;
                moe.bindAll('getName', 'sayHi');
                curly.sayHi = moe.sayHi;
                curly = {name : 'curly'};
                moe = {
                  name    : 'moe',
                  getName : function() { return 'name: ' + this.name; },
                  sayHi   : function() { return 'hi: ' + this.name; }
                };
                moe.bindAll();
                curly.sayHi = moe.sayHi;
                expect(curly.sayHi()).toEqual('hi: moe');
            });
        });
    });


    describe("Utilties", function() {

        describe("isEmpty", function() {
            it("should test objects for emptiness", function() {
                expect({one : 1}.isEmpty()).toBeFalsy();
                expect({}.isEmpty()).toBeTruthy();
            });
        });

        describe("tap", function() {
            it("should", function() {
                var intercepted = null;
                var interceptor = function(obj) { intercepted = obj; };
                var obj = { one: 1 };
                var returned = obj.tap(interceptor);
                expect(intercepted).toEqual({ one: 1 });
                expect(returned).toEqual({ one: 1 });

                // TODO remove the _().chain() method when the
                // Collections.max method is implemented
                returned = _([1,2,3]).chain().
                  map(function(n){ return n * 2; }).
                  max().
                  tap(interceptor).
                  value();
                expect(returned).toEqual(6);
                expect(intercepted).toEqual(6);
            });
        });

    });

});