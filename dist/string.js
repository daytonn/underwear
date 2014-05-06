String.prototype.camelize = function() {
  return _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
  }).join('');
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.chunk = function(chunkSize) {
  chunkSize = chunkSize ? chunkSize : this.length;
  return this.match(new RegExp('.{1,' + chunkSize + '}', 'g'));
};

String.prototype.compact = function() {
  return this.replace(/\s/g, "");
};

String.prototype.constantize = function() {
  var s = _(this.split(/_|-|\s/g)).map(function(part, i) {
    return (i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part.toLowerCase();
  }).join('');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

String.prototype.dasherize = function() {
  return this.replace(/_/g, '-').toLowerCase();
};

String.prototype.each = function(iterator) {
  return _.each.call(this, this.split(''), iterator);
};

String.prototype.escape = function() {
  return _.escape.apply(this, [this].concat(_.toArray(arguments)));
};

String.prototype.humanize = function() {
  var s = this.replace(/_/g, ' ').replace(/^\s?/, "").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

String.prototype.hyphenate = function() {
  return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
};

String.prototype.includes = function(string) {
  var s = new RegExp(string, 'g');
  return !!this.match(s);
};

String.prototype.isBlank = function() {
  return (/^(\s?)+$/).test(this);
};

String.prototype.isEmpty = function() {
  return this.length === 0;
};

String.prototype.isNotEmpty = function() {
  return this.length > 0;
};

String.prototype.isPresent = function() {
  return !(/^(\s?)+$/).test(this);
};

String.prototype.lstrip = function() {
  return this.replace(/^\s+/, "");
};

String.prototype.ltrim = function() {
  return this.replace(/^\s+/, "");
};

String.prototype.rstrip = function() {
  return this.replace(/\s+$/, "");
};

String.prototype.rtrim = function() {
  return this.replace(/\s+$/, "");
};

String.prototype.singleSpace = function() {
  return this.trim().replace(/\s{1,}/g, " ");
};

String.prototype.stripTags = function() {
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
};

String.prototype.strip = function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
};

String.prototype.swapCase = function() {
  return this.replace(/[A-Za-z]/g, function(s) {
    return (/[A-Z]/).test(s) ? s.toLowerCase() : s.toUpperCase();
  });
};

String.prototype.titleCase = function() {
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
};

String.prototype.titleize = function() {
  return _(this.replace(/([A-Z])/g, " $1").replace(/-|_/g, " ").split(/\s/)).map(function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
};

String.prototype.toBoolean = function() {
  var truthyStrings = ["true", "yes", "on", "y"];
  var falseyStrings = ["false", "no", "off", "n"];
  if (_(truthyStrings).contains(this.toLowerCase())) {
    return true;
  } else if (_(falseyStrings).contains(this.toLowerCase())) {
    return false;
  } else {
    return this.length > 0 ? true : false;
  }
};

String.prototype.toNumber = function() {
  return this * 1 || 0;
};

String.prototype.trim = function() {
  return this.replace(/^\s+(.+)\s+$/, "$1");
};

String.prototype.truncate = function(length) {
  return (this.length > length) ? this.substring(0, length) + '...' : this;
};

String.prototype.underscore = function() {
  return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
};

String.prototype.unescape = function() {
  return _.unescape.apply(this, [this].concat(_.toArray(arguments)));
};

String.prototype.unwrap = function(wrapper) {
  return this.replace(new RegExp("^" + wrapper + "(.+)" + wrapper + "$"), "$1");
};

String.prototype.wordCount = function(word) {
  var matches;
  var string = this.stripTags();
  matches = (word) ? string.match(new RegExp(word, "g")) : string.match(/\b[A-Za-z_]+\b/g);
  return matches ? matches.length : 0;
};

String.prototype.wrap = function(wrapper) {
  return wrapper.concat(this, wrapper);
};
