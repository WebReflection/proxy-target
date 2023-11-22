export function bound<V>(value: V): Bound<V>;
export function unbound<V, T>(value: V): V extends Bound<T> ? ReturnType<V> : V;
export function reviver(type: any, value: any): any;
export type Bound<V> = () => V;
export const isArray: (arg: any) => arg is any[];
