# proxy-target

[![build status](https://github.com/WebReflection/proxy-target/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/proxy-target/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/proxy-target/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/proxy-target?branch=main)

A wrap/unwrap Proxy utility as answer to [these](https://es.discourse.group/t/the-array-isarray-shenanigans/1745) weird [limitations](https://es.discourse.group/t/proxy-drilling-once-again/1850).

This module allows any primitive to complex value to be proxied in a way that any handler can understand once the `unwrap(target)` operation is performed among actions:

  * *arrays* remain arrays and *callbacks* remain callbacks
  * *primitives* and *null*, *undefined* or *object* generic types are preserved, among any other primitive, and return `{type: actualType, value: actualValue}` once wrapped

## Type / Value -> Wrap

| type          | value          | wrap                                    |
| :------------ | :------------- | :-------------------------------------- |
| `"array"`     | `[1, 2]`       | `[1, 2]` | ["array", [1,2]] w/array     |
| `"bigint"`    | `1n`           | `{type: "bigint", value: 1n}`           |
| `"boolean"`   | `false`        | `{type: "boolean", value: false}`       |
| `"function"`  | `(a, b) => {}` | `(a, b) => {}`                          |
| `"null"`      | `null`         | `{type: "null", value: null}`           |
| `"number"`    | `1.2`          | `{type: "number", value: 1.2}`          |
| `"object"`    | `{a: 0}`       | `{type: "object", value: {a: 0}}`       |
| `"string"`    | `""`           | `{type: "string", value: ""}`           |
| `"symbol"`    | `Symbol()`     | `{type: "symbol", value: Symbol()}`     |
| `"undefined"` | `void 0`       | `{type: "undefined", value: undefined}` |
|               |                |                                         |
| `"custom"`    | notArrOrFunc   | `{type: "custom", value: notArrOrFunc}` |

## Example / API

```js
import {
  bound,  // return a function that returns its bound context
  unbound,// if function, invokes it to return the context
  pair,   // create a `{type, value}` pair to proxy as target
  wrap,   // returns array, function, or a pair
  unwrap  // returns the wrapped value
} from 'proxy-target';

let target;

target = wrap([1, 2, 3]);
// remains [1, 2, 3]
unwrap(target);
// still [1, 2, 3]

// both wrap and unwrap accept an optional callback
// the returned value will the one returned by wrap
target = wrap({a: 1}, (type, value) => pair(type, value));
// {type: "object", value: {a: 1}}
unwrap(target, (type, value) => value);
// {a: 1}

target = wrap(i => i + 123);
// remains i => i + 123
unwrap(target);
// i => i + 123

// bound / unbound
const callbacks = [
  a => a + 1,
  b => b + 2
];

target = wrap(
  callbacks[1],
  (type, value) => bound(
    pair(type, callbacks.indexOf(value))
  )
);
// function () { return {type: "function", value: 1} );
unwrap(unbound(target), (type, value) => {
  return type === "function" ? callbacks[value] : value;
});
// b => b + 2


target = wrap(null);
// {type: "null", value: null}
unwrap(target);
// null

target = wrap(1);
// {type: "number", value: 1}
unwrap(target);
// 1

target = wrap(false);
// {type: "boolean", value: false}
unwrap(target);
// false

target = wrap(Symbol());
// {type: "symbol", value: thatSymbol}
unwrap(target);
// thatSymbol

// ... and so on ...
```
