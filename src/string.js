(function() {
  function requiresUnderscore(func) {
    if (typeof _ === 'undefined') {
      throw new Error(func + ' requires underscore.js');
    }
  }

  if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }

  if (!String.prototype.humanize) {
    String.prototype.humanize = function() {
      return this.replace(/([A-Z])/g, " $1").replace(/-|_/g, ' ').replace(/^\s?/, "");
    };
  }

  if (!String.prototype.hyphenate) {
    String.prototype.hyphenate = function() {
      return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
    };
  }

  if (!String.prototype.isBlank) {
    String.prototype.isBlank = function() {
      return (/^(\s?)+$/).test(this);
    };
  }

  if (!String.prototype.isPresent) {
    String.prototype.isPresent = function() {
      return this.length > 0;
    };
  }

  if (!String.prototype.truncate) {
    String.prototype.truncate = function(length) {
      return (this.length > length) ? this.substring(0, length) + '...' : this;
    };
  }

  if (!String.prototype.titleCase) {
    requiresUnderscore("capitalize");
    String.prototype.titleCase = function() {
      return _(this.replace(/([A-Z])/g, " $1").replace(/_|-/g, " ").split(/\s/)).map(function(word) {
        return word.capitalize();
      }).join(" ");
    };
  }

  if (!String.prototype.toNumber) {
    String.prototype.toNumber = function() {
      return parseInt(this, 10);
    };
  }

  if (!String.prototype.camelize) {
    String.prototype.camelize = function() {
      return _(this.split(/_|-|\s/g)).map(function(part, i) {
        return (i > 0) ? part.capitalize() : part.toLowerCase();
      }).join('');
    };
  }

  if (!String.prototype.constantize) {
    String.prototype.constantize = function() {
      return this.camelize().capitalize();
    };
  }

  if (!String.prototype.each) {
    requiresUnderscore('String.prototype.each');

    String.prototype.each = function(iterator) {
      return _.each.call(this, this.split(''), iterator);
    };
  }

  if (!String.prototype.underscore) {
    String.prototype.underscore = function() {
      return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
    };
  }

  if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function() {
      return this.length === 0;
    };
  }

  if (!String.prototype.isNotEmpty) {
    String.prototype.isNotEmpty = function() {
      return this.length > 0;
    };
  }

  if (!String.prototype.includes) {
    String.prototype.includes = function(string) {
      var s = new RegExp(string, 'g');
      return this.match(s) ? true : false;
    };
  }
})();
