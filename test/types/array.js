const {OBJECT, FUNCTION} = require('../../cjs/types.js');
const {wrap, unwrap} = require('../../cjs/array.js');

const arr = [1];
const ctx = () => 2;
const obj = {o: 3};

const pta = wrap(arr);
const ptf = wrap(ctx);
const pto = wrap(obj);

console.assert(Array.isArray(pta));
console.assert(pta.length === 1);
console.assert(pta[0] === arr);

console.assert(typeof ptf === FUNCTION);
console.assert(ptf === ctx);

console.assert(!Array.isArray(pto));
console.assert(pto.t === OBJECT);
console.assert(pto.v === obj);

const upta = unwrap(pta);
const uptf = unwrap(ptf);
const upto = unwrap(pto);

console.assert(upta === arr);
console.assert(uptf === ctx);
console.assert(upto === obj);
