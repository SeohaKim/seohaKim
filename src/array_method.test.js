import { cloneArray } from './array_method.js';

it('should deep copy array', () => {
  let sampleArray = [[1, 2], [3, 4], [[5, 6], 7]];
  let clonedArray = cloneArray(sampleArray);
  sampleArray[0][0] = 0;
  console.log(clonedArray);
  expect(clonedArray[0][0]).toEqual(1); // clonedArray must not be changed
});
