export function pair<T extends string, V>(type: T, value: V): T extends "array" ? Arr<V> : Obj<T, V>;
export function unwrap<W, T, V>(wrap: W, revive?: (_: any, value: any) => any): W extends Function ? W : W extends Arr<V> ? W[1] : W extends Obj<T, V> ? W["value"] : never;
export function wrap<V>(value: V, resolve?: Function | undefined): V extends Function ? V : V extends any[] ? Arr<V> : Obj<V extends bigint ? BIGINT : V extends boolean ? BOOLEAN : V extends null ? "null" : V extends number ? NUMBER : V extends string ? STRING : V extends symbol ? SYMBOL : V extends undefined ? UNDEFINED : "object", V>;
export function bound<V>(value: V): Bound<V>;
export function unbound<V, T>(value: V): V extends Bound<T> ? ReturnType<V> : V;
export type Bound<V> = () => V;
export type Obj<T, V> = {
    type: T;
    value: V;
};
export type Arr<V> = ["array", V];
import { ARRAY } from './types.js';
