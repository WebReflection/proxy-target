import { ARRAY, BIGINT, BOOLEAN, FUNCTION, NULL, NUMBER, OBJECT, STRING, SYMBOL, UNDEFINED } from './types.js';
import { isArray, bound, invoke, reviver } from './utils.js';

export { bound, unbound } from './utils.js';

/**
 * @template V
 * @typedef {import("./utils.js").Bound<V>} Bound
 */

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
 * @returns {T extends typeof FUNCTION ? Bound<V> : T extends typeof ARRAY ? Arr<V> : Obj<T, V>}
 */
export const pair = (type, value) => {
  // @ts-ignore
  if (type === ARRAY) return [type, value];
  const tv = {type, value};
  // @ts-ignore
  return type === FUNCTION ? bound(tv) : tv;
};

/**
 * @template W, T, V
 * @param {W} wrap
 * @returns {W extends Bound<V> ? ReturnType<W> : W extends Arr<V> ? W[1] : W extends Obj<T, V> ? W["value"] : never}
 */
export const unwrap = (wrap, revive = reviver) => {
  /** @type {string} */
  let type = typeof wrap, value = wrap;
  if (type === FUNCTION)
    ({ type, value } = invoke(wrap));
  else if (type === OBJECT) {
    if (isArray(wrap))
      [ type, value ] = wrap;
    else
      // @ts-ignore
      ({ type, value } = wrap);
  }
  return revive(type, value);
};

/**
 * Returns a `{type, value}` pair if the value is not a function and not an array.
 * It returns the function or the array as they are otherwise.
 * @template V
 * @param {V} value
 * @param {Function} [resolve]
 * @returns {V extends Function ? Bound<V> : V extends Array ? Arr<V> : Obj<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? NULL : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : OBJECT, V>}
 */
export const wrap = (value, resolve = pair) => {
  const type = value === null ? NULL : typeof value;
  return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
};
