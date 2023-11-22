require('./_.js');

const {
  bound, unbound,
  target, wrap, unwrap,
} = require('../cjs/index.js');

assert(unbound(bound(Function)) === Function);
assert(unbound(Object.prototype) === Object.prototype);

const arr = wrap([1,2]);
assert(Array.isArray(new Proxy(arr, {})));
assert(unwrap(arr).join(',') === '1,2');
checkType(unwrap(arr, target), ARRAY);

const big = wrap(1n);
assert(!Array.isArray(new Proxy(big, {})));
assert(unwrap(big) === 1n);
checkType(unwrap(big, target), BIGINT);

const bool = wrap(!1);
assert(!Array.isArray(new Proxy(bool, {})));
checkType(unwrap(bool, target), BOOLEAN);

const fn = wrap(function () {"use strict"; return this });
assert(!Array.isArray(new Proxy(fn, {})));
assert(typeof new Proxy(fn, {}) === FUNCTION);
checkType(unwrap(fn, target), FUNCTION);

const nope = wrap(null);
assert(!Array.isArray(new Proxy(nope, {})));
checkType(unwrap(nope, target), NULL);

const num = wrap(1.2);
assert(!Array.isArray(new Proxy(num, {})));
checkType(unwrap(num, target), NUMBER);

const obj = wrap({});
assert(!Array.isArray(new Proxy(obj, {})));
checkType(unwrap(obj, target), OBJECT);

const str = wrap('');
assert(!Array.isArray(new Proxy(str, {})));
checkType(unwrap(str, target), STRING);

const sym = wrap(Symbol());
assert(!Array.isArray(new Proxy(sym, {})));
checkType(unwrap(sym, target), SYMBOL);

const undef = wrap(void 0);
assert(!Array.isArray(new Proxy(undef, {})));
checkType(unwrap(undef, target), UNDEFINED);

const i8a = new Int8Array(0);
const custom = wrap(i8a, (_, value) => target(value.constructor.name, value));
assert(custom.t === 'Int8Array');
assert(custom.v === i8a);
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

const wrapped = wrap(
  callbacks[1],
  (type, value) => bound(
    target(type, callbacks.indexOf(value))
  )
);
assert(typeof wrapped === 'function');
assert(
  unwrap(
    unbound(wrapped),
    (type, value) => (
      type === "function" ?
        callbacks[value] :
        value
    )) === callbacks[1]
);

require('./all.js');
require('./array.js');

require('./types/all.js');
require('./types/array.js');
require('./types/index.js');

console.log('OK');
