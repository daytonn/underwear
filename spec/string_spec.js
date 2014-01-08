describe("String extensions", function() {
  describe("capitalize", function() {
    it("capitalizes a string", function() {
      expect("hello world".capitalize()).toEqual("Hello world");
    });
  });

  describe("humanize", function() {
    it("removes dashes and underscores and capitalizes the string", function() {
      expect("this-is_a-test_string".humanize()).toEqual("This-is a-test string");
    });
  });

  describe("dasherize", function() {
    it("replaces underscores with dashes", function() {
      expect("this is_a test_string".dasherize()).toEqual("this is-a test-string");
    });
  });

  describe("titleize", function() {
    it("creates a title from a string", function() {
      expect("this-is_aTestString".titleize()).toEqual("This Is A Test String");
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
      expect("1.23".toNumber()).toEqual(1.23);
      expect("-1".toNumber()).toEqual(-1);
      expect("-1.23".toNumber()).toEqual(-1.23);
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

  describe("chunk", function() {
    it("splits a string into n sized chunks", function() {
      expect("this is a test".chunk(2)).toEqual(["th", "is", " i", "s ", "a ", "te", "st"]);
      expect("this is a test".chunk(7)).toEqual(["this is", " a test"]);
    });

    it("handles falsy chunk sizes", function() {
      expect("hello".chunk()).toEqual(["hello"]);
      expect("hello".chunk(0)).toEqual(["hello"]);
    });
  });

  describe("trim", function() {
    it("trims whitespace on the left and right side", function() {
      expect("  hello ".trim()).toEqual("hello");
    });

    it("is aliased as strip", function() {
      expect("  hello ".strip()).toEqual("hello");
    });
  });

  describe("ltrim", function() {
    it("trims the whitespace on the left", function() {
      expect("  hello  ".ltrim()).toEqual("hello  ");
    });

    it("is aliased as lstrip", function() {
      expect("  hello  ".lstrip()).toEqual("hello  ");
    });
  });

  describe("rtrim", function() {
    it("trims the whitespace on the right", function() {
      expect("  hello  ".rtrim()).toEqual("  hello");
    });

    it("is aliased as rstrip", function() {
      expect("  hello  ".rstrip()).toEqual("  hello");
    });
  });

  describe("singleSpace", function() {
    it("removes extra whitespace", function() {
      expect("  test   words ".singleSpace()).toEqual("test words");
    });
  });

  describe("compact", function() {
    it("removes all spaces", function() {
      expect("this is a test".compact()).toEqual("thisisatest");
    });
  });

  describe("swapCase", function() {
    it("swaps the case of the characters", function() {
      expect("Hello".swapCase()).toEqual("hELLO");
      expect("hELLO".swapCase()).toEqual("Hello");
    });
  });

  describe("stripTags", function() {
    it("removes html tags", function() {
      expect('hello world'.stripTags()).toEqual('hello world');
      expect('hello <span>world</span>'.stripTags()).toEqual('hello world');
      expect('<a href="#" onclick="moo!">hello</a> world'.stripTags()).toEqual('hello world');
      expect('h<b><em>e</em></b>l<i>l</i>o w<span class="moo" id="x"><b>o</b></span>rld'.stripTags()).toEqual('hello world');
      expect('1\n2'.stripTags()).toEqual('1\n2');
      expect('one < two <a href="#" title="foo > bar">blah</a> <input disabled>baz'.stripTags()).toEqual('one < two blah baz');
    });
  });

  describe("wordCount", function() {
    it("returns the count of words in the string", function() {
      expect("hello world".wordCount()).toEqual(2);
      expect("hellow_world".wordCount()).toEqual(1);
      expect("hello-world".wordCount()).toEqual(2);
      expect("this is a test".wordCount()).toEqual(4);
      expect("".wordCount()).toEqual(0);
      expect("<p>Hello world</p>".wordCount()).toEqual(2);
    });

    it("returns the count of a given word", function() {
      expect("this is a test".wordCount("hello")).toEqual(0);
      expect("hello world".wordCount("hello")).toEqual(1);
      expect("hello world, hello".wordCount("hello")).toEqual(2);
    });
  });

  describe("wrap", function() {
    it("wraps a string in a given string", function() {
      expect("hello".wrap('"')).toEqual('"hello"');
      expect("hello".wrap("'")).toEqual("'hello'");
      expect("world".wrap("hello")).toEqual("helloworldhello");
    });
  });

  describe("unwrap", function() {
    it("unwraps a given string from the outside of a string", function() {
      expect("'hello'".unwrap("'")).toEqual("hello");
      expect('"hello"'.unwrap('"')).toEqual("hello");
      expect("helloworldhello".unwrap("hello")).toEqual("world");
    });
  });

  describe("escape", function() {
    it("should escape a string with esacapeable characters", function() {
      expect("<p>hello & world</p>".escape()).toEqual("&lt;p&gt;hello &amp; world&lt;/p&gt;");
    });
  });

  describe("unescape", function() {
    it("should unescape a string with escaped characters", function() {
      expect("&lt;p&gt;hello &amp; world&lt;/p&gt;".unescape()).toEqual("<p>hello & world</p>");
    });
  });

  describe("toBoolean", function() {
    it("translates a given string to boolean", function() {
      expect("y".toBoolean()).toBeTrue();
      expect("Y".toBoolean()).toBeTrue();
      expect("on".toBoolean()).toBeTrue();
      expect("ON".toBoolean()).toBeTrue();
      expect("yes".toBoolean()).toBeTrue();
      expect("YES".toBoolean()).toBeTrue();
      expect("true".toBoolean()).toBeTrue();
      expect("TRUE".toBoolean()).toBeTrue();

      expect("n".toBoolean()).toBeFalse();
      expect("N".toBoolean()).toBeFalse();
      expect("off".toBoolean()).toBeFalse();
      expect("OFF".toBoolean()).toBeFalse();
      expect("no".toBoolean()).toBeFalse();
      expect("NO".toBoolean()).toBeFalse();
      expect("false".toBoolean()).toBeFalse();
      expect("FALSE".toBoolean()).toBeFalse();

      expect("".toBoolean()).toBeFalse();
      expect("hello".toBoolean()).toBeTrue();
    });
  });
});
