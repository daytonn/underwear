beforeEach(function() {

  this.addMatchers({

    toBeTrue: function() {
      return this.actual === true; 
    },

    toBeFalse: function() {
        return this.actual === false;
    }

  });

});
