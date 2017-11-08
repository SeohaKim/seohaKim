import Vec, { composeRotate, composeVector, snapComposer } from './vector';

it('stand should stand vector', () => {
  expect(new Vec(3, 4).stand().x).toEqual(0);
  expect(new Vec(3, 4).stand().y).toEqual(5);
});
it('should compose two vector by rotating the first vector', () => {
  const vert = [];
  vert.push(new Vec(1, 0));
  vert.push(new Vec(1, 0));
  vert.push(new Vec(1, 0));
  const hori = [];
  hori.push(new Vec(0, 1));
  hori.push(new Vec(0, 1));
  hori.push(new Vec(0, 1));
  hori.push(new Vec(0, 1));
  const s = [[...vert], [...vert]];
  const e = [[...hori], [...hori]];
  const snapper = snapComposer(s, e);
  expect(composeRotate(new Vec(1, 1), new Vec(1, -1), 0.5)).toEqual(
    new Vec(Math.sqrt(2), 0)
  );
  expect(composeVector(vert, hori, 0)).toEqual([
    new Vec(1, 0),
    new Vec(1, 0),
    new Vec(1, 0),
    new Vec(0, 0)
  ]);
  expect(composeVector(vert, hori, 1)).toEqual([
    new Vec(0, 1),
    new Vec(0, 1),
    new Vec(0, 1),
    new Vec(0, 1)
  ]);
});
