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

});