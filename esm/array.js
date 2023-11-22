import { ARRAY, BIGINT, BOOLEAN, FUNCTION, NULL, NUMBER, OBJECT, STRING, SYMBOL, UNDEFINED } from './types.js';
import { isArray, reviver } from './utils.js';

export { bound, unbound } from './utils.js';

/**
 * @template T, V
 * @typedef {{type:T, value:V}} Obj
 */

/**
 * @template V
 * @typedef {[ARRAY, V]} Arr
 */

/**
 * @template {string} T
 * @template V
 * @param {T} type
 * @param {V} value
 * @returns {T extends typeof ARRAY ? Arr<V> : Obj<T, V>}
 */
// @ts-ignore
export const pair = (type, value) => (
  type === ARRAY ? [ARRAY, value] : {type, value}
);

/**
 * @template W, T, V
 * @param {W} wrap
 * @returns {W extends Function ? W : W extends Arr<V> ? W[1] : W extends Obj<T, V> ? W["value"] : never}
 */
export const unwrap = (wrap, revive = reviver) => {
  /** @type {string} */
  let type = typeof wrap, value = wrap;
  if (type === OBJECT) {
    if (isArray(wrap))
      [ type, value ] = wrap;
    else
      // @ts-ignore
      ({ type, value } = wrap);
  }
  return revive(type, value);
};

const resolver = (type, value) => (
  type === FUNCTION ? value : pair(type, value)
);

/**
 * Returns a `{type, value}` pair if the value is not a function and not an array.
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
