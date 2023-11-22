import { FUNCTION } from "./types.js";

const { isArray } = Array;
export { isArray };

/**
 * @template V
 * @typedef {() => V} Bound
 */

/**
 * @template V
 * @param {V} value
 * @returns {Bound<V>}
 */
export const bound = value => Context.bind(value);

export const invoke = value => (/** @type {Function} */ (value))();

/**
 * @template V, T
 * @param {V} value
 * @returns {V extends Bound<T> ? ReturnType<V> : V}
 */
export const unbound = value => (
    typeof value === FUNCTION ? invoke(value) : value
);

/**
 * @param {string} type
 * @param {any} value
 * @returns
 */
export const reviver = (type, value) => value;

// This is needed to unlock *both* apply and construct
// traps otherwise one of these might fail
function Context() {
  'use strict';
  return this;
}
