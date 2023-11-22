import { ARRAY, BIGINT, BOOLEAN, FUNCTION, NULL, NUMBER, OBJECT, STRING, SYMBOL, UNDEFINED } from './types.js';
import { isArray, reviver, tv } from './utils.js';

export { bound, unbound } from './utils.js';

/**
 * @template V
 * @typedef {import("./utils.js").Arr<V>} Arr
 */

/**
 * @template T, V
 * @typedef {import("./utils.js").Obj<T, V>} Obj
 */

/**
 * @template {string} T
 * @template V
 * @param {T} type
 * @param {V} value
 * @returns {T extends typeof ARRAY ? Arr<V> : Obj<T, V>}
 */
// @ts-ignore
export const target = (type, value) => (
  type === ARRAY ? [value] : tv(type, value)
);

/**
 * @template W, T, V
 * @param {W} wrap
 * @returns {W extends Function ? W : W extends Arr<V> ? W[0] : W extends Obj<T, V> ? W["v"] : never}
 */
export const unwrap = (wrap, revive = reviver) => {
  /** @type {string} */
  let type = typeof wrap, value = wrap;
  if (type === OBJECT) {
    if (isArray(wrap)) {
      type = ARRAY;
      value = wrap.at(0);
    }
    else {
      // @ts-ignore
      ({ t: type, v: value } = wrap);
    }
  }
  return revive(type, value);
};

const resolver = (type, value) => (
  type === FUNCTION ? value : target(type, value)
);

/**
 * Returns a `{t, v}` pair if the value is not a function and not an array.
 * It returns the function or the array as they are otherwise.
 * @template V
 * @param {V} value
 * @param {Function} [resolve]
 * @returns {V extends Function ? V : V extends Array ? Arr<V> : Obj<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? NULL : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : OBJECT, V>}
 */
export const wrap = (value, resolve = resolver) => {
  const type = value === null ? NULL : typeof value;
  return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
};
