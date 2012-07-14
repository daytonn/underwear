Underwear [![](https://secure.travis-ci.org/daytonn/underwear.png?branch=master)](http://travis-ci.org/daytonn/underwear)
=========

Underwear is a library to extend javascript built-in prototypes with the
underscore methods.

This is currently a work in progress. I've begun translating all the
QUnit tests to Jasmine specs and making all the tests pass.

[Source Documentation](http://daytonn.github.com/underwear/docs/underwear.html)

##Extended prototypes:

###Array:
 - first
 - take
 - rest
 - tail
 - initial
 - last
 - compact
 - flatten
 - without
 - uniq
 - intersection
 - union
 - difference
 - zip
 - indexOf (defers to native)
 - lastIndexOf (defers to native)
 - range (Class method: Array.range(a, b, c))

###Function:
 - functions (Alias of Object.functions)

###Object:
 - keys
 - functions
 - extend
 - pick
 - defaults

###Number:
(not yet implemented)

##Custom prototypes

###Template:
(not yet implemented)

###UniqueID:
(not yet implemented)

##Utilities

###identity
(not yet implemented)

###escape
(not yet implemented)

###result
(not yet implemented)
