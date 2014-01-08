(function() {
  uw.defineMethod(String.prototype, "capitalize", function() {
    uw.requiresUnderscore("capitalize");
    return this.charAt(0).toUpperCase() + this.slice(1);
  });

  uw.defineMethod(String.prototype, "trim", function() {
    return this.replace(/^\s+(.+)\s+$/, "$1");
  });

  uw.defineMethod(String.prototype, "ltrim", function() {
    return this.replace(/^\s+/, "");
  });

  uw.defineMethod(String.prototype, "rtrim", function() {
    return this.replace(/\s+$/, "");
  });

  uw.defineMethod(String.prototype, "compact", function() {
    return this.replace(/\s/g, "");
  });

  uw.defineMethod(String.prototype, "singleSpace", function() {
    return this.trim().replace(/\s{1,}/g, " ");
  });

  uw.defineMethod(String.prototype, "titleize", function() {
    uw.requiresUnderscore("titleize");
    return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
      return s.capitalize();
    }).join(" ");
  });

  uw.defineAlias(String.prototype, "titleize", "titleCase");

  uw.defineMethod(String.prototype, "dasherize", function() {
    return this.replace(/_/g, '-').toLowerCase();
  });

  uw.defineMethod(String.prototype, "humanize", function() {
    return this.replace(/_/g, ' ').replace(/^\s?/, "").toLowerCase().capitalize();
  });

  uw.defineMethod(String.prototype, "hyphenate", function() {
    return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
  });

  uw.defineMethod(String.prototype, "isBlank", function() {
    return (/^(\s?)+$/).test(this);
  });

  uw.defineMethod(String.prototype, "isPresent", function() {
    return this.length > 0 && !this.isBlank();
  });

  uw.defineMethod(String.prototype, "truncate", function(length) {
    return (this.length > length) ? this.substring(0, length) + '...' : this;
  });

  uw.defineMethod(String.prototype, "toNumber", function() {
    return this * 1 || 0;
  });

  uw.defineMethod(String.prototype, "camelize", function() {
    uw.requiresUnderscore("camelize");
    return _(this.split(/_|-|\s/g)).map(function(part, i) {
      return (i > 0) ? part.capitalize() : part.toLowerCase();
    }).join('');
  });

  uw.defineMethod(String.prototype, "constantize", function() {
    return this.camelize().capitalize();
  });

  uw.defineMethod(String.prototype, "each", function(iterator) {
    uw.requiresUnderscore("each");
    return _.each.call(this, this.split(''), iterator);
  });

  uw.defineMethod(String.prototype, "underscore", function() {
    return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
  });

  uw.defineMethod(String.prototype, "isEmpty", function() {
    return this.length === 0;
  });

  uw.defineMethod(String.prototype, "isNotEmpty", function() {
    return this.length > 0;
  });

  uw.defineMethod(String.prototype, "includes", function(string) {
    var s = new RegExp(string, 'g');
    return this.match(s) ? true : false;
  });

  uw.defineMethod(String.prototype, "chunk", function(chunkSize) {
    chunkSize = chunkSize ? chunkSize : this.length;
    return this.match(new RegExp('.{1,' + chunkSize + '}', 'g'));
  });

  uw.defineMethod(String.prototype, "swapCase", function() {
    return this.replace(/[A-Za-z]/g, function(s) {
      return (/[A-Z]/).test(s) ? s.toLowerCase() : s.toUpperCase();
    });
  });

  uw.defineMethod(String.prototype, "stripTags", function() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  });

  uw.defineMethod(String.prototype, "wordCount", function(word) {
    uw.requiresUnderscore("wordCount");
    var matches;
    var string = this.stripTags();
    matches = (word) ? string.match(new RegExp(word, "g")) : string.match(/\b[A-Za-z_]+\b/g);
    return matches ? matches.length : 0;
  });

  uw.defineMethod(String.prototype, "wrap", function(wrapper) {
    return wrapper.concat(this, wrapper);
  });

  uw.defineMethod(String.prototype, "unwrap", function(wrapper) {
    return this.replace(new RegExp("^" + wrapper + "(.+)" + wrapper + "$"), "$1");
  });

  uw.defineMethod(String.prototype, "escape", function() {
    return _.escape.apply(this, [this].concat(_.toArray(arguments)));
  });

  uw.defineMethod(String.prototype, "unescape", function() {
    return _.unescape.apply(this, [this].concat(_.toArray(arguments)));
  });

  uw.defineMethod(String.prototype, "toBoolean", function() {
    var truthyStrings = ["true", "yes", "on", "y"];
    var falseyStrings = ["false", "no", "off", "n"];
    if (_(truthyStrings).contains(this.toLowerCase())) {
      return true;
    } else if (_(falseyStrings).contains(this.toLowerCase())) {
      return false;
    } else {
      return this.isNotEmpty() ? true : false;
    }
  });

  uw.defineAlias(String.prototype, "trim", "strip");
  uw.defineAlias(String.prototype, "ltrim", "lstrip");
  uw.defineAlias(String.prototype, "rtrim", "rstrip");

})();
