declare function _default<T>(target: T, handler: ProxyHandler<T>): T extends any[] ? import("./index.js").Arr<T> : T extends Function ? import("./index.js").Bound<T> : import("./index.js").Pair<T>;
export default _default;
