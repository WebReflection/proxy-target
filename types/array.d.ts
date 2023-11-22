export function target<T extends string, V>(type: T, value: V): T extends "array" ? Arr<V> : Obj<T, V>;
export function unwrap<W, T, V>(wrap: W, revive?: (<Value>(type: string, value: Value) => Value) | undefined): ValueOf<W, T, V>;
export function wrap<V>(value: V, resolve?: Function | undefined): V extends Function ? V : V extends any[] ? Arr<V> : Obj<import("./utils.js").TypeOf<V>, V>;
export type Arr<V> = import("./utils.js").Arr<V>;
export type Obj<T, V> = import("./utils.js").Obj<T, V>;
export type TypeOf<V> = import("./utils.js").TypeOf<V>;
export type ValueOf<W, T, V> = W extends Function ? W : W extends Arr<V> ? W[0] : W extends Obj<T, V> ? W["v"] : never;
import { ARRAY } from './types.js';
export { bound, unbound } from "./utils.js";
