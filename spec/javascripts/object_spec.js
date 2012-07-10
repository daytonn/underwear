describe("Object", function() {

    describe("keys", function() {
        it("should extract the keys from an object", function() {
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

});