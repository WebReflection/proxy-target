export function pair<T extends string, V>(type: T, value: V): T extends "array" ? Arr<V> : Obj<T, V>;
export function unwrap<W, T, V>(wrap: W, revive?: ((type: string, value: any) => any) | undefined): W extends Function ? W : W extends Arr<V> ? W[1] : W extends Obj<T, V> ? W["value"] : never;
export function wrap<V>(value: V, resolve?: Function | undefined): V extends Function ? V : V extends any[] ? Arr<V> : Obj<V extends bigint ? "bigint" : V extends boolean ? "boolean" : V extends null ? "null" : V extends number ? "number" : V extends string ? "string" : V extends symbol ? "symbol" : V extends undefined ? "undefined" : "object", V>;
export type BIGINT = "bigint";
export type BOOLEAN = "boolean";
export type NUMBER = "number";
export type STRING = "string";
export type SYMBOL = "symbol";
export type UNDEFINED = "undefined";
export type Obj<T, V> = {
    type: T;
    value: V;
};
export type Arr<V> = ["array", V];
import { ARRAY } from './types.js';
export { bound, unbound } from "./utils.js";
