require("./spec_helper");

describe("String extensions", function() {
  describe("capitalize", function() {
    it("capitalizes a string", function() {
      expect("hello world".capitalize()).to.equal("Hello world");
    });
  });

  describe("humanize", function() {
    it("removes dashes and underscores and capitalizes the string", function() {
      expect("this-is_a-test_string".humanize()).to.equal("This-is a-test string");
    });
  });

  describe("dasherize", function() {
    it("replaces underscores with dashes", function() {
      expect("this is_a test_string".dasherize()).to.equal("this is-a test-string");
    });
  });

  describe("titleize", function() {
    it("creates a title from a string", function() {
      expect("this-is_aTestString".titleize()).to.equal("This Is A Test String");
    });
  });

  describe("hyphenate", function() {
    it("replaces spaces and underscores with hyphens", function() {
      expect("this is a test_string".hyphenate()).to.equal("this-is-a-test-string");
    });

    it("hyphenates camelCase words", function() {
      expect("thisIsATestString".hyphenate()).to.equal("this-is-a-test-string");
    });
  });

  describe("isBlank", function() {
    it("determines if a string is blank", function() {
      expect("".isBlank()).to.equal(true);
      expect("  ".isBlank()).to.equal(true);
      expect("\n".isBlank()).to.equal(true);
      expect("hello".isBlank()).to.equal(false);
    });
  });

  describe("isPresent", function() {
    it("determines if the string is not blank", function() {
      expect("".isPresent()).to.equal(false);
      expect("hello".isPresent()).to.equal(true);
    });
  });

  describe("truncate", function() {
    it("truncates a string at given length", function() {
      expect("this is a test string".truncate(7)).to.equal("this is...");
    });
  });

  describe("titleCase", function() {
    it("title cases a string", function() {
      expect("this is a test string".titleCase()).to.equal("This Is A Test String");
    });
  });

  describe("toNumber", function() {
    it("turns an integer string to a number", function() {
      expect("1".toNumber()).to.equal(1);
      expect("1.23".toNumber()).to.equal(1.23);
      expect("-1".toNumber()).to.equal(-1);
      expect("-1.23".toNumber()).to.equal(-1.23);
    });
  });

  describe("camelize", function() {
    it("it translates a string to camel case", function() {
      expect("this is-a-test_string".camelize()).to.equal("thisIsATestString");
    });
  });

  describe("constantize", function() {
    it("creates a constant string", function() {
      expect("this is a test string".constantize()).to.equal("ThisIsATestString");
    });
  });

  describe("each", function() {
    it("iterates over each character", function() {
      var string = "hello";
      var expected = string.split("");
      string.each(function(character, i) {
        expect(character).to.equal(expected[i]);
      });
    });
  });

  describe("underscore", function() {
    it("replaces spaces and hyphens with underscores", function() {
      expect("this is a test-string".underscore()).to.equal("this_is_a_test_string");
    });

    it("works on camel case words", function() {
      expect("ThisIsATestString".underscore()).to.equal("this_is_a_test_string");
    });
  });

  describe("isEmpty", function() {
    it("determines emptiness", function() {
      expect("".isEmpty()).to.equal(true);
      expect("hello".isEmpty()).to.equal(false);
    });
  });

  describe("isNotEmpty", function() {
    it("determines fullness", function() {
      expect("".isNotEmpty()).to.equal(false);
      expect("hello".isNotEmpty()).to.equal(true);
    });
  });

  describe("includes", function() {
    it("determines if a string contains a sub-string", function() {
      expect("this is a string".includes("is a")).to.equal(true);
      expect("hello".includes("lla")).to.equal(false);
    });
  });

  describe("chunk", function() {
    it("splits a string into n sized chunks", function() {
      expect("this is a test".chunk(2)).to.be.like(["th", "is", " i", "s ", "a ", "te", "st"]);
      expect("this is a test".chunk(7)).to.be.like(["this is", " a test"]);
    });

    it("handles falsy chunk sizes", function() {
      expect("hello".chunk()).to.be.like(["hello"]);
      expect("hello".chunk(0)).to.be.like(["hello"]);
    });
  });

  describe("trim", function() {
    it("trims whitespace on the left and right side", function() {
      expect("  hello ".trim()).to.equal("hello");
    });

    it("is aliased as strip", function() {
      expect("  hello ".strip()).to.equal("hello");
    });
  });

  describe("ltrim", function() {
    it("trims the whitespace on the left", function() {
      expect("  hello  ".ltrim()).to.equal("hello  ");
    });

    it("is aliased as lstrip", function() {
      expect("  hello  ".lstrip()).to.equal("hello  ");
    });
  });

  describe("rtrim", function() {
    it("trims the whitespace on the right", function() {
      expect("  hello  ".rtrim()).to.equal("  hello");
    });

    it("is aliased as rstrip", function() {
      expect("  hello  ".rstrip()).to.equal("  hello");
    });
  });

  describe("singleSpace", function() {
    it("removes extra whitespace", function() {
      expect("  test   words ".singleSpace()).to.equal("test words");
    });
  });

  describe("compact", function() {
    it("removes all spaces", function() {
      expect("this is a test".compact()).to.equal("thisisatest");
    });
  });

  describe("swapCase", function() {
    it("swaps the case of the characters", function() {
      expect("Hello".swapCase()).to.equal("hELLO");
      expect("hELLO".swapCase()).to.equal("Hello");
    });
  });

  describe("stripTags", function() {
    it("removes html tags", function() {
      expect('hello world'.stripTags()).to.equal('hello world');
      expect('hello <span>world</span>'.stripTags()).to.equal('hello world');
      expect('<a href="#" onclick="moo!">hello</a> world'.stripTags()).to.equal('hello world');
      expect('h<b><em>e</em></b>l<i>l</i>o w<span class="moo" id="x"><b>o</b></span>rld'.stripTags()).to.equal('hello world');
      expect('1\n2'.stripTags()).to.equal('1\n2');
      expect('one < two <a href="#" title="foo > bar">blah</a> <input disabled>baz'.stripTags()).to.equal('one < two blah baz');
    });
  });

  describe("wordCount", function() {
    it("returns the count of words in the string", function() {
      expect("hello world".wordCount()).to.equal(2);
      expect("hellow_world".wordCount()).to.equal(1);
      expect("hello-world".wordCount()).to.equal(2);
      expect("this is a test".wordCount()).to.equal(4);
      expect("".wordCount()).to.equal(0);
      expect("<p>Hello world</p>".wordCount()).to.equal(2);
    });

    it("returns the count of a given word", function() {
      expect("this is a test".wordCount("hello")).to.equal(0);
      expect("hello world".wordCount("hello")).to.equal(1);
      expect("hello world, hello".wordCount("hello")).to.equal(2);
    });
  });

  describe("wrap", function() {
    it("wraps a string in a given string", function() {
      expect("hello".wrap('"')).to.equal('"hello"');
      expect("hello".wrap("'")).to.equal("'hello'");
      expect("world".wrap("hello")).to.equal("helloworldhello");
    });
  });

  describe("unwrap", function() {
    it("unwraps a given string from the outside of a string", function() {
      expect("'hello'".unwrap("'")).to.equal("hello");
      expect('"hello"'.unwrap('"')).to.equal("hello");
      expect("helloworldhello".unwrap("hello")).to.equal("world");
    });
  });

  describe("escape", function() {
    it("should escape a string with esacapeable characters", function() {
      expect("<p>hello & world</p>".escape()).to.equal("&lt;p&gt;hello &amp; world&lt;/p&gt;");
    });
  });

  describe("unescape", function() {
    it("should unescape a string with escaped characters", function() {
      expect("&lt;p&gt;hello &amp; world&lt;/p&gt;".unescape()).to.equal("<p>hello & world</p>");
    });
  });

  describe("toBoolean", function() {
    it("translates a given string to boolean", function() {
      expect("y".toBoolean()).to.equal(true);
      expect("Y".toBoolean()).to.equal(true);
      expect("on".toBoolean()).to.equal(true);
      expect("ON".toBoolean()).to.equal(true);
      expect("yes".toBoolean()).to.equal(true);
      expect("YES".toBoolean()).to.equal(true);
      expect("true".toBoolean()).to.equal(true);
      expect("TRUE".toBoolean()).to.equal(true);

      expect("n".toBoolean()).to.equal(false);
      expect("N".toBoolean()).to.equal(false);
      expect("off".toBoolean()).to.equal(false);
      expect("OFF".toBoolean()).to.equal(false);
      expect("no".toBoolean()).to.equal(false);
      expect("NO".toBoolean()).to.equal(false);
      expect("false".toBoolean()).to.equal(false);
      expect("FALSE".toBoolean()).to.equal(false);

      expect("".toBoolean()).to.equal(false);
      expect("hello".toBoolean()).to.equal(true);
    });
  });
});
