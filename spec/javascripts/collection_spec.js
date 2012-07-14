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

});