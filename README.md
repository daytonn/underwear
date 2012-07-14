Underwear [![](https://secure.travis-ci.org/daytonn/underwear.png?branch=master)](http://travis-ci.org/daytonn/underwear)
=========

Underwear is a library to extend javascript built-in prototypes with the
underscore methods.

This is currently a work in progress. I've begun translating all the
QUnit tests to Jasmine specs and making all the tests pass.

[Source Documentation](http://daytonn.github.com/underwear/docs/underwear.html)

##Extended prototypes:

###Array:
 - compact
 - difference
 - first
 - flatten
 - indexOf (defers to native)
 - initial
 - intersection
 - isEmpty
 - last
 - lastIndexOf (defers to native)
 - range (Class method: Array.range(a, b, c))
 - rest
 - tail
 - take
 - union
 - uniq
 - without
 - zip


###String
 - isEmpty

###Function:
 - functions (Alias of Object.functions)

###Object:
 - clone
 - defaults
 - extend
 - functions
 - isElement
 - isEmpty
 - keys
 - pick
 - tap


###Number:
(not yet implemented)

##Custom prototypes

###Template:
(not yet implemented)

###UniqueID:
(not yet implemented)

##Utilities
 - isEqual
 - isEmpty
 - isArguments
 - isBoolean
 - isDate
 - isFunction
 - isNaN
 - isNull
 - isNumber
 - isRegExp
 - isString
 - isUndefined
 - isDefined (Underwear.js addition)