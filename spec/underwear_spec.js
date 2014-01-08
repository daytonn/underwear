describe("uw", function() {
  describe("defineMethod", function() {
    it("has a convenience method to define a method on prototype", function() {
      uw.defineMethod(Array.prototype, "foo", function() {});
      expect([].foo).toBeDefined();
      expect([].propertyIsEnumerable("foo")).toBeFalse();
      expect([].foo).not.toEqual("bar");
    });
  });

  describe("defineAlias", function() {
    it("can define an alias", function() {
      uw.defineAlias(Array.prototype, "reverse", "backwards");
      expect([1,2,3].backwards()).toEqual([1,2,3].reverse());
    });

    it("gracefully handles nonexistent methods", function() {
      uw.defineAlias(Array.prototype, "nonexistent", "wontWork");
      expect([].wontWork).toBeUndefined();
    });
  });
});
