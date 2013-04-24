Underwear [![](https://secure.travis-ci.org/daytonn/underwear.png?branch=master)](http://travis-ci.org/daytonn/underwear)
=========

Underwear is a library to extend javascript built-in prototypes with the
underscore methods.

The entire Underscore,js library has been translated to extended prototypes.

All the original QUnit tests have been translated to Jasmine specs ;)

* [Source Documentation](http://daytonn.github.com/underwear/docs/underwear.html)

##Extended prototypes:

### Array:
 - [all](http://underscorejs.org/#every)
 - [any](http://underscorejs.org/#some)
 - [collect](http://underscorejs.org/#map)
 - [compact](http://underscorejs.org/#compact)
 - [contains](http://underscorejs.org/#contains)
 - [countBy](http://underscorejs.org/#countBy)
 - [detect](http://underscorejs.org/#find)
 - [difference](http://underscorejs.org/#difference)
 - [each](http://underscorejs.org/#each)
 - [every](http://underscorejs.org/#every)
 - [filter](http://underscorejs.org/#filter)
 - [find](http://underscorejs.org/#find)
 - [first](http://underscorejs.org/#first)
 - [flatten](http://underscorejs.org/#flatten)
 - [foldr](http://underscorejs.org/#reduceRight)
 - [groupBy](http://underscorejs.org/#groupBy)
 - [include](http://underscorejs.org/#contains)
 - [indexOf](http://underscorejs.org/#indexOf)
 - [initial](http://underscorejs.org/#initial)
 - [inject](http://underscorejs.org/#reduce)
 - [intersection](http://underscorejs.org/#intersection)
 - [invoke](http://underscorejs.org/#invoke)
 - [isEmpty](http://underscorejs.org/#isEmpty)
 - [last](http://underscorejs.org/#last)
 - [lastIndexOf](http://underscorejs.org/#lastIndexOf)
 - [map](http://underscorejs.org/#map)
 - [max](http://underscorejs.org/#max)
 - [min](http://underscorejs.org/#min)
 - [pluck](http://underscorejs.org/#pluck)
 - [reduce](http://underscorejs.org/#reduce)
 - [reduceRight](http://underscorejs.org/#reduceRight)
 - [reject](http://underscorejs.org/#reject)
 - [rest](http://underscorejs.org/#rest)
 - [select](http://underscorejs.org/#map)
 - [shuffle](http://underscorejs.org/#shuffle)
 - [size](http://underscorejs.org/#size)
 - [some](http://underscorejs.org/#some)
 - [sortBy](http://underscorejs.org/#sortBy)
 - [sortedIndex](http://underscorejs.org/#sortedIndex)
 - [tail](http://underscorejs.org/#rest)
 - [take](http://underscorejs.org/#first)
 - [union](http://underscorejs.org/#union)
 - [uniq](http://underscorejs.org/#uniq)
 - [without](http://underscorejs.org/#without)
 - [zip](http://underscorejs.org/#zip)


###String
 - isEmpty - (custom method that tests a string for emptiness)
 - [escape](http://underscorejs.org/#escape)

###Function:
 - [bind](http://underscorejs.org/#bind)
 - [compose](http://underscorejs.org/#compose)
 - [debounce](http://underscorejs.org/#debounce)
 - [defer](http://underscorejs.org/#defer)
 - [delay](http://underscorejs.org/#delay)
 - [memoize](http://underscorejs.org/#memoize)
 - [once](http://underscorejs.org/#once)
 - [throttle](http://underscorejs.org/#throttle)
 - [wrap](http://underscorejs.org/#wrap)

### Object:
No Object methods are ported from underscore to the Object prototype. This is a terrible idea that pretty much fucks up any other js lib.

###Template:
 - render - (custom Base class based on the [template](http://underscorejs.org/#template) function)

##Utilities
All the utility methods have been created as global utility methods. These look much cleaner in conditionals.

 - [isEqual](http://underscorejs.org/#isEqual)
 - [isEmpty](http://underscorejs.org/#isEmpty)
 - [isArguments](http://underscorejs.org/#isArguments)
 - [isBoolean](http://underscorejs.org/#isBoolean)
 - [isDate](http://underscorejs.org/#isDate)
 - [isElement](http://underscorejs.org/#isElement)
 - [isFunction](http://underscorejs.org/#isFunction)
 - [isNaN](http://underscorejs.org/#isNaN)
 - [isNull](http://underscorejs.org/#isNull)
 - [isNumber](http://underscorejs.org/#isNumber)
 - [isRegExp](http://underscorejs.org/#isRegExp)
 - [isString](http://underscorejs.org/#isString)
 - [isUndefined](http://underscorejs.org/#isUndefined)
 - isDefined - (Underwear.js additional convenience method)
 - [sequence](http://underscorejs.org/#uniqueId)(More accurate naming of _.uniqueId)
 - uniqueID - (Underwear.js additional convenience method which generates a unique-enough identifier)