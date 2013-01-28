function isTypeOf(constructor, suspect) {
  return suspect.constructor == constructor;
}

function isNotTypeOf(constructor, suspect) {
  return suspect.constructor != constructor;
}
