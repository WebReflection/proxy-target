var proxyTarget = (function (exports) {
  'use strict';

  const ARRAY     = 'array';
  const BIGINT    = 'bigint';
  const BOOLEAN   = 'boolean';
  const FUNCTION  = 'function';
  const NULL      = 'null';
  const NUMBER    = 'number';
  const OBJECT    = 'object';
  const STRING    = 'string';
  const SYMBOL    = 'symbol';
  const UNDEFINED = 'undefined';

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
   * @typedef {T extends Array ? ARRAY : T extends bigint ? BIGINT : T extends boolean ? BOOLEAN : T extends function ? FUNCTION : T extends null ? NULL : T extends number ? NUMBER : T extends string ? STRING : T extends symbol ? SYMBOL : T extends undefined ? UNDEFINED : OBJECT} Type
   */

  /**
   * @template T
   * @typedef {{type: Type<T>, value: T}} Pair
   */

  /**
   * @template T
   * @param {Type<T>} type
   * @param {T} value
   * @returns {Pair<T>}
   */
  const pair = (type, value) => ({ type, value });

  /**
   * @template T
   * @param {T} value
   * @returns {T extends Array ? Arr<T> : T extends Function ? Bound<T> : Pair<T>}
   */
  const wrap = value => {
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
   * @param {Arr<T> | Bound<T> | Pair<T>} value
   * @returns {Pair<T>}
   */
  const unwrap = value => (
    typeof value === FUNCTION ?
      pair(FUNCTION, value()) :
      (isArray(value) ? pair(...value) : value)
  );

  function bound() {
    return this;
  }

  exports.ARRAY = ARRAY;
  exports.BIGINT = BIGINT;
  exports.BOOLEAN = BOOLEAN;
  exports.FUNCTION = FUNCTION;
  exports.NULL = NULL;
  exports.NUMBER = NUMBER;
  exports.OBJECT = OBJECT;
  exports.STRING = STRING;
  exports.SYMBOL = SYMBOL;
  exports.UNDEFINED = UNDEFINED;
  exports.unwrap = unwrap;
  exports.wrap = wrap;

  return exports;

})({});
