Array.prototype.reduceRight = function() {
  return _.reduceRight.apply(_, [this].concat(_.toArray(arguments)));
};
