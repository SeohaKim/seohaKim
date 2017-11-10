import Vec from './vector.js';

export function horizontal(length, a) {
  return [new Vec(length + (length - 1) * a, 1)];
}

const createArr = f => n => (n > 1 ? [...createArr(f)(n - 1), f(n)] : [f(1)]);

const sum = arr => arr.reduce((sum, val) => sum.sum(val), new Vec(0, 0));
