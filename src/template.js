// Template wraps the template in
// a class that is slightly enhanced
var Template = (function() {

    // Template takes a src which can be a string or a template element id (prefixed with a #)
    function Template(src) {
        if (src.match(/^#/)) {
            this.src = document.getElementById(src.replace(/^#/, '')).innerHTML;
        }
        else {
            this.src = src;
        }
    }

    // The render method takes a data object and optional settings
    Template.prototype.render = function(data, settings) {
        return _.template(this.src, data, settings);
    };

    return Template;
})();