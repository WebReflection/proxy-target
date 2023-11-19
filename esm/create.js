import * as traps from './traps.js';

import { wrap, unwrap } from './index.js';

const { create, getOwnPropertyDescriptors, getPrototypeOf, keys } = Object;
const proxy = new Set(keys(traps));

const copy = handler => {
  const descriptors = getOwnPropertyDescriptors(input);
  for (const name of keys(descriptors)) {
    if (proxy.has(name)) {
      const descriptor = descriptors[name];
      const { value } = descriptor;
      descriptor.value = function (wrap, ...args) {
        return value.call(this, unwrap(wrap).value, ...args);
      };
    }
  }
  return create(getPrototypeOf(handler), descriptors);
};

/**
 * @template T
 * @param {T} target
 * @param {ProxyHandler<T>} handler
 * @returns
 */
export default (target, handler) => new Proxy(wrap(target), copy(handler));
