describe("Function", function() {

    describe("memoize", function() {
        var fib;

        beforeEach(function() {
            fib = function(n) {
              return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
        });

        it("should should get the same results as using the unmemoized function", function() {
            var fastFib = fib.memoize();
            expect(fib(10)).toEqual(55);
        });

        it("should check hasOwnProperty", function() {
            var o = function(str) {
              return str;
            };

            var fastO = o.memoize();
            expect(o('toString')).toEqual('toString');
            expect(fastO('toString')).toEqual('toString');
        });
    });

    describe("delay", function() {
        it("should delay a function call", function() {
            runs(function() {
                var delayed = false;
                (function() { delayed = true; }).delay(100);
                setTimeout(function(){ expect(delayed).toBeFalse(); }, 50);
                setTimeout(function(){ expect(delayed).toBeTrue(); }, 150);
            });
        });
    });

    describe("defer", function() {
        it("should defer the function", function() {
            var deferred = false;
            (function(bool){ deferred = bool; }).defer(true);
            (function(){ expect(deferred).toBeTrue(); }).delay(50);
        });
    });

    describe("throttle", function() {
        it("should throttle a function", function() {
            runs(function() {
                var counter = 0;
                var incr = function(){ counter++; };
                var throttledIncr = incr.throttle(100);
                throttledIncr();
                throttledIncr();
                throttledIncr();
                setTimeout(throttledIncr, 70);
                setTimeout(throttledIncr, 120);
                setTimeout(throttledIncr, 140);
                setTimeout(throttledIncr, 190);
                setTimeout(throttledIncr, 220);
                setTimeout(throttledIncr, 240);
                (function(){ expect(counter).toEqual(1); }).delay(30);
                (function(){ expect(counter).toEqual(4); }).delay(400);
            });
        });

        it("should throttle a function with arguments", function() {
            runs(function() {
                var value = 0;
                var update = function(val) { value = val; };
                var throttledUpdate = update.throttle(100);
                throttledUpdate(1);
                throttledUpdate(2);
                throttledUpdate(3);
                setTimeout(function(){ throttledUpdate(4); }, 120);
                setTimeout(function(){ throttledUpdate(5); }, 140);
                setTimeout(function(){ throttledUpdate(6); }, 250);
                (function(){ expect(value).toEqual(1); }).delay(40);
                (function(){ expect(value).toEqual(6); }).delay(400);
            });
        });

        it("should throttle a function once", function() {
            runs(function() {
                var counter = 0;
                var incr = function(){ return ++counter; };
                var throttledIncr = incr.throttle(100);
                var result = throttledIncr();
                (function(){
                  expect(result).toEqual(1);
                  expect(counter).toEqual(1);
                }).delay(220);
            });
        });

        it("should throttle twice", function() {
            runs(function() {
                var counter = 0;
                var incr = function(){ counter++; };
                var throttledIncr = incr.throttle(100);
                throttledIncr();
                throttledIncr();
                (function(){ expect(counter).toEqual(2); }).delay(220);
            });
        });
    });

    describe("debounce", function() {
        it("should debounce a function", function() {
            runs(function() {
                var counter = 0;
                var incr = function(){ counter++; };
                var debouncedIncr = incr.debounce(50);
                debouncedIncr();
                debouncedIncr();
                debouncedIncr();
                setTimeout(debouncedIncr, 30);
                setTimeout(debouncedIncr, 60);
                setTimeout(debouncedIncr, 90);
                setTimeout(debouncedIncr, 120);
                setTimeout(debouncedIncr, 150);
                (function(){ expect(counter).toEqual(1); }).delay(220);
            });
        });

        it("should debounce as soon as possible", function() {
            var counter = 0;
            var incr = function(){ counter++; };
            var debouncedIncr = incr.debounce(50, true);
            debouncedIncr();
            debouncedIncr();
            debouncedIncr();
            expect(counter).toEqual(1);
            setTimeout(debouncedIncr, 30);
            setTimeout(debouncedIncr, 60);
            setTimeout(debouncedIncr, 90);
            setTimeout(debouncedIncr, 120);
            setTimeout(debouncedIncr, 150);
            (function(){ expect(counter).toEqual(1); }).delay(220);
        });

        it("should debounce asap recursively", function() {
            var counter = 0;
            var debouncedIncr = (function(){
              counter++;
              if (counter < 5) {
                  debouncedIncr();
              }
            }).debounce(50, true);
            debouncedIncr();
            (function(){ expect(counter).toEqual(1); }).delay(70);
        });

    });

    describe("once", function() {
        it("should execute a function once", function() {
            var num = 0;
            var increment = (function(){ num++; }).once();
            increment();
            increment();
            expect(num).toEqual(1);
        });
    });

    describe("wrap", function() {
        it("should wrap a function with another function", function() {
            var greet = function(name){ return "hi: " + name; };
            var backwards = greet.wrap(function(func, name){ return func(name) + ' ' + name.split('').reverse().join(''); });
            expect(backwards('moe')).toEqual('hi: moe eom');
        });

        it("should wrap the inner funciton around the root function", function() {
            var inner = function(){ return "Hello "; };
            var obj = { name : "Moe" };
            obj.hi = inner.wrap(function(fn){ return fn() + this.name; });
            expect(obj.hi()).toEqual("Hello Moe");
        });

        it("should wrap an array prepending the function to the array", function() {
            var noop = function(){};
            var wrapped = noop.wrap(function(fn){ return Array.prototype.slice.call(arguments, 0); });
            var ret = wrapped(['whats', 'your'], 'vector', 'victor');
            expect(ret).toEqual([noop, ['whats', 'your'], 'vector', 'victor']);
        });
    });

    describe("compose", function() {
        it("should compose a function that takes another", function() {
            var greet = function(name){ return "hi: " + name; };
            var exclaim = function(sentence){ return sentence + '!'; };
            var composed = exclaim.compose(greet);
            expect(composed('moe')).toEqual('hi: moe!');

            composed = greet.compose(exclaim);
            expect(composed('moe')).toEqual('hi: moe!');
        });
    });

});