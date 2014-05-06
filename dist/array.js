Array.prototype.all = function() {
  return _.all.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.any = function() {
  return _.any.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.collect = function() {
  return _.collect.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.compact = function() {
  return _.compact.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.contains = function() {
  return _.contains.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.countBy = function() {
  return _.countBy.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.detect = function() {
  return _.detect.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.difference = function() {
  return _.difference.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.each = function() {
  return _.each.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.every = function() {
  return _.every.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.filter = function() {
  return _.filter.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.find = function() {
  return _.find.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.first = function() {
  return _.first.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.flatten = function() {
  return _.flatten.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.foldr = function() {
  return _.foldr.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.groupBy = function() {
  return _.groupBy.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.include = function() {
  return _.include.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.indexOf = function() {
  return _.indexOf.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.initial = function() {
  return _.initial.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.inject = function() {
  return _.inject.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.intersection = function() {
  return _.intersection.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.invoke = function() {
  return _.invoke.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.isEmpty = function() {
  return _.isEmpty.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.isNotEmpty = function() {
  return !_.isEmpty.call(this, this);
};

Array.prototype.lastIndexOf = function() {
  return _.lastIndexOf.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.last = function() {
  return _.last.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.map = function() {
  return _.map.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.max = function() {
  return _.max.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.min = function() {
  return _.min.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.pluck = function() {
  return _.pluck.apply(_, [this].concat(_.toArray(arguments)));
};

Array.range = function() {
  return _.range.apply([], arguments);
};

Array.prototype.reduceRight = function() {
  return _.reduceRight.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.reduce = function() {
  return _.reduce.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.reject = function() {
  return _.reject.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.rest = function() {
  return _.rest.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.second = function() {
  return this[1];
};

Array.prototype.select = function() {
  return _.select.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.shuffle = function() {
  return _.shuffle.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.size = function() {
  return _.size.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.some = function() {
  return _.some.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.sortBy = function() {
  return _.sortBy.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.sortedIndex = function() {
  return _.sortedIndex.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.sum = function() {
  // `[1, 2, 3].sum(); // 6`
  return _.reduce(this, function(memo, num) {
    return memo + num;
  }, 0);
};

Array.prototype.tail = function() {
  return _.tail.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.take = function() {
  return _.take.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.third = function() {
  return this[2];
};

Array.prototype.union = function() {
  return _.union.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.uniq = function() {
  return _.uniq.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.without = function() {
  return _.without.apply(_, [this].concat(_.toArray(arguments)));
};

Array.prototype.zip = function() {
  return _.zip.apply(_, [this].concat(_.toArray(arguments)));
};
