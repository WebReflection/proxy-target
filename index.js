var proxyTarget = (function (exports) {
  'use strict';

  const ARRAY     = 'array';
  const FUNCTION  = 'function';
  const NULL      = 'null';
  const OBJECT    = 'object';

  const { isArray } = Array;

  /**
   * @template V
   * @typedef {() => V} Bound
   */

  /**
   * @template T, V
   * @typedef {{type:T, value:V}} Pair
   */

  /** @typedef {ARRAY | BIGINT | BOOLEAN | FUNCTION | NULL | NUMBER | OBJECT | STRING | SYMBOL | UNDEFINED} Type */

  /**
   * @template T, V
   * @param {T} type
   * @param {V} value
   * @returns {Pair<T, V>}
   */
  const pair = (type, value) => ({ type, value });

  const unwrapDefault = (/** @type {Type} */ type, value) => value;

  /**
   * @template P, V
   * @param {P} wrap
   * @returns {P extends Pair<Type, V> ? V : P}
   */
  const unwrap = (wrap, revive = unwrapDefault) => {
    /** @type {Type} */
    let type = typeof wrap, value = wrap;
    // ignore function
    if (type === OBJECT) {
      // but consider arrays
      if (isArray(wrap))
        type = ARRAY;
      // otherwise get `{type, value}` form the pair
      else
        ({ type, value } = wrap);
    }
    return revive(type, value);
  };

  const wrapDefault = (/** @type {Type} */ type, value) => (
    type === FUNCTION || type === ARRAY ?
      value : pair(type, value)
  );

  /**
   * Returns a `{type, value}` pair if the value is not a function and not an array.
   * It returns the function or the array as they are otherwise.
   * @template V
   * @param {V} value
   * @returns {V extends Array ? V : V extends Function ? V : Pair<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? NULL : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : OBJECT, V>}
   */
  const wrap = (value, resolve = wrapDefault) => {
    const type = value === null ? NULL : typeof value;
    return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
  };

  /**
   * Binds a generic value into a function that returns the value itself.
   * This is handy to hold different data and still allow all callback traps.
   * @template V
   * @param {V} value
   * @returns {Bound<V>}
   */
  const bound = value => what.bind(value);

  /**
   * Invoke a possibly bound value if the parameter is a function.
   * This is handy only for values that passed through `bound(value)`.
   * @template V, B
   * @param {V} value
   * @returns {V extends Bound<B> ? B : V}
   */
  const unbound = value => typeof value === FUNCTION ? value() : value;

  function what() {
    return this;
  }

  exports.bound = bound;
  exports.pair = pair;
  exports.unbound = unbound;
  exports.unwrap = unwrap;
  exports.wrap = wrap;

  return exports;

})({});
