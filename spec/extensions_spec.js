describe("JavaScript extensions", function() {

  describe("isTypeOf", function() {

    it("can detect a string", function() {
      expect(isTypeOf(String, '')).toBeTrue();
    });

    it("can distinguish between an Array and an Object", function() {
      expect(isTypeOf(Array, [])).toBeTrue();
      expect(isTypeOf(Object, [])).toBeFalse();
    });

  });

  describe("isNotTypeOf", function() {
    it("inverts detection", function() {
      expect(isNotTypeOf(Array, '')).toBeTrue();
    });

    it("can distinguish between an Array and an Object", function() {
      expect(isNotTypeOf(Object, [])).toBeTrue();
      expect(isNotTypeOf(Array, [])).toBeFalse();
    });
  });

});