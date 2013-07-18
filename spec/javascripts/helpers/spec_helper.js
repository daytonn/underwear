beforeEach(function() {

  this.addMatchers({

    toBeTrue: function() {
      return this.actual === true;
    },

    toBeFalse: function() {
        return this.actual === false;
    },

    toBeObject: function() {
      if (typeof this.actual === "undefined") {
        return false;
      }
      else {
        return compareConstructor(this.actual.constructor, Object);
      }
    },

    toBeArray: function() {
      return compareConstructor(this.actual.constructor, Array);
    },

    toBeString: function() {
      return compareConstructor(this.actual.constructor, String);
    },

    toBeFunction: function() {
      return compareConstructor(this.actual, Function);
    },

    toBeNumber: function() {
      return compareConstructor(this.actual, Number);
    },

    toBeTypeof: function(b) {
      return compareConstructor(this.actual, b);
    }

  });

  function compareConstructor(a, b) {
    if (typeof a === "undefined") {
      return false;
    }
    else {
      return a.constructor == b;
    }
  }

});
