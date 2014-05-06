(function(global) {
  global.isEmpty = function(suspect) {
    return !!!(suspect && suspect.length > 0);
  };
})(global || window || this);
