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
export function wrap<T>(value: T): T extends any[] ? Arr<T> : T extends Function ? Bound<T> : Wrap<T>;
export function unwrap<T>(value: Arr<T> | Bound<T> | Wrap<T>): Pair<T>;
export type Arr<T> = ["array", T];
export type Bound<T> = () => T;
export type Wrap<T> = {
    type: T extends bigint ? "bigint" : T extends boolean ? "boolean" : T extends null ? "null" : T extends number ? "number" : T extends string ? "string" : T extends symbol ? "symbol" : T extends undefined ? "undefined" : "object";
    value: T;
};
export type Pair<T> = {
    type: T extends any[] ? "array" : T extends bigint ? "bigint" : T extends boolean ? "boolean" : T extends Function ? "function" : T extends null ? "null" : T extends number ? "number" : T extends string ? "string" : T extends symbol ? "symbol" : T extends undefined ? "undefined" : "object";
    value: T;
};
