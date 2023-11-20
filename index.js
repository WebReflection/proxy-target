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
   * @template Type, Value
   * @typedef {{type:Type, value:Value}} Pair
   */

  /**
   * @template Type, Value
   * @param {Type} type
   * @param {Value} value
   * @returns {Pair<Type, Value>}
   */
  const pair = (type, value) => ({ type, value });

  /**
   * @template Value
   * @param {Value} value
   * @returns {Value extends Array ? Pair<ARRAY,Value> : Value extends Function ? Pair<FUNCTION,Value> : Value}
   */
  const unwrap = value => (
    typeof value === FUNCTION ?
      pair(FUNCTION, value) :
      (isArray(value) ? pair(ARRAY, value) : value)
  );

  /**
   * @template V
   * @param {V} value
   * @returns {V extends Array ? V : V extends Function ? V : V extends bigint ? Pair<BIGINT,V> : V extends boolean ? Pair<BOOLEAN,V> : V extends null ? Pair<NULL,null> : V extends number ? Pair<NUMBER,V> : V extends string ? Pair<STRING,V> : V extends symbol ? Pair<SYMBOL,V> : V extends undefined ? Pair<UNDEFINED,undefined> : Pair<OBJECT,V>}
   */
  const wrap = value => {
    const type = value === null ? NULL : typeof value;
    return type === FUNCTION || (type === OBJECT && isArray(value)) ? value : pair(type, value);
  };

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
  exports.pair = pair;
  exports.unwrap = unwrap;
  exports.wrap = wrap;

  return exports;

})({});
