export const ARRAY: "array";
export const BIGINT: "bigint";
export const BOOLEAN: "boolean";
export const FUNCTION: "function";
export const NULL: "null";
export const NUMBER: "number";
export const OBJECT: "object";
export const STRING: "string";
export const SYMBOL: "symbol";
export const UNDEFINED: "undefined";
export function pair<Type, Value>(type: Type, value: Value): Pair<Type, Value>;
export function unwrap<Value>(value: Value): Value extends any[] ? Pair<"array", Value> : Value extends Function ? Pair<"function", Value> : Value;
export function wrap<V>(value: V): V extends any[] ? V : V extends Function ? V : V extends bigint ? Pair<"bigint", V> : V extends boolean ? Pair<"boolean", V> : V extends null ? Pair<"null", null> : V extends number ? Pair<"number", V> : V extends string ? Pair<"string", V> : V extends symbol ? Pair<"symbol", V> : V extends undefined ? Pair<"undefined", undefined> : Pair<"object", V>;
export type Pair<Type, Value> = {
    type: Type;
    value: Value;
};
