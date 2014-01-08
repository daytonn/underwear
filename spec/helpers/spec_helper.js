beforeEach(function() {
  jasmine.addMatchers({
    toBeTrue: function() {
      return {
        compare: function(actual) {
          return {
            pass: actual === true,
            message: "Expected " + actual + " to be true"
          };
        }
      };
    },

    toBeFalse: function() {
      return {
        compare: function(actual) {
          return {
            pass: actual === false,
            message: "Expected " + actual + " to be false"
          };
        }
      };
    },

    toBeEmpty: function() {
      return {
        compare: function(actual) {
          var pass;
          if (actual.length) {
            pass = actual.length === 0;
          } else {
            for (var prop in actual) pass = false;
            pass = (pass === undefined) ? true : false;
          }
          return {
            pass: pass,
            message: "Expected " + actual + " to be empty"
          };
        }
      };
    },

    toBeObject: function() {
      return {
        compare: function(actual) {
          return {
            pass: compareConstructor(actual, Object),
            message: "Expected " + actual + " to be an Object"
          };
        }
      };
    },

    toBeArray: function() {
      return {
        compare: function(actual) {
          return {
            pass: compareConstructor(actual, Array),
            message: "Expected " + actual + " to be an Array"
          };
        }
      };
    },

    toBeNumber: function() {
      return {
        compare: function(actual) {
          return {
            pass: compareConstructor(actual, Number),
            message: "Expected " + actual + " to be a Number"
          };
        }
      };
    },

    toBeString: function() {
      return {
        compare: function(actual) {
          return {
            pass: compareConstructor(actual, String),
            message: "Expected " + actual + " to be a String"
          };
        }
      };
    },

    toBeFunction: function() {
      return {
        compare: function(actual) {
          return {
            pass: compareConstructor(actual, Function),
            message: "Expected " + actual + " to be a Function"
          };
        }
      };
    },

    toBeTypeof: function() {
      return {
        compare: function(actual, b) {
          return {
            pass: compareConstructor(actual, b),
            message: "Expected " + actual + " to be a typeof " + b
          };
        }
      };
    },

    // jQuery matchers
    toBeJqueryWrapped: function() {
      return {
        compare: function(actual, selector) {
          return {
            pass: (selector && actual && actual.selector !== selector) ? false : checkElementExistence(actual),
            message: "Expected " + actual + " to be a jQuery wrapped element"
          };
        }
      };
    },

    toHaveClass: function() {
      return {
        compare: function(actual, className) {
          return {
            pass: actual.hasClass(className),
            message: "Expected " + actual + " to have class " + className
          };
        }
      };
    },

    toBeHidden: function() {
      return {
        compare: function(actual) {
          return {
            pass: !actual.is(":visible"),
            message: "Expected " + actual + " to be hidden"
          };
        }
      };
    },

    toBeVisible: function() {
      return {
        compare: function(actual) {
          return {
            pass: actual.is(":visible"),
            message: "Expected " + actual + " to be visible"
          };
        }
      };
    },

    toExist: function() {
      return {
        compare: function(actual) {
          return {
            pass: actual.length > 0,
            message: "Expected " + actual + " to exist in the DOM"
          };
        }
      };
    },

    toHaveText: function() {
      return {
        compare: function(actual, text) {
          return {
            pass: actual.text().trim() === text,
            message: "Expected " + actual + " to have text " + '"' + text + '"'
          };
        }
      };
    },

    toHaveHTML: function() {
      return {
        compare: function(actual, html) {
          return {
            pass: actual.html().trim() === html,
            message: "Expected " + actual + " to have HTML " + '"' + html + '"'
          };
        }
      };
    },

    toBeChecked: function() {
      return {
        compare: function(actual) {
          return {
            pass: actual.prop("checked"),
            message: "Expected " + actual + " to be checked"
          };
        }
      };
    },

    toHaveAttribute: function(attr, value) {
      return {
        compare: function(actual, attr, value) {
          var pass;
          var message;
          if (value) {
            pass = (actual.attr(attr) === value);
            message = "Expected " + actual + ' to have the "' + attr + '" attribute with a value of "' + value + '"';
          } else {
            pass = !!actual.attr(attr);
            message = "Expected " + actual + ' to have the "' + attr + '" attribute';
          }
          return {
            pass: pass,
            message: message
          };
        }
      };
    }
  });

  // compareConstructor checks an object against a specific type
  function compareConstructor(a, b) {
    if (typeof a === "undefined") return false;
    return a.constructor == b; // double equals is important here, ignore the linter
  }

  // This function is an exhaustive check for the existence
  // of a jQuery wrapped element. It requires an element to
  // be in the DOM and to be jQuery wrapped
  function checkElementExistence(element) {
    if (typeof element === "undefined") return false;
    if (typeof element.selector === "undefined") return false;
    if (!element.length) return false;
    return compareConstructor(element, jQuery);
  }
});
