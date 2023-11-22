const {
  ARRAY,
  BIGINT,
  BOOLEAN,
  FUNCTION,
  NULL,
  NUMBER,
  OBJECT,
  STRING,
  SYMBOL,
  UNDEFINED,
} = require('../cjs/types');

Object.assign(globalThis, {
  ARRAY,
  BIGINT,
  BOOLEAN,
  FUNCTION,
  NULL,
  NUMBER,
  OBJECT,
  STRING,
  SYMBOL,
  UNDEFINED,
  assert: (thing, message = 'Unexpected result') => {
    if (!thing)
      throw new Error(message);
  },
  checkType: ({ t }, expected) => {
    assert(t === expected, `unexpected type ${expected}`);
  }
});
