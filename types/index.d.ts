export function pair<T, V>(type: T, value: V): Obj<T, V>;
export function unwrap<P, V>(wrap: P, revive?: (type: Type, value: any) => any): P extends Obj<Type, V> ? V : P;
export function wrap<V>(value: V, resolve?: (type: Type, value: any) => any): V extends any[] ? V : V extends Function ? V : Obj<V extends bigint ? "bigint" : V extends boolean ? "boolean" : V extends null ? "null" : V extends number ? "number" : V extends string ? "string" : V extends symbol ? "symbol" : V extends undefined ? "undefined" : "object", V>;
export function bound<V>(value: V): Bound<V>;
export function unbound<V, T>(value: V): V extends Bound<T> ? ReturnType<V> : V;
export type Bound<V> = () => V;
export type Obj<T, V> = {
    type: T;
    value: V;
};
export type Type = "array" | "bigint" | "boolean" | "function" | "null" | "number" | "object" | "string" | "symbol" | "undefined";
