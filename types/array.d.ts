export function pair(type: any, value: any): any[] | {
    type: any;
    value: any;
};
export function unwrap(wrap: any, revive?: (_: any, value: any) => any): any;
export function wrap(value: any, resolve?: (type: any, value: any) => any): any;
export function bound(value: any): any;
export function unbound(value: any): any;
