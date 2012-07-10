describe("Object", function() {

    describe("keys", function() {
        it("should extract an object's keys into an array", function() {
            var obj = { one: 1, two: 2 };
            expect(obj.keys().join(', ')).toEqual('one, two');
        });

        it("throws errors for bad values", function() {
            expect(function() {
                null.keys();
            }).toThrow();

            expect(function() {
                void(0).keys();
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
            expect({ one: 1, two: 2 }.values().join(', ')).toEqual('1, 2');
        });
    });

    describe("functions", function() {

        it("should return a list of the object's functions ", function() {
            var obj = { a: 'dash', b: _.map, c: (/yo/), d: _.reduce };
            expect(obj.functions()).toEqual(['b', 'd']);
        });

        it("should include prototype methods", function() {
            function Animal() {};
            Animal.prototype.run = function() {};
            var animal = new Animal;
            var Person = function() {};
            Person.prototype.speak = function() {};
            var person = new Person;

            expect(person.functions()).toEqual(['speak']);
            expect(animal.functions()).toEqual(['run']);
        });
    });

});