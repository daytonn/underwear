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

        it("returns the rest from the a specified index", function() {
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

    describe("uniq", function() {

        var ary, ary2, ary3, ary4;

        beforeEach(function() {
            ary = [1, 2, 1, 3, 1, 4];
            ary2 = [1, 1, 1, 2, 2, 3];
            ary3 = [{ name: 'moe' }, { name: 'curly' }, { name: 'larry' }, { name: 'curly' }];
            ary4 = [1, 2, 2, 3, 4, 4];
        });

        it("finds the unique values in an unsorted array", function() {
            expect(ary.uniq().join(', ')).toEqual('1, 2, 3, 4');
        });

        it("finds the unique values in a sorted array", function() {
            expect(ary2.uniq(true).join(', ')).toEqual('1, 2, 3');
        });

        it("finds the unique values in the array using a custom iterator", function() {
            var iterator = function(value) { return value.name; };
            expect(_.map(ary3.uniq(false, iterator), iterator).join(', ')).toEqual('moe, curly, larry');
        });

        it("finds the unique values in the array using a custom iterator on a sorted array", function() {
            var iterator = (function(value) { return value + 1; });
            expect(ary4.uniq(true, iterator).join(', ')).toEqual('1, 2, 3, 4');
        });

    });

    describe("intersection", function() {

        it("returns the intersection of two arrays", function() {
            var stooges = ['moe', 'curly', 'larry'];
            var leaders = ['moe', 'groucho'];
            var result = stooges.intersection(leaders);
            expect(result.join('')).toEqual('moe');
        });

    });

    describe("union", function() {
        it("returns the union of multiple arrays", function() {
            var result = [1, 2, 3].union([2, 30, 1], [1, 40]);
            expect(result.join(', ')).toEqual('1, 2, 3, 30, 40');
        });

        it("returns the union of nested arrays", function() {
            var result = [1, 2, 3].union([2, 30, 1], [1, 40, [1]]);
            expect(result.join(', ')).toEqual('1, 2, 3, 30, 40, 1');
        });
    });

    describe("difference", function() {
        it("returns the differences of two arrays", function() {
            var result = [1, 2, 3].difference([2, 30, 40]);
            expect(result.join(', ')).toEqual('1, 3');
        });

        it("returns the difference of three arrays", function() {
            var result = [1, 2, 3, 4].difference([2, 30, 40], [1, 11, 111]);
            expect(result.join(', ')).toEqual('3, 4');
        });
    });

    describe("zip", function() {
        it("combines variant length arrays into one array", function() {
            var names = ['moe', 'larry', 'curly'];
            var ages = [30, 40, 50], leaders = [true];
            var stooges = names.zip(ages, leaders);

            expect(String(stooges)).toEqual('moe,30,true,larry,40,,curly,50,');
        });
    });

    describe("indexOf", function() {
        it("returns the index of the value", function() {
            var numbers = [1, 2, 3];
            expect(numbers.indexOf(2)).toEqual(1);
        });

        it("returns -1 when the value is not in the array", function() {
            var numbers = [10, 20, 30, 40, 50];
            var result = numbers.indexOf(35, true);
            expect(result).toEqual(-1);
        });

        it("returns the index of the value when the array is sorted", function() {
            var numbers = [10, 20, 30, 40, 50];
            var result = numbers.indexOf(40, true);
            expect(result).toEqual(3);
        });

        it("returns the first index of a value if it appears multiple times in the array", function() {
            var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
            var result = numbers.indexOf(40, true);
            expect(result).toEqual(1);
        });
    });

    describe("lastIndexOf", function() {
        it("returns the index of the last occurence of the value in the array", function() {
            var numbers = [1, 0, 1, 0, 0, 1, 0, 0, 0];
            expect(numbers.lastIndexOf(1)).toEqual(5);
            expect(numbers.lastIndexOf(0)).toEqual(8);
        });

        it("returns -1 when the value is not in the array", function() {
            var numbers = [1, 2, 3];
            expect(numbers.lastIndexOf(4)).toEqual(-1);
        });
    });

    describe("range", function() {
        it("returns an empty array when the range is 0", function() {
            expect(Array.range(0)).toEqual([]);
        });

        it("returns an array of `n` numbers starting with 0", function() {
            var n = 4;
            expect(Array.range(n).join(', ')).toEqual('0, 1, 2, 3');
        });

        describe("with two arguments", function() {
            it("returns an array of numbers staring with a `seed` up to a `limit`", function() {
                var seed = 5;
                var limit = 8;
                expect(Array.range(seed, limit).join(', ')).toEqual('5, 6, 7');
            });

            it("returns an empty array when the `seed` is greater than the `limit`", function() {
                var seed = 8;
                var limit = 5;
                expect(Array.range(seed, limit)).toEqual([]);
            });
        });

        describe("with three arguments", function() {
            it("returns an array of numbers starting with an `seed` number, up to a `limit` increasing by `increments`", function() {
                var seed = 3;
                var limit = 10;
                var increment = 3;
                expect(Array.range(seed, limit, increment).join(', ')).toEqual('3, 6, 9');
            });

            it("returns an array with one value when the `limit` is less than the `increment`", function() {
                var seed = 3;
                var limit = 10;
                var increment = 15;
                expect(Array.range(seed, limit, increment)).toEqual([3]);
            });

            it("returns an array of numbers starting with `seed` down to a `limit` by `increment` when the `increment` is negative and the `seed` is greater than 0", function() {
                var seed = 12;
                var limit = 7;
                var increment = -2;
                expect(Array.range(seed, limit, increment).join(', ')).toEqual('12, 10, 8');
            });

            it("returns an array of negative numbers starting with `seed` down to `limit` by `increment` when the `increment` is negative", function() {
                var seed = 0;
                var limit = -10;
                var increment = -1;
                expect(Array.range(seed, limit, increment).join(', ')).toEqual('0, -1, -2, -3, -4, -5, -6, -7, -8, -9');
            });

        });

    });

});