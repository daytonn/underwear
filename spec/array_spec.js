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

    describe("Array.range", function() {
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
            it("returns an array of numbers starting with a `seed` number, up to a `limit` increasing by `increments`", function() {
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

// Collection methods
    describe("collection methods", function() {

        describe("each", function() {

            var arry;

            beforeEach(function() {
                arry = [1, 2, 3];
            });

            if (Array.prototype.forEach) {
                it("it is an alias of forEach", function() {
                    expect(Array.prototype.each).toEqual(Array.prototype.forEach);
                });
            }

            it("provides a value and iteration count", function() {
                arry.each(function(num, i) {
                  expect(num).toEqual(i + 1);
                });
            });

        });

        describe("map", function() {
            it("maps over each item", function() {
                var doubled = [1, 2, 3].map(function(num){ return num * 2; });
                expect(doubled.join(', ')).toEqual('2, 4, 6');
            });

            it("is aliased as collect", function() {
                doubled = [1, 2, 3].collect(function(num){ return num * 2; });
                expect(doubled.join(', ')).toEqual('2, 4, 6');
            });

            it("takes a contect", function() {
                var tripled = [1, 2, 3].map(function(num){ return num * this.multiplier; }, { multiplier: 3 });
                expect(tripled.join(', ')).toEqual('3, 6, 9');
            });
        });

        describe("reduce", function() {
            it("sums the array", function() {
                var sum = [1, 2, 3].reduce(function(sum, num){ return sum + num; }, 0);
                expect(sum).toEqual(6);
            });

            it("is aliased as inject", function() {
                var sum = [1, 2, 3].inject(function(sum, num){ return sum + num; }, 0);
                expect(sum).toEqual(6);
            });

            it("reduces with a default initial value", function() {
                var sum = [1, 2, 3].reduce(function(sum, num){ return sum + num; });
                expect(sum).toEqual(6);
            });

            it("reduces an empty array to undefined as a special case", function() {
                expect([].reduce(function(){}, undefined)).toEqual(undefined);
            });

            it("throws an error when reducing an empty array without the undefined flag", function() {
                expect(function() {
                    [].reduce(function(){ });
                }).toThrow('Reduce of empty array with no initial value');
            });
        });

        describe("reduceRight", function() {
            it("performs right folds", function() {
                var list = ["foo", "bar", "baz"].reduceRight(function(memo, str){ return memo + str; }, '');
                expect(list).toEqual('bazbarfoo');
            });

            it("is aliased as foldr", function() {
                var list = ["foo", "bar", "baz"].foldr(function(memo, str){ return memo + str; }, '');
                expect(list).toEqual('bazbarfoo');
            });

            it("uses a default initial value", function() {
                var list = ["foo", "bar", "baz"].foldr(function(memo, str){ return memo + str; });
                expect(list).toEqual('bazbarfoo');
            });

            it("passes undefined as a special case", function() {
                expect([].reduceRight(function(){}, undefined)).toEqual(undefined);
            });

            it("throws an error on empty arrays with no initial value", function() {
                expect(function() {
                    [].reduceRight(function(){});
                }).toThrow('Reduce of empty array with no initial value');
            });

            it("returns the first found `value`", function() {
                expect([1, 2, 3, 4].find(function(n) { return n > 2; })).toEqual(3);
            });

            it("returns `undefined` if `value` is not found", function() {
                expect([1, 2, 3, 4].find(function() { return false; })).toEqual(void 0);
            });
        });

        describe("detect", function() {
            it("finds the first `2` and breaks the loop", function() {
                var result = [1, 2, 3].detect(function(num){ return num * 2 === 4; });
                expect(result).toEqual(2);
            });
        });

        describe("select", function() {
            it("is aliased as filter", function() {
                var evens = [1, 2, 3, 4, 5, 6].filter(function(num){ return num % 2 === 0; });
                expect(evens.join(', ')).toEqual('2, 4, 6');
            });

            it("it selects items that pass the test", function() {
                evens = [1, 2, 3, 4, 5, 6].filter(function(num){ return num % 2 === 0; });
                expect(evens.join(', ')).toEqual('2, 4, 6');
            });
        });

        describe("reject", function() {
            it("rejects values that return true from the callback", function() {
                var odds = [1, 2, 3, 4, 5, 6].reject(function(num){ return num % 2 === 0; });
                expect(odds.join(', ')).toEqual('1, 3, 5');
            });
        });

        describe("every", function() {
            it("returns true if all elements pass the truth test", function() {
                expect([].every(_.identity)).toBeTrue();
                expect([true, true, true].every(_.identity)).toBeTrue();

                expect([0, 10, 28].every(function(num){ return num % 2 === 0; })).toBeTrue();

                expect([1].every(_.identity) === true).toBeTrue();
                expect([0].every(_.identity) === false).toBeTrue();
            });

            it("returns false if every element doesn't pass the truth test", function() {
                expect([0, 11, 28].every(function(num){ return num % 2 === 0; })).toBeFalse();
                expect([true, false, true].every(_.identity)).toBeFalse();
            });

            it("is aliased as all", function() {
                expect([true, true, true].all(_.identity)).toBeTrue();
            });
        });

        describe("some", function() {
            var has_value;

            beforeEach(function() {
                has_value = function(value) {
                    return !!value;
                };
            });

            it("returns false on an empty array", function() {
                expect([].some(has_value)).toBeFalse();
            });

            it("returns false with all false values", function() {
                expect([false, false, false].some(has_value)).toBeFalse();
            });

            it("returns true with one true value", function() {
                expect([false, false, true].some(has_value)).toBeTrue();
            });

            it("returns true with one string present", function() {
                expect([null, 0, 'yes', false].some(has_value)).toBeTrue();
            });

            it("returns false with falsy all values", function() {
                expect([null, 0, '', false].some(has_value), 'falsy values');
            });

            it("returns false if no values return true from the iterator", function() {
                expect([1, 11, 29].some(function(num){ return num % 2 === 0; })).toBeFalse();
            });

            it("returns true when at least one value returns true from the iterator", function() {
                expect([1, 10, 29].some(function(num){ return num % 2 === 0; })).toBeTrue();
            });

            it("converts values to boolean", function() {
                expect([1].some(_.identity)).toBeTrue();
                expect([0].some(_.identity)).toBeFalse();
            });

            it("is aliased as any", function() {
                expect([false, false, true].any()).toBeTrue();
            });
        });

        describe("include", function() {
            it("returns true if a value exists", function() {
                expect([1,2,3].include(2)).toBeTrue();
            });

            it("returns false if a value does not exist", function() {
                expect([1,3,9].include(2)).toBeFalse();
            });
        });

        describe("invoke", function() {
            it("invokes a method on each value of an array", function() {
                var list = [[5, 1, 7], [3, 2, 1]];
                var result = list.invoke('sort');
                expect(result[0].join(', ')).toEqual('1, 5, 7');
                expect(result[1].join(', ')).toEqual('1, 2, 3');
            });
        });

        describe("pluck", function() {
            it("pulls names out of objects", function() {
                var people = [{ name : 'moe', age : 30 }, { name : 'curly', age : 50 }];
                expect(people.pluck('name').join(', ')).toEqual('moe, curly');
            });
        });

        describe("max", function() {
            it("performs a regular Math.max", function() {
                expect([1, 2, 3].max()).toEqual(3);
            });

            it("performs a computation based max", function() {
                var neg = [1, 2, 3].max(function(num){ return -num; });
                expect(neg).toEqual(1);
            });

            it("returns -Infinity on empty objects", function() {
                expect([].max()).toEqual(-Infinity);
            });
        });

        describe("min", function() {
            it("performs a regular Math.min", function() {
                expect([1, 2, 3].min()).toEqual(1);
            });

            it("performs a computation based min", function() {
                var neg = [1, 2, 3].min(function(num){ return -num; });
                expect(neg).toEqual(3);
            });

            it("returns Infinity on empty objects", function() {
                expect([].min()).toEqual(Infinity);
            });

            it("returns the minimum date", function() {
                var now = new Date(9999999999);
                var then = new Date(0);
                expect([now, then].min()).toEqual(then);
            });
        });

        describe("sortBy", function() {
            it("sorts with a comparator", function() {
                var people = [{ name : 'curly', age : 50 }, { name : 'moe', age : 30 }];
                people = people.sortBy(function(person){ return person.age; });
                expect(people.pluck('name').join(', ')).toEqual('moe, curly');
            });

            it("sorts undefined values", function() {
                var list = [undefined, 4, 1, undefined, 3, 2];
                expect(list.sortBy(_.identity).join(',')).toEqual('1,2,3,4,,');
            });

            it("sorts strings", function() {
                var list = ["one", "two", "three", "four", "five"];
                var sorted = list.sortBy('length');
                expect(sorted.join(' ')).toEqual('one two four five three');
            });
        });

        describe("groupBy", function() {
            it("groups values by a comparator", function() {
                var parity = [1, 2, 3, 4, 5, 6].groupBy(function(num){ return num % 2; });
                expect(parity[0].join(', ')).toEqual('2, 4, 6');
                expect(parity[1].join(', ')).toEqual('1, 3, 5');
            });

            it("groups by property values if given a string", function() {
                var list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
                var grouped = list.groupBy('length');
                expect(grouped['3'].join(' ')).toEqual('one two six ten');
                expect(grouped['4'].join(' ')).toEqual('four five nine');
                expect(grouped['5'].join(' ')).toEqual('three seven eight');
            });
        });

        describe("sortedIndex", function() {
            it("inserts the value at index a given index", function() {
                var numbers = [10, 20, 30, 40, 50];
                var num = 35;
                var indexForNum = numbers.sortedIndex(num);
                expect(indexForNum).toEqual(3);
            });

            it("does not overwrite valus that exist in the object", function() {
                var numbers = [10, 20, 30, 40, 50];
                var indexFor30 = numbers.sortedIndex(30);
                expect(indexFor30).toEqual(2);
            });
        });

        describe("shuffle", function() {
            var numbers;
            var shuffled;

            beforeEach(function() {
                numbers = Array.range(10);
                shuffled = numbers.shuffle();
            });

            it("does not modify original object", function() {
                expect(numbers.join(', ')).toEqual('0, 1, 2, 3, 4, 5, 6, 7, 8, 9');
            });

            it("contains the same members before and after shuffle", function() {
                expect(shuffled.sort().join(',')).toEqual(numbers.join(','));
            });

            it("shuffles the array", function() {
                expect(shuffled == numbers).toBeFalse();
            });
        });

    });

    describe("Utilties", function() {

        describe("isEmpty", function() {
            it("should test arrays for emptiness", function() {
                expect([1].isEmpty()).toBeFalse();
                expect([].isEmpty()).toBeTrue();
            });
        });

        describe("isNotEmpty", function() {
            it("should test arrays for fullness", function() {
                expect([1].isNotEmpty()).toBeTrue();
                expect([].isNotEmpty()).toBeFalse();
            });
        });

    });

});