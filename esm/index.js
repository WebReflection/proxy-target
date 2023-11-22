import { ARRAY, FUNCTION, NULL, OBJECT } from './types.js';
import { isArray, reviver } from './utils.js';

export { bound, unbound } from './utils.js';

/** @typedef {import("./types.js").BIGINT} BIGINT */
/** @typedef {import("./types.js").BOOLEAN} BOOLEAN */
/** @typedef {import("./types.js").NUMBER} NUMBER */
/** @typedef {import("./types.js").STRING} STRING */
/** @typedef {import("./types.js").SYMBOL} SYMBOL */
/** @typedef {import("./types.js").UNDEFINED} UNDEFINED */

/**
 * @template T, V
 * @typedef {{type:T, value:V}} Obj
 */

/**
 * @template T, V
 * @param {T} type
 * @param {V} value
 * @returns {Obj<T, V>}
 */
export const pair = (type, value) => ({ type, value });

/**
 * @template W, T, V
 * @param {W} wrap
 * @param {(type:string, value:any) => any} [revive]
 * @returns {W extends Function ? W : W extends Array ? W : W extends Obj<T, V> ? W["value"] : never}
 */
export const unwrap = (wrap, revive = reviver) => {
  /** @type {string} */
  let type = typeof wrap, value = wrap;
  if (type === OBJECT) {
    if (isArray(wrap))
      type = ARRAY;
    else
      ({ type, value } = (/** @type {Obj<string, any>} */ (wrap)));
  }
  return revive(type, value);
};

const resolver = (type, value) => (
  type === FUNCTION || type === ARRAY ?
    value : pair(type, value)
);

/**
 * Returns a `{type, value}` pair if the value is not a function and not an array.
 * It returns the function or the array as they are otherwise.
 * @template V
 * @param {V} value
 * @returns {V extends Array ? V : V extends Function ? V : Obj<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? NULL : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : OBJECT, V>}
 */
export const wrap = (value, resolve = resolver) => {
  const type = value === null ? NULL : typeof value;
  return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
};
