describe("String extensions", function() {
  describe("capitalize", function() {
    it("capitalizes a string", function() {
      expect("hello world".capitalize()).toEqual("Hello world");
    });
  });

  describe("humanize", function() {
    it("removes dashes and underscores", function() {
      expect("this-is_a-test_string".humanize()).toEqual("this is a test string");
    });

    it("adds spaces to camelCase words", function() {
      expect("ThisIsATestString".humanize()).toEqual("This Is A Test String");
    });
  });

  describe("hyphenate", function() {
    it("replaces spaces and underscores with hyphens", function() {
      expect("this is a test_string".hyphenate()).toEqual("this-is-a-test-string");
    });

    it("hyphenates camelCase words", function() {
      expect("thisIsATestString".hyphenate()).toEqual("this-is-a-test-string");
    });
  });

  describe("isBlank", function() {
    it("determines if a string is blank", function() {
      expect("".isBlank()).toBeTrue();
      expect("  ".isBlank()).toBeTrue();
      expect("\n".isBlank()).toBeTrue();
      expect("hello".isBlank()).toBeFalse();
    });
  });

  describe("isPresent", function() {
    it("determines if the string is not blank", function() {
      expect("".isPresent()).toBeFalse();
      expect("hello".isPresent()).toBeTrue();
    });
  });

  describe("truncate", function() {
    it("truncates a string at given length", function() {
      expect("this is a test string".truncate(7)).toEqual("this is...");
    });
  });

  describe("titleCase", function() {
    it("title cases a string", function() {
      expect("this is a test string".titleCase()).toEqual("This Is A Test String");
    });
  });

  describe("toNumber", function() {
    it("turns an integer string to a number", function() {
      expect("1".toNumber()).toEqual(1);
    });
  });

  describe("camelize", function() {
    it("it translates a string to camel case", function() {
      expect("this is-a-test_string".camelize()).toEqual("thisIsATestString");
    });
  });

  describe("constantize", function() {
    it("creates a constant string", function() {
      expect("this is a test string".constantize()).toEqual("ThisIsATestString");
    });
  });

  describe("each", function() {
    it("iterates over each character", function() {
      var string = "hello";
      var expected = string.split("");
      string.each(function(character, i) {
        expect(character).toEqual(expected[i]);
      });
    });
  });

  describe("underscore", function() {
    it("replaces spaces and hyphens with underscores", function() {
      expect("this is a test-string".underscore()).toEqual("this_is_a_test_string");
    });

    it("works on camel case words", function() {
      expect("ThisIsATestString".underscore()).toEqual("this_is_a_test_string");
    });
  });

  describe("isEmpty", function() {
    it("determines emptiness", function() {
      expect("".isEmpty()).toBeTrue();
      expect("hello".isEmpty()).toBeFalse();
    });
  });

  describe("isNotEmpty", function() {
    it("determines fullness", function() {
      expect("".isNotEmpty()).toBeFalse();
      expect("hello".isNotEmpty()).toBeTrue();
    });
  });

  describe("includes", function() {
    it("determines if a string contains a sub-string", function() {
      expect("this is a string".includes("is a")).toBeTrue();
      expect("hello".includes("lla")).toBeFalse();
    });
  });
});
