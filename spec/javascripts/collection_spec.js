describe("Collection", function() {

    describe("each", function() {
        it("should provide value and iteration count", function() {
            [1, 2, 3].each(function(num, i) {
              expect(num).toEqual(i + 1);
            });
        });

        it("should return the value returned by the callback", function() {
            var answers = [];
            [1, 2, 3].each(function(num){ answers.push(num * this.multiplier);}, {multiplier : 5});
            expect(answers.join(', ')).toEqual('5, 10, 15');
        });
        
        it("should be aliases as `forEach`", function() {
            answers = [];
            [1, 2, 3].forEach(function(num){ answers.push(num); });
            expect(answers.join(', ')).toEqual('1, 2, 3' );
        });

        it("should ignore the prototype", function() {
            answers = [];
            var obj = {one : 1, two : 2, three : 3};
            obj.constructor.prototype.four = 4;
            obj.each(function(value, key){ answers.push(key); });
            expect(answers.join(", ")).toEqual('one, two, three');
            delete obj.constructor.prototype.four;
        });

        it("should reference the original collection from inside the iterator", function() {
            answer = null;
            [1, 2, 3].each(function(num, index, arr){ if (_(arr).include(num)) { answer = true; } });
            expect(answer).toBeTruthy();
        });

    });

    describe("map", function() {
        it("should map an array", function() {
            var doubled = [1, 2, 3].map(function(num){ return num * 2; });
            expect(doubled.join(', ')).toEqual('2, 4, 6');
        });

        it("should be aliased as collect", function() {
            doubled = [1, 2, 3].collect(function(num){ return num * 2; });
            expect(doubled.join(', ')).toEqual('2, 4, 6');
        });

        it("should map with a context", function() {
            var tripled = [1, 2, 3].map(function(num){ return num * this.multiplier; }, { multiplier: 3 });
            expect(tripled.join(', ')).toEqual('3, 6, 9');
        });

        if (typeof HTMLCollection !== "undefined") {
            it("should collect node lists", function() {
                var map_test = document.createElement('ul');
                map_test.id = 'map-test';
                Array.range(1, 3).each(function(i) {
                    var li = document.createElement('li');
                    li.id = 'id' + i;
                    map_test.appendChild(li);
                });
                try {
                    var ids = map_test.childNodes.map(function(n){ return n.id; });
                    expect(ids).toEqual(['id1', 'id2']);
                }
                catch(error) {
                    console.log(error.message);
                }
            });

            it("should", function() {
                var nodes = document.links.map(function(n){ return n.nodeName; });
                expect(nodes[0]).toEqual('A');
            });
        }

        it("should map objects", function() {
            var map_test = { one: 1, two: 2 };
            var result = map_test.map(function(n) { return n; });
            expect(result).toEqual([1, 2]);
        });

        it("should call collect on objects", function() {
            doubled = { one: 1, two: 2 }.collect(function(num){ return num * 2; });
            expect(doubled.join(', ')).toEqual('2, 4');
        });

    });

    describe("reduce", function() {
        it("should sum an array", function() {
            var sum = [1, 2, 3].reduce(function(sum, num){ return sum + num; }, 0);
            expect(sum).toEqual(6);
        });

        it("should be aliased as inject", function() {
            var sum = [1, 2, 3].inject(function(sum, num){ return sum + num; }, 0);
            expect(sum).toEqual(6);
        });

        it("should reduce with a default initial value", function() {
            var sum = [1, 2, 3].reduce(function(sum, num){ return sum + num; });
            expect(sum).toEqual(6);
        });

        it("should reduce an empty array to undefined as a special case", function() {
            expect([].reduce(function(){}, undefined)).toEqual(undefined);
        });

        it("should throw an error when reducing an empty array without the undefined flag", function() {
            expect(function() {
                _.reduce([], function(){});
            }).toThrow('Reduce of empty array with no initial value');
        });
    });

    describe("reduceRight", function() {
        it("should perform right folds", function() {
            var list = ["foo", "bar", "baz"].reduceRight(function(memo, str){ return memo + str; }, '');
            expect(list).toEqual('bazbarfoo');
        });

        it("should be aliased as foldr", function() {
            var list = ["foo", "bar", "baz"].foldr(function(memo, str){ return memo + str; }, '');
            expect(list).toEqual('bazbarfoo');
        });

        it("should use a default initial value", function() {
            var list = ["foo", "bar", "baz"].foldr(function(memo, str){ return memo + str; });
            expect(list).toEqual('bazbarfoo');
        });

        it("should pass undefined as a special case", function() {
            expect([].reduceRight(function(){}, undefined)).toEqual(undefined);
        });

        it("should throw an error for empty arrays with no initial value", function() {
            expect(function() {
                [].reduceRight(function(){});
            }).toThrow('Reduce of empty array with no initial value');
        });
    });

    describe("find", function() {
        it("should return first found `value` in an array", function() {
            expect([1, 2, 3, 4].find(function(n) { return n > 2; })).toEqual(3);
        });

        it("should return first found `value` in an object", function() {
            expect({ one: 1, two: 2, three: 3 }.find(function(n) { return n > 2; })).toEqual(3);
        });

        it("should return `undefined` if `value` is not found in an array", function() {
            expect([1, 2, 3, 4].find(function() { return false; })).toEqual(void 0);
        });

        it("should return `undefined` if `value` is not found in an object", function() {
            expect({ one: 1, two: 2, three: 3 }.find(function() { return false; })).toEqual(void 0);
        });
    });

    describe("detect", function() {
        it("should find the first `2` and break the loop", function() {
            var result = [1, 2, 3].detect(function(num){ return num * 2 === 4; });
            expect(result).toEqual(2);
        });
    });

    describe("select", function() {
        it("should", function() {
            var evens = [1, 2, 3, 4, 5, 6].filter(function(num){ return num % 2 === 0; });
            expect(evens.join(', ')).toEqual('2, 4, 6');
        });

        it("should be aliased as select", function() {
            evens = [1, 2, 3, 4, 5, 6].filter(function(num){ return num % 2 === 0; });
            expect(evens.join(', ')).toEqual('2, 4, 6');
        });
    });

    describe("reject", function() {
        it("should reject values that return true from the callback", function() {
            var odds = [1, 2, 3, 4, 5, 6].reject(function(num){ return num % 2 === 0; });
            expect(odds.join(', ')).toEqual('1, 3, 5');
        });
    });

    describe("every", function() {
        it("should return true if all elements in the array pass the truth test", function() {
            expect([].every(_.identity)).toBeTruthy();
            expect([true, true, true].every(_.identity)).toBeTruthy();
            
            expect([0, 10, 28].every(function(num){ return num % 2 === 0; })).toBeTruthy();
            
            expect([1].every(_.identity) === true).toBeTruthy();
            expect([0].every(_.identity) === false).toBeTruthy();
        });

        it("should return false if every the elements in the array don't pass the truth test", function() {
            expect([0, 11, 28].every(function(num){ return num % 2 === 0; })).toBeFalsy();
            expect([true, false, true].every(_.identity)).toBeFalsy();
        });

        it("should be aliased as all", function() {
            expect([true, true, true].all(_.identity)).toBeTruthy();
        });

    });

    describe("some", function() {
        var has_value;

        beforeEach(function() {
            has_value = function(value) {
                return !!value;
            };
        });

        it("should return false on an empty array", function() {
            expect([].some(has_value)).toBeFalsy();
        });

        it("should return false with all false values", function() {
            expect([false, false, false].some(has_value)).toBeFalsy();
        });

        it("should return true with one true value", function() {
            expect([false, false, true].some(has_value)).toBeTruthy();
        });

        it("should return true with one string present", function() {
            expect([null, 0, 'yes', false].some(has_value)).toBeTruthy();
        });

        it("should return false with falsy all values", function() {
            expect([null, 0, '', false].some(has_value), 'falsy values');
        });

        it("should return false is no values return true from the iterator", function() {
            expect([1, 11, 29].some(function(num){ return num % 2 === 0; })).toBeFalsy();
        });

        it("should return true when at least one value returns true from the iterator", function() {
            expect([1, 10, 29].some(function(num){ return num % 2 === 0; })).toBeTruthy();
        });

        it("should convert values to boolean", function() {
            expect([1].some(_.identity)).toBeTruthy();
            expect([0].some(_.identity)).toBeFalsy();
        });

        it("should be aliased as any", function() {
            expect([false, false, true].any()).toBeTruthy();
        });
    });

    describe("include", function() {
        it("should return true if a value exists in an array", function() {
            expect([1,2,3].include(2)).toBeTruthy();
        });

        it("should return false if a value does not exist in the array", function() {
            expect([1,3,9].include(2)).toBeFalsy();
        });

        it("should work on objects", function() {
            expect({ moe:1, larry:3, curly:9 }.include(3)).toBeTruthy();
        });

        it("should be aliased as contain", function() {
            expect({ moe:1, larry:3, curly:9 }.contains(3)).toBeTruthy();
        });
    });

    describe("invoke", function() {
        it("should invoke a method on each value of an array", function() {
            var list = [[5, 1, 7], [3, 2, 1]];
            var result = list.invoke('sort');
            expect(result[0].join(', ')).toEqual('1, 5, 7');
            expect(result[1].join(', ')).toEqual('1, 2, 3');
        });
    });

    describe("pluck", function() {
        it("should pull names out of objects", function() {
            var people = [{ name : 'moe', age : 30 }, { name : 'curly', age : 50 }];
            expect(people.pluck('name').join(', ')).toEqual('moe, curly');
        });
    });

    describe("max", function() {
        it("should perform a regular Math.max", function() {
            expect([1, 2, 3].max()).toEqual(3);
        });
        
        it("should perform a computation based max", function() {
            var neg = [1, 2, 3].max(function(num){ return -num; });
            expect(neg).toEqual(1);
        });

        it("should return -Infinity on empty objects", function() {
            expect({}.max()).toEqual(-Infinity);
            expect([].max()).toEqual(-Infinity);
        });

    });

    describe("min", function() {
        it("should perform a regular Math.min", function() {
            expect([1, 2, 3].min()).toEqual(1);
        });

        it("should perform a computation based min", function() {
            var neg = [1, 2, 3].min(function(num){ return -num; });
            expect(neg).toEqual(3);
        });
        
        it("should return Infinity on empty objects", function() {
            expect({}.min()).toEqual(Infinity);
            expect([].min()).toEqual(Infinity);
        });

        it("should return the minimum date", function() {
            var now = new Date(9999999999);
            var then = new Date(0);
            expect([now, then].min()).toEqual(then);
        });
    });

    describe("sortBy", function() {
        it("should sort with a comparator", function() {
            var people = [{ name : 'curly', age : 50 }, { name : 'moe', age : 30 }];
            people = people.sortBy(function(person){ return person.age; });
            expect(people.pluck('name').join(', ')).toEqual('moe, curly');
        });

        it("should sortBy with undefined values", function() {
            var list = [undefined, 4, 1, undefined, 3, 2];
            expect(list.sortBy(_.identity).join(',')).toEqual('1,2,3,4,,');
        });

        it("should sortBy property if passed a string", function() {
            var list = ["one", "two", "three", "four", "five"];
            var sorted = list.sortBy('length');
            expect(sorted.join(' ')).toEqual('one two four five three');
        });
    });

    describe("groupBy", function() {
        it("should group values by a comparator", function() {
            var parity = [1, 2, 3, 4, 5, 6].groupBy(function(num){ return num % 2; });
            expect(parity[0].join(', ')).toEqual('2, 4, 6');
            expect(parity[1].join(', ')).toEqual('1, 3, 5');
        });

        it("should group by property values if given a string", function() {
            var list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
            var grouped = list.groupBy('length');
            expect(grouped['3'].join(' ')).toEqual('one two six ten');
            expect(grouped['4'].join(' ')).toEqual('four five nine');
            expect(grouped['5'].join(' ')).toEqual('three seven eight');
        });

    });

});