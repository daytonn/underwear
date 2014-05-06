(function(global) {
  global.isTypeof = function (constructor, suspect) {
    return suspect.constructor === constructor;
  };
})(global || window || this);
