export function invoke(value: any): any;
export function reviver(type: string, value: any): any;
export function tv<T, V>(t: T, v: V): Obj<T, V>;
export function bound<V>(value: V): Ctx<V>;
export function unbound<V, T>(value: V): V extends Ctx<T> ? ReturnType<V> : V;
export type Arr<V> = [V];
export type Ctx<V> = () => V;
export type Obj<T, V> = {
    t: T;
    v: V;
};
export const isArray: (arg: any) => arg is any[];
