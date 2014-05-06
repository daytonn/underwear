(function(global) {
  global.isNotTypeof = function (constructor, suspect) {
    return suspect.constructor !== constructor;
  };
})(global || window || this);
