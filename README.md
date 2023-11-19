# proxy-target

[![build status](https://github.com/WebReflection/proxy-target/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/proxy-target/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/proxy-target/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/proxy-target?branch=main)

A wrap/unwrap Proxy utility as answer to [these](https://es.discourse.group/t/the-array-isarray-shenanigans/1745) weird [limitations](https://es.discourse.group/t/proxy-drilling-once-again/1850).

This module allows any primitive to complex value to be proxied in a way that any handler can understand once the `unwrap(target)` operation is performed among actions:

  * *arrays* remain arrays and return `{type: "array", value: array}` once unwrapped
  * *primitives* and *null*, *undefined*, or *object* generic types are preserved, among any other primitive, and return `{type: actualType, value: actualValue}` once unwrapped
  * *function* still survive the `typeof` check and return the `{type: "function", value: callback}` once unwrapped


```js
import { wrap, unwrap } from 'proxy-target';
let target;

target = wrap([1, 2, 3]);
// ["array", [1, 2, 3]]
unwrap(target);
// {type: "array", value: [1, 2, 3]}

target = wrap({a: 1});
// {type: "object", value: {a: 1}}
unwrap(target);
// same as target ,same reference:
// {type: "object", value: {a: 1}}

target = wrap(i => i + 123);
// () => i => i + 123
unwrap(target);
// {type: "function", value: i => i + 123}

target = wrap(null);
// {type: "null", value: null}

target = wrap(1);
// {type: "number", value: 1}

target = wrap(false);
// {type: "boolean", value: false}

target = wrap(Symbol());
// {type: "symbol", value: thatSymbol}

// ... and so on ...
```

## Types

| JS         | type        |
| :--------- | :---------- |
| `[]`       | `array`     |
| `1n`       | `bigint`    |
| `!0`       | `boolean`   |
| `() => {}` | `function`  |
| `null`     | `null`      |
| `1.2`      | `number`    |
| `{}`       | `object`    |
| `''`       | `string`    |
| `Symbol()` | `symbol`    |
| `void 0`   | `undefined` |
