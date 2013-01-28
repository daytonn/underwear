// Type checking methods that check the `suspect` against
// the `constructor` and return a boolean value.

//### isTypeOf
function isTypeOf(constructor, suspect) {
  return suspect.constructor == constructor;
}

//### isNotTypeOf
function isNotTypeOf(constructor, suspect) {
  return suspect.constructor != constructor;
}
