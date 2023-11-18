export const ARRAY     = 'array';
export const BIGINT    = 'bigint';
export const BOOLEAN   = 'boolean';
export const FUNCTION  = 'function';
export const NULL      = 'null';
export const NUMBER    = 'number';
export const OBJECT    = 'object';
export const STRING    = 'string';
export const SYMBOL    = 'symbol';
export const UNDEFINED = 'undefined';

const { isArray } = Array;

/**
 * @template T
 * @typedef {[ARRAY, T]} Arr
 */

/**
 * @template T
 * @typedef {() => T} Bound
 */

/**
 * @template T
 * @typedef {{type: T extends bigint ? BIGINT : T extends boolean ? BOOLEAN : T extends null ? NULL : T extends number ? NUMBER : T extends string ? STRING : T extends symbol ? SYMBOL : T extends undefined ? UNDEFINED : OBJECT, value: T}} Wrap
 */

/**
 * @template T
 * @typedef {{type: T extends Array ? ARRAY : T extends bigint ? BIGINT : T extends boolean ? BOOLEAN : T extends function ? FUNCTION : T extends null ? NULL : T extends number ? NUMBER : T extends string ? STRING : T extends symbol ? SYMBOL : T extends undefined ? UNDEFINED : OBJECT, value: T}} Pair
 */

/**
 * @template T
 * @param {string} type
 * @param {T} value
 * @returns {Pair<T>}
 */
const pair = (type, value) => ({ type, value });

/**
 * @template T
 * @param {T} value
 * @returns {T extends Array ? Arr<T> : T extends function ? Bound<T> : Wrap<T>}
 */
export const wrap = value => {
  const type = typeof value;
  switch (type) {
    case FUNCTION: return bound.bind(value);
    case OBJECT: return isArray(value) ?
      [ARRAY, value] :
      pair(value ? type : NULL, value)
    ;
    default: return pair(type, value);
  }
};

/**
 * @template T
 * @param {Arr<T> | Bound<T> | Wrap<T>} value
 * @returns {Pair<T>}
 */
export const unwrap = value => (
  typeof value === FUNCTION ?
    pair(FUNCTION, value()) :
    (isArray(value) ? pair(...value) : value)
);

function bound() {
  'use strict';
  return this;
}
