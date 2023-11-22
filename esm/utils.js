import { FUNCTION } from './types.js';

/**
 * @template V
 * @typedef {() => V} Bound
 */

const { isArray } = Array;
export { isArray };

/**
 * @template V
 * @param {V} value
 * @returns {Bound<V>}
 */
export const bound = value => (() => value);

/**
 * @template V, T
 * @param {V} value
 * @returns {V extends Bound<T> ? ReturnType<V> : V}
 */
export const unbound = value => (
  typeof value === FUNCTION ?
    (/** @type {Function} */ (value))() :
    value
);

export const reviver = (type, value) => value;
