(function(global) {
  global.isDefined = function (suspect) {
    return !_.isUndefined(suspect);
  };
})(global || window || this);
