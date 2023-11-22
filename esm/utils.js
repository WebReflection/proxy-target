import { FUNCTION } from './types.js';

const { isArray } = Array;

export { isArray };

export const invoke = value => (/** @type {Function} */ (value))();

/**
 * @param {string} type
 * @param {any} value
 * @returns
 */
export const reviver = (type, value) => value;

/**
 * @template V
 * @typedef {[V]} Arr
 */

/**
 * @template V
 * @typedef {() => V} Ctx
 */

/**
 * @template T, V
 * @typedef {{t:T, v:V}} Obj
 */

/**
 * @template T, V
 * @param {T} t
 * @param {V} v
 * @returns {Obj<T, V>}
 */
export const tv = (t, v) => ({t, v});

/**
 * @template V
 * @param {V} value
 * @returns {Ctx<V>}
 */
export const bound = value => Context.bind(value);

/**
 * @template V, T
 * @param {V} value
 * @returns {V extends Ctx<T> ? ReturnType<V> : V}
 */
export const unbound = value => (
  typeof value === FUNCTION ? invoke(value) : value
);

// This is needed to unlock *both* apply and construct
// traps otherwise one of these might fail.
// The 'use strict' directive is needed to allow
// also primitive types to be bound.
function Context() {
  'use strict';
  return this;
}

// TODO: is this really needed in here?
// const { hasOwn } = Object;
// const isConstructable = value => hasOwn(value, 'prototype');
// const isFunction = value => typeof value === FUNCTION;
