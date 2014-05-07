if (typeof require !== 'undefined') {
  require('./spec_helper');
  require("../dist/object");
}

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
      expect(subject._keys()).to.be.like(['one', 'two', 'three']);
    });
  });

  describe("values", function() {
    it("returns an array of the object's values", function() {
      expect(subject._values()).to.be.like([1, 2, 3]);
    });
  });

  describe("pairs", function() {
    it("returns an array of key value pairs", function() {
      expect(subject._pairs()).to.be.like([['one', 1], ['two', 2], ['three', 3]]);
    });
  });

  describe("functions", function() {
    it("returns all the function properties of the object", function() {
      subject.test = function() {};
      expect(subject._functions()).to.be.like(['test']);
    });
  });

  describe("extend", function() {
    it("extends another object's properties", function() {
      expect(subject._extend({ four: 4 }).four).to.equal(4);
    });
  });

  describe("pick", function() {
    it("returns a copy of the object including only the whitelisted keys", function() {
      expect(subject._pick('one', 'three')).to.be.like({ one: 1, three: 3 });
    });
  });

  describe("omit", function() {
    it("returns a copy of the object with the blacklisted keys omitted", function() {
      expect(subject._omit('one', 'three')).to.be.like({ two: 2 });
    });
  });

  describe("defaults", function() {
    it("creates default properties on the object if they are null or undefined", function() {
      expect(subject._defaults({ one: 5, four: 4 })).to.be.like({ one: 1, two: 2, three: 3, four: 4 });
    });
  });

  describe("clone", function() {
    it("creates a shallow copy of the object", function() {
      var clone = subject._clone();
      expect(clone).to.be.like({ one: 1, two: 2, three: 3});
      expect(clone === subject).to.equal(false);
    });
  });

  describe("map", function() {
    it("can map over each key/value pair", function() {
      expect(subject._map(function(value) { return value })).to.be.like([1, 2, 3]);
      expect(subject._map(function(_, key) { return key })).to.be.like(["one", "two", "three"]);
    });
  });
});
