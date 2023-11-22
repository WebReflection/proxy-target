export const target: <T, V>(t: T, v: V) => import("./utils.js").Obj<T, V>;
export function unwrap<W, T, V>(wrap: W, revive?: (type: string, value: any) => any): W extends import("./utils.js").Obj<T, V> ? W["v"] : W;
export function wrap<V>(value: V, resolve?: (type: any, value: any) => any): V extends any[] ? V : V extends Function ? V : import("./utils.js").Obj<V extends bigint ? "bigint" : V extends boolean ? "boolean" : V extends null ? "null" : V extends number ? "number" : V extends string ? "string" : V extends symbol ? "symbol" : V extends undefined ? "undefined" : "object", V>;
export { bound, unbound } from "./utils.js";
