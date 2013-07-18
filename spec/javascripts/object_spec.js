describe("Object", function() {

  var obj;

  beforeEach(function() {
    obj = {
      one: 1,
      two: 2,
      three: 3
    };
  });

  describe("keys", function() {
    it("returns an array of the object's keys", function() {
      expect(obj.keys()).toEqual(['one', 'two', 'three']);
    });
  });

  describe("values", function() {
    it("returns an array of the object's values", function() {
      expect(obj.values()).toEqual([1, 2, 3]);
    });
  });

  describe("pairs", function() {
    it("returns an array of key value pairs", function() {
      expect(obj.pairs()).toEqual([['one', 1], ['two', 2], ['three', 3]]);
    });
  });

  describe("invert", function() {
    it("inverts the keys and values", function() {
      expect(obj.invert()).toEqual({ 1: 'one', 2: 'two', 3: 'three'});
    });
  });

  describe("functions", function() {
    it("returns all the function properties of the object", function() {
      obj.test = function() {};
      expect(obj.functions()).toEqual(['test']);
    });
  });

  describe("mixin", function() {
    it("mixes in another object's properties", function() {
      expect(obj.mixin({ four: 4 })).toEqual({ one: 1, two: 2, three: 3, four: 4 });
    });
  });

  describe("pick", function() {
    it("returns a copy of the object including only the whitelisted keys", function() {
      expect(obj.pick('one', 'three')).toEqual({ one: 1, three: 3 });
    });
  });

  describe("omit", function() {
    it("returns a copy of the object with the blacklisted keys omitted", function() {
      expect(obj.omit('one', 'three')).toEqual({ two: 2 });
    });
  });

  describe("defaults", function() {
    it("creates default properties on the object if they are null or undefined", function() {
      expect(obj.defaults({ one: 5, four: 4 })).toEqual({ one: 1, two: 2, three: 3, four: 4 });
    });
  });

  describe("dup", function() {
    it("creates a shallow copy of the object", function() {
      expect(obj.dup()).toEqual({ one: 1, two: 2, three: 3});
      expect(obj.dup() === obj).toBeFalse();
    });
  });

  describe("tap", function() {

    var intercepted;
    var returned;
    var interceptor;

    beforeEach(function() {
      interceptor = function(value) {
        intercepted = value;
      };
      returned = obj.pick('one', 'two').tap(interceptor).omit('two');
    });

    it("taps into a method chain", function() {
      expect(intercepted).toEqual({ one: 1, two: 2 });
    });

    it("can use tapped objects in a chain", function() {
      returned = obj.values().map(function(n){ return n * 2; }).max().tap(interceptor).toString();
      expect(returned).toEqual('6');
      expect(intercepted).toEqual(6);
    });
  });

  describe("defines", function() {
    it("determines if an object contains a given key", function() {
      expect(obj.defines('one')).toBeTrue();
      expect(obj.defines('five')).toBeFalse();
    });
  });

});