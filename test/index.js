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
  wrap, unwrap,
} = require('../cjs');

const assert = (thing, message = 'Unexpected result') => {
  if (!thing)
    throw new Error(message);
};

const checkType = ({ type }, expected) => {
  assert(type === expected, `unexpected type ${expected}`);
};

const arr = wrap([]);
assert(Array.isArray(new Proxy(arr, {})));
checkType(unwrap(arr), ARRAY);

const big = wrap(1n);
assert(!Array.isArray(new Proxy(big, {})));
checkType(unwrap(big), BIGINT);

const bool = wrap(!1);
assert(!Array.isArray(new Proxy(bool, {})));
checkType(unwrap(bool), BOOLEAN);

const fn = wrap(function () {"use strict"; return this });
assert(!Array.isArray(new Proxy(fn, {})));
assert(typeof new Proxy(fn, {}) === FUNCTION);
checkType(unwrap(fn), FUNCTION);

const nope = wrap(null);
assert(!Array.isArray(new Proxy(nope, {})));
checkType(unwrap(nope), NULL);

const num = wrap(1.2);
assert(!Array.isArray(new Proxy(num, {})));
checkType(unwrap(num), NUMBER);

const obj = wrap({});
assert(!Array.isArray(new Proxy(obj, {})));
checkType(unwrap(obj), OBJECT);

const str = wrap('');
assert(!Array.isArray(new Proxy(str, {})));
checkType(unwrap(str), STRING);

const sym = wrap(Symbol());
assert(!Array.isArray(new Proxy(sym, {})));
checkType(unwrap(sym), SYMBOL);

const undef = wrap(void 0);
assert(!Array.isArray(new Proxy(undef, {})));
checkType(unwrap(undef), UNDEFINED);
