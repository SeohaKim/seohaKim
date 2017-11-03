export const cloneArray = arr =>
  Array.isArray(arr)
    ? [...arr.map(e => cloneArray(e))]
    : typeof arr === 'object' ? Object.assign({}, arr) : arr;
