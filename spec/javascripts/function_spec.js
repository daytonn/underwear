describe("Function", function() {

    describe("bind", function() {
        var func;

        beforeEach(function() {
            func = function(arg) { return "name: " + (this.name || arg); };
        });

        it("should bind a function to a context", function() {
            var context = { name : 'moe' };
            var bound = func.bind(context);
            expect(bound()).toEqual('name: moe');
        });

        it("should bind without specifying a context", function() {
            var bound = func.bind(undefined, 'curly');
            expect(bound()).toEqual('name: curly');
        });
        
        it("should partially apply properties in advance", function() {
            func = function(salutation, name) { return salutation + ': ' + name; };
            func = func.bind(this, 'hello');
            expect(func('moe')).toEqual('hello: moe');
        });

        it("should", function() {
            func = function(salutation, name) { return salutation + ': ' + name; };
            func = func.bind(this, 'hello');
            func = func.bind(this, 'curly');
            expect(func()).toEqual('hello: curly');
        });

        it("should partially applly context in advance and accept multiple arguments", function() {
            func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
            func = func.bind(this, 'hello', 'moe', 'curly');
            expect(func()).toEqual('hello: moe curly');
            
        });

        it("should bind a function to numbers and strings", function() {
            func = function(context, message) { expect(this).toEqual(context); };
            func.bind(0, 0, 'can bind a function to `0`')();
            func.bind('', '', 'can bind a function to an empty string')();
        });

        it("should not be bound when using new", function() {
            // These tests are only meaningful when using a browser without a native bind function
            // To test this with a modern browser, set underscore's nativeBind to undefined
            var F = function () { return this; };
            var Boundf = F.bind({ hello: "moe curly" });
            expect(new Boundf().hello).toEqual(undefined);
            expect(Boundf().hello).toEqual("moe curly");
        });
    });

    describe("bindAll", function() {
        var curly;
        var moe;

        beforeEach(function() {
            curly = { name: 'curly' };
            moe = {
              name: 'moe',
              getName: function() { return 'name: ' + this.name; },
              sayHi: function() { return 'hi: ' + this.name; }
            };
        });

        it("should bind an unbound function to the current object", function() {
            curly.getName = moe.getName;
            moe.bindAll('getName', 'sayHi');
            curly.sayHi = moe.sayHi;
            expect(curly.getName()).toEqual('name: curly');
        });

        it("should remain bound to the original object", function() {
            curly.getName = moe.getName;
            moe.bindAll('getName', 'sayHi');
            curly.sayHi = moe.sayHi;
            expect(curly.sayHi()).toEqual('hi: moe');
        });

        it("should bind all functions to the object with no arguments", function() {
            curly.getName = moe.getName;
            moe.bindAll('getName', 'sayHi');
            curly.sayHi = moe.sayHi;
            curly = {name : 'curly'};
            moe = {
              name    : 'moe',
              getName : function() { return 'name: ' + this.name; },
              sayHi   : function() { return 'hi: ' + this.name; }
            };
            moe.bindAll();
            curly.sayHi = moe.sayHi;
            expect(curly.sayHi()).toEqual('hi: moe');
        });
    });

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
            var delayed = false;
            (function() { delayed = true; }).delay(100);
            setTimeout(function(){ expect(delayed).toBeFalsy(); }, 50);
            setTimeout(function(){ expect(delayed).toBeTruthy(); }, 150);
        });
    });

    describe("defer", function() {
        it("should defer the function", function() {
            var deferred = false;
            (function(bool){ deferred = bool; }).defer(true);
            (function(){ expect(deferred).toBeTruthy(); }).delay(50);
        });
    });

    describe("throttle", function() {
        it("should throttle a function", function() {
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
            (function(){ equal(counter, 4, "incr was throttled"); }).delay(400);
        });
    });

});