Underwear [![](https://secure.travis-ci.org/daytonn/underwear.png?branch=master)](http://travis-ci.org/daytonn/underwear)
=========

Underwear is a library to extend javascript built-in prototypes with the
underscore methods.

The entire Underscore,js library has been translated to extended prototypes. There are a few custom prototypes, and a handful of utility functions to provide an object oriented API for underscore methods.

All the original QUnit tests have been translated to Jasmine specs and are passing ;)

[Source Documentation](http://daytonn.github.com/underwear/docs/underwear.html)

##Extended prototypes:

### Array:
 - all (alias of `every`)
 - any (alias of `some`)
 - collect
 - contains (alias of `include`)
 - compact
 - detect (alias of `find`)
 - difference
 - each
 - every (native if available)
 - first
 - find
 - filter
 - foldr (alias of `foldr`)
 - forEach (native if available)
 - flatten
 - groupBy
 - include
 - indexOf (native if available)
 - initial
 - intersection
 - invoke
 - isEmpty
 - last
 - lastIndexOf (native if available)
 - map (native if available)
 - max
 - min
 - pluck
 - range (Class method: Array.range(a, b, c))
 - reduce (native if available)
 - reject
 - rest
 - tail
 - take
 - select (alias of `find`)
 - shuffle
 - some
 - sortBy
 - sortedIndex
 - size
 - union
 - uniq
 - without
 - zip


###String
 - isEmpty
 - escape

###Function:
 - functions
 - bind (native if available)
 - bindAll
 - compose
 - debounce
 - defer
 - delay
 - memoize
 - methods
 - once
 - throttle
 - wrap

### Object:
 - all (alias of `every`)
 - any (alias of `some`)
 - bind
 - bindAll
 - clone
 - collect (alias of `map`)
 - contains (alias of `include`)
 - defaults
 - detect (alias of `find`)
 - each
 - every (native if available)
 - extend
 - find
 - filter
 - forEach
 - foldr (alias of `reduceRight`)
 - functions
 - groupBy
 - has
 - include
 - invoke
 - isEmpty
 - keys
 - map (native if available)
 - max
 - methods
 - min
 - pick
 - pluck
 - reduce
 - reduceRight
 - reject
 - select (alias of `find`)
 - shuffle
 - some
 - sortBy
 - sortedIndex
 - size
 - tap
 - toArray


###Number:
 - times

##Custom prototypes

###Template:
 - render

###UniqueID:

##Utilities
 - isEqual
 - isEmpty
 - isArguments
 - isBoolean
 - isDate
 - isElement
 - isFunction
 - isNaN
 - isNull
 - isNumber
 - isRegExp
 - isString
 - isUndefined
 - isDefined (Underwear.js addition)