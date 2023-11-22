require('./_.js');

const {
    bound, unbound,
    target, wrap, unwrap,
} = require('../cjs/all.js');

assert(unbound(bound(Function)) === Function);
assert(unbound(Object.prototype) === Object.prototype);

const arr = wrap([1,2]);
assert(Array.isArray(new Proxy(arr, {})));
assert(unwrap(arr).join(',') === '1,2');
assert(JSON.stringify(arr) === '[[1,2]]');
unwrap(arr, (type, value) => {
    assert(type === ARRAY);
    assert(JSON.stringify(value) === '[1,2]');
});

const big = wrap(1n);
assert(!Array.isArray(new Proxy(big, {})));
assert(unwrap(big) === 1n);
checkType(unwrap(big, target), BIGINT);

const bool = wrap(!1);
assert(!Array.isArray(new Proxy(bool, {})));
checkType(unwrap(bool, target), BOOLEAN);

function wrappedFN() {"use strict"; return this }
const fn = wrap(wrappedFN);
assert(!Array.isArray(new Proxy(fn, {})));
assert(typeof new Proxy(fn, {}) === FUNCTION);
assert(unwrap(fn) === wrappedFN);
checkType(unwrap(fn, (t, v) => ({t, v})), FUNCTION);

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