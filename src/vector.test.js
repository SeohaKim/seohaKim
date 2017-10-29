import vec from './vector.js';

it('stand should stand vector', () => {
  expect(new vec(3, 4).stand().x).toEqual(0);
  expect(new vec(3, 4).stand().x).toEqual(0);
  expect(stand({ x: 3, y: 4 }).y).toEqual(5);
});
