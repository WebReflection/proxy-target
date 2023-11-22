export function pair<T, V>(type: T, value: V): Obj<T, V>;
export function unwrap<W, T, V>(wrap: W, revive?: ((type: string, value: any) => any) | undefined): W extends Function ? W : W extends any[] ? W : W extends Obj<T, V> ? W["value"] : never;
export function wrap<V>(value: V, resolve?: (type: any, value: any) => any): V extends any[] ? V : V extends Function ? V : Obj<V extends bigint ? "bigint" : V extends boolean ? "boolean" : V extends null ? "null" : V extends number ? "number" : V extends string ? "string" : V extends symbol ? "symbol" : V extends undefined ? "undefined" : "object", V>;
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
export { bound, unbound } from "./utils.js";
