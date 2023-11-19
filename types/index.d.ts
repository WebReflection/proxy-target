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
export function wrap<T>(value: T): T extends any[] ? Arr<T> : T extends Function ? Bound<T> : Pair<T>;
export function unwrap<T>(value: Arr<T> | Bound<T> | Pair<T>): Pair<T>;
export type Arr<T> = ["array", T];
export type Bound<T> = () => T;
export type Type<T> = T extends any[] ? "array" : T extends BigInt ? "bigint" : T extends boolean ? "boolean" : T extends Function ? "function" : T extends number ? "number" : T extends string ? "string" : T extends Symbol ? "symbol" : "object";
export type Pair<T> = {
    type: Type<T>;
    value: T;
};
