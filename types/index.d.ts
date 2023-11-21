export function pair<T, V>(type: T, value: V): Pair<T, V>;
export function unwrap<P, V>(wrap: P, revive?: (type: Type, value: any) => any): P extends Pair<Type, V> ? V : P;
export function wrap<V>(value: V, resolve?: (type: Type, value: any) => any): V extends any[] ? V : V extends Function ? V : Pair<V extends bigint ? "bigint" : V extends boolean ? "boolean" : V extends null ? "null" : V extends number ? "number" : V extends string ? "string" : V extends symbol ? "symbol" : V extends undefined ? "undefined" : "object", V>;
export function bound<V>(value: V): Bound<V>;
export function unbound<V, B>(value: V): V extends Bound<B> ? B : V;
export type Bound<V> = () => V;
export type Pair<T, V> = {
    type: T;
    value: V;
};
export type Type = "array" | "bigint" | "boolean" | "function" | "null" | "number" | "object" | "string" | "symbol" | "undefined";
