import { ARRAY, BIGINT, BOOLEAN, FUNCTION, NULL, NUMBER, OBJECT, STRING, SYMBOL, UNDEFINED } from './types.js';
import { isArray, reviver, tv } from './utils.js';

export { bound, unbound } from './utils.js';

export const target = tv;

/**
 * @template W, T, V
 * @param {W} wrap
 * @returns {W extends import("./utils.js").Obj<T, V> ? W["v"] : W}
 */
export const unwrap = (wrap, revive = reviver) => {
  /** @type {string} */
  let type = typeof wrap, value = wrap;
  if (type === OBJECT) {
    if (isArray(wrap))
      type = ARRAY;
    else
      // @ts-ignore
      ({ t: type, v: value } = wrap);
  }
  return revive(type, value);
};

const resolver = (type, value) => (
  type === FUNCTION || type === ARRAY ?
    value : target(type, value)
);

/**
 * Returns a `{t, v}` pair if the value is not a function and not an array.
 * It returns the function or the array as they are otherwise.
 * @template V
 * @param {V} value
 * @returns {V extends Array ? V : V extends Function ? V : import("./utils.js").Obj<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? NULL : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : OBJECT, V>}
 */
export const wrap = (value, resolve = resolver) => {
  const type = value === null ? NULL : typeof value;
  return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
};
