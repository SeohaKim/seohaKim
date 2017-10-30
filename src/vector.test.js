import Vec, { composeRotate } from './vector.js';

it('stand should stand vector', () => {
  expect(new Vec(3, 4).stand().x).toEqual(0);
  expect(new Vec(3, 4).stand().y).toEqual(5);
});
it('should compose two vector by rotating the first vector', () => {
  expect(composeRotate(new Vec(1, 1), new Vec(1, -1), 0.5)).toEqual(
    new Vec(Math.sqrt(2), 0)
  );
});
