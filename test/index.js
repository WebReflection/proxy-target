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

const {
  bound, unbound,
  pair, wrap, unwrap,
} = require('../cjs/index');

const assert = (thing, message = 'Unexpected result') => {
  if (!thing)
    throw new Error(message);
};

const checkType = ({ type }, expected) => {
  assert(type === expected, `unexpected type ${expected}`);
};

assert(unbound(bound(Function)) === Function);
assert(unbound(Object.prototype) === Object.prototype);

const arr = wrap([1,2]);
assert(Array.isArray(new Proxy(arr, {})));
assert(unwrap(arr).join(',') === '1,2');
checkType(unwrap(arr, pair), ARRAY);

const big = wrap(1n);
assert(!Array.isArray(new Proxy(big, {})));
assert(unwrap(big) === 1n);
checkType(unwrap(big, pair), BIGINT);

const bool = wrap(!1);
assert(!Array.isArray(new Proxy(bool, {})));
checkType(unwrap(bool, pair), BOOLEAN);

const fn = wrap(function () {"use strict"; return this });
assert(!Array.isArray(new Proxy(fn, {})));
assert(typeof new Proxy(fn, {}) === FUNCTION);
checkType(unwrap(fn, pair), FUNCTION);

const nope = wrap(null);
assert(!Array.isArray(new Proxy(nope, {})));
checkType(unwrap(nope, pair), NULL);

const num = wrap(1.2);
assert(!Array.isArray(new Proxy(num, {})));
checkType(unwrap(num, pair), NUMBER);

const obj = wrap({});
assert(!Array.isArray(new Proxy(obj, {})));
checkType(unwrap(obj, pair), OBJECT);

const str = wrap('');
assert(!Array.isArray(new Proxy(str, {})));
checkType(unwrap(str, pair), STRING);

const sym = wrap(Symbol());
assert(!Array.isArray(new Proxy(sym, {})));
checkType(unwrap(sym, pair), SYMBOL);

const undef = wrap(void 0);
assert(!Array.isArray(new Proxy(undef, {})));
checkType(unwrap(undef, pair), UNDEFINED);

const i8a = new Int8Array(0);
const custom = wrap(i8a, (_, value) => pair(value.constructor.name, value));
assert(custom.type === 'Int8Array');
assert(custom.value === i8a);
assert(unwrap(custom) === i8a);
unwrap(custom, (type, value) => {
  assert(type === 'Int8Array');
  assert(value === i8a);
});

// bound / unbound
const callbacks = [
  a => a + 1,
  b => b + 2
];

target = wrap(
  callbacks[1],
  (type, value) => bound(
    pair(type, callbacks.indexOf(value))
  )
);
assert(typeof target === 'function');
assert(
  unwrap(
    unbound(target),
    (type, value) => (
      type === "function" ?
        callbacks[value] :
        value
    )) === callbacks[1]
);

(() => {
  const {
    bound, unbound,
    pair, wrap, unwrap,
  } = require('../cjs/array');
  
  assert(unbound(bound(Function)) === Function);
  assert(unbound(Object.prototype) === Object.prototype);
  
  const arr = wrap([1,2]);
  assert(Array.isArray(new Proxy(arr, {})));
  assert(unwrap(arr).join(',') === '1,2');
  assert(JSON.stringify(arr) === '["array",[1,2]]');
  unwrap(arr, (type, value) => {
    assert(type === ARRAY);
    assert(JSON.stringify(value) === '[1,2]');
  });
  
  const big = wrap(1n);
  assert(!Array.isArray(new Proxy(big, {})));
  assert(unwrap(big) === 1n);
  checkType(unwrap(big, pair), BIGINT);
  
  const bool = wrap(!1);
  assert(!Array.isArray(new Proxy(bool, {})));
  checkType(unwrap(bool, pair), BOOLEAN);
  
  const fn = wrap(function () {"use strict"; return this });
  assert(!Array.isArray(new Proxy(fn, {})));
  assert(typeof new Proxy(fn, {}) === FUNCTION);
  checkType(unwrap(fn, pair), FUNCTION);
  
  const nope = wrap(null);
  assert(!Array.isArray(new Proxy(nope, {})));
  checkType(unwrap(nope, pair), NULL);
  
  const num = wrap(1.2);
  assert(!Array.isArray(new Proxy(num, {})));
  checkType(unwrap(num, pair), NUMBER);
  
  const obj = wrap({});
  assert(!Array.isArray(new Proxy(obj, {})));
  checkType(unwrap(obj, pair), OBJECT);
  
  const str = wrap('');
  assert(!Array.isArray(new Proxy(str, {})));
  checkType(unwrap(str, pair), STRING);
  
  const sym = wrap(Symbol());
  assert(!Array.isArray(new Proxy(sym, {})));
  checkType(unwrap(sym, pair), SYMBOL);
  
  const undef = wrap(void 0);
  assert(!Array.isArray(new Proxy(undef, {})));
  checkType(unwrap(undef, pair), UNDEFINED);
})();

console.log('OK');
