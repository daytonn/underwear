require("./spec_helper");

describe("Object", function() {
  var subject;
  beforeEach(function() {
    subject = {
      one: 1,
      two: 2,
      three: 3
    };
  });

  describe("keys", function() {
    it("returns an array of the object's keys", function() {
      expect(subject.keys()).to.be.like(['one', 'two', 'three']);
    });
  });

  describe("values", function() {
    it("returns an array of the object's values", function() {
      expect(subject.values()).to.be.like([1, 2, 3]);
    });
  });

  describe("pairs", function() {
    it("returns an array of key value pairs", function() {
      expect(subject.pairs()).to.be.like([['one', 1], ['two', 2], ['three', 3]]);
    });
  });

  describe("invert", function() {
    it("inverts the keys and values", function() {
      expect(subject.invert()).to.be.like({ 1: 'one', 2: 'two', 3: 'three'});
    });
  });

  describe("functions", function() {
    it("returns all the function properties of the object", function() {
      subject.test = function() {};
      expect(subject.functions()).to.be.like(['test']);
    });
  });

  describe("mixin", function() {
    it("mixes in another object's properties", function() {
      expect(subject.mixin({ four: 4 })).to.be.like({ one: 1, two: 2, three: 3, four: 4 });
    });
  });

  describe("pick", function() {
    it("returns a copy of the object including only the whitelisted keys", function() {
      expect(subject.pick('one', 'three')).to.be.like({ one: 1, three: 3 });
    });
  });

  describe("omit", function() {
    it("returns a copy of the object with the blacklisted keys omitted", function() {
      expect(subject.omit('one', 'three')).to.be.like({ two: 2 });
    });
  });

  describe("defaults", function() {
    it("creates default properties on the object if they are null or undefined", function() {
      expect(subject.defaults({ one: 5, four: 4 })).to.be.like({ one: 1, two: 2, three: 3, four: 4 });
    });
  });

  describe("dup", function() {
    it("creates a shallow copy of the object", function() {
      expect(subject.dup()).to.be.like({ one: 1, two: 2, three: 3});
      expect(subject.dup() === subject).to.equal(false);
    });
  });

  describe("map", function() {
    it("can map over each key/value pair", function() {
      expect(subject.map(function(value) { return value })).to.be.like([1, 2, 3]);
      expect(subject.map(function(_, key) { return key })).to.be.like(["one", "two", "three"]);
    });
  });
});
