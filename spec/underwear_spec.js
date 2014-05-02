describe("uw", function() {
  var subject;
  beforeEach(function() {
    subject = uw;
  });

  describe("defineMethod", function() {
    it("has a convenience method to define a method on prototype", function() {
      subject.defineMethod(Array.prototype, "foo", function() {});
      expect([].foo).not.to.equal(undefined);
      expect([].propertyIsEnumerable("foo")).to.equal(false);
      expect([].foo).not.to.equal("bar");
    });
  });

  describe("defineAlias", function() {
    it("can define an alias", function() {
      subject.defineAlias(Array.prototype, "reverse", "backwards");
      expect([1,2,3].backwards()).to.be.like([1,2,3].reverse());
    });

    it("gracefully handles nonexistent methods", function() {
      subject.defineAlias(Array.prototype, "nonexistent", "wontWork");
      expect([].wontWork).to.equal(undefined);
    });
  });
});
