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
 * @template Type, Value
 * @typedef {{type:Type, value:Value}} Pair
 */

/**
 * @template Type, Value
 * @param {Type} type
 * @param {Value} value
 * @returns {Pair<Type, Value>}
 */
export const pair = (type, value) => ({ type, value });

/**
 * @template Value
 * @param {Value} value
 * @returns {Value extends Array ? Pair<ARRAY,Value> : Value extends Function ? Pair<FUNCTION,Value> : Value}
 */
export const unwrap = value => (
  typeof value === FUNCTION ?
    pair(FUNCTION, value) :
    (isArray(value) ? pair(ARRAY, value) : value)
);

/**
 * @template V
 * @param {V} value
 * @returns {V extends Array ? V : V extends Function ? V : V extends bigint ? Pair<BIGINT,V> : V extends boolean ? Pair<BOOLEAN,V> : V extends null ? Pair<NULL,null> : V extends number ? Pair<NUMBER,V> : V extends string ? Pair<STRING,V> : V extends symbol ? Pair<SYMBOL,V> : V extends undefined ? Pair<UNDEFINED,undefined> : Pair<OBJECT,V>}
 */
export const wrap = value => {
  const type = value === null ? NULL : typeof value;
  return type === FUNCTION || (type === OBJECT && isArray(value)) ? value : pair(type, value);
};
