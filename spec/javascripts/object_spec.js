describe("Object", function() {

    describe("keys", function() {
        it("should extract an object's keys into an array", function() {
            var obj = { one: 1, two: 2 };
            expect( obj.keys().join(', ') ).toEqual('one, two');
        });

        it("throws errors for bad values", function() {
            expect(function() {
                null.keys();
            }).toThrow();

            expect(function() {
                "string".keys();
            }).toThrow('Object.keys() called on a non-object');

            expect(function() {
                (1).keys();
            }).toThrow("Object.keys() called on a non-object");

            expect(function() {
                true.keys();
            }).toThrow("Object.keys() called on a non-object");
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

        it("should be aliased as methods", function() {
            var obj = { a: 'dash', b: _.map, c: (/yo/), d: _.reduce };
            expect( obj.methods() ).toEqual(['b', 'd']);
        });

    });

    describe("extend", function() {

        it("should extend an object with properties from another object", function() {
            var result;
            expect( {}.extend({ a: 'b' }).a ).toEqual('b');
        });

        it("should replace the properties in calling object with the extension object", function() {
            expect( {a:'x'}.extend({a:'b'}).a ).toEqual('b');
        });

        it("should not override properties not in the extension object", function() {
            expect( { x: 'x' }.extend({ a: 'b' }).x ).toEqual('x');
        });

        it("should extend from multiple objects", function() {
            expect( { x: 'x' }.extend({ a: 'a', b: 'b' }) ).toEqual({ x: 'x', a: 'a', b: 'b' });
        });

        it("should override any defined properties with the last extension object passed", function() {
            var result = { x: 'x' }.extend({ a: 'a', x: 2 }, { a: 'b' });
            expect(result).toEqual({ x: 2, a: 'b' });
        });

        it("should copy undefined values", function() {
            result = {}.extend({ a: void 0, b: null });
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

});