describe("Array", function() {

    describe("first", function() {

        var ary;

        beforeEach(function() {
            ary = [1,2,3];

        });

        it("returns the first element of the array", function() {
            expect([1,2,3].first()).toEqual(1);
        });

        it("returns the first n elements of the array", function() {
            expect(ary.first(0).join(', ')).toEqual('');
            expect(ary.first(2).join(', ')).toEqual('1, 2');
            expect(ary.first(5).join(', ')).toEqual('1, 2, 3');
        });

        it("can also be refered to as take", function() {
            expect(ary.take(2).join(', ')).toEqual('1, 2');
        });

    });

    describe("rest", function() {

        var ary;

        beforeEach(function() {
            ary = [1,2,3,4];
        });

        it("returns the rest of the values from index 1 by default", function() {
            expect(ary.rest().join(', ')).toEqual('2, 3, 4');
        });

        it("returns the whole array when passed index 0", function() {
            expect(ary.rest(0).join(', ')).toEqual('1, 2, 3, 4');
        });

        it("returns the rest fromthe a specified index", function() {
            expect(ary.rest(2).join(', ')).toEqual('3, 4');
        });

        it("can also be referred to as tail", function() {
            expect(ary.tail().join(', ')).toEqual('2, 3, 4');
        });
    });

    describe("initial", function() {

        var ary;

        beforeEach(function() {
            ary = [1,2,3,4,5];
        });

        it("returns all but the last element of the array", function() {
            expect(ary.initial().join(', ')).toEqual('1, 2, 3, 4');
        });

        it("returns all but the last n elements of the array", function() {
            expect(ary.initial(2).join(', ')).toEqual('1, 2, 3');
        });

    });

    describe("last", function() {

        var ary;

        beforeEach(function() {
            ary = [1,2,3];
        });

        it("returns the last element of the array", function() {
            expect(ary.last()).toEqual(3);
        });

        it("returns nothing when passed 0", function() {
            expect(ary.last(0).join(', ')).toEqual('');
        });

        it("returns the last n elements of the array", function() {
            expect(ary.last(2).join(', ')).toEqual('2, 3');
        });

        it("returns the whole array when passed an amount larger than the length of the array", function() {
            expect(ary.last(5).join(', ')).toEqual('1, 2, 3');
        });
    });

    describe("compact", function() {

        var ary;

        beforeEach(function() {
            ary = [0, 1, false, 2, false, 3];
        });

        it("remove all the falsy values", function() {
            expect(ary.compact().length).toEqual(3);
        });

    });

    describe("flatten", function() {

        var ary;

        beforeEach(function() {
            ary = [1, [2], [3, [[[4]]]]];
        });

        it("flattens nested arrays", function() {
            expect(ary.flatten()).toEqual([1, 2, 3, 4]);
        });

        it("shallowly flatten nested arrays", function() {
            expect(ary.flatten(true)).toEqual([1,2,3, [[[4]]]]);
        });

    });

    describe("without", function() {

        var ary, ary2;

        beforeEach(function() {
            ary = [1, 2, 1, 0, 3, 1, 4];
            ary2 = [{ one: 1}, { two: 2 }];
        });

        it("removes all instances of an object in the array", function() {
            expect(ary.without(0, 1).join(', ')).toEqual('2, 3, 4');
        });

        it("uses real object identity for comparisons", function() {
            expect(ary2.without({ one: 1 }).length).toEqual(2);
            expect(ary2.without(ary2[0]).length).toEqual(1);
        });
    });
});
