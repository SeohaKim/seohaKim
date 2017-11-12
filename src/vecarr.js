import Vec from './vector.js';

const sum = arr => arr.reduce((sum, val) => sum.sum(val), new Vec(0, 0));
const createArr = f => n =>
  n > 1 ? [...createArr(f)(n - 1), f(n - 1)] : [f(0)];

export function horizontal(length, a) {
  return [
    new Vec(length + (length - 1) * a, 1),
    createArr(n => new Vec(n * (1 + a), 0))(length)
  ];
}

export function connect(vaa) {
  let sumV = new Vec(0, 0);
  const arr = vaa.map((e, i) => {
    const next = sumV.sub(e[0]);
    sumV = sumV.sum(sum(e));
    return next;
  });
  return [sumV, arr];
}
