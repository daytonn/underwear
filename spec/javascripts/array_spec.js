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
});
