import { ARRAY, FUNCTION, NULL, OBJECT } from './types.js';

const { isArray } = Array;

export const pair = (type, value) => (
  type === ARRAY ? [ ARRAY, value ] : { type, value }
);

const unwrapDefault = (_, value) => value;

export const unwrap = (wrap, revive = unwrapDefault) => {
  let type = typeof wrap, value = wrap;
  if (type === OBJECT) {
    if (isArray(wrap))
      [ type, value ] = wrap;
    else
      ({ type, value } = wrap);
  }
  return revive(type, value);
};

const wrapDefault = (type, value) => (
  type === FUNCTION ? value : pair(type, value)
);

export const wrap = (value, resolve = wrapDefault) => {
  const type = value === null ? NULL : typeof value;
  return resolve(type === OBJECT && isArray(value) ? ARRAY : type, value);
};

export const bound = value => what.bind(value);

export const unbound = value => typeof value === FUNCTION ? value() : value;

function what() {
  'use strict';
  return this;
}
