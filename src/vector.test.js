import { stand } from './vector.js';

it('stand should stand vector', () => {
  expect(stand({ x: 3, y: 4 }).x).toEqual(0);
  expect(stand({ x: 3, y: 4 }).y).toEqual(5);
});
