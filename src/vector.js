/**
 * function adds two vectors
 * @param a {{ x: number, y: number }}
 * @param b {{ x: number, y: number }}
 * @return {{x: number, y: number}}
 */
export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
/**
 * function straighten vector horizontally
 * @param v {{ x: number, y: number}}
 * @return {{x: number, y: number}}
 */
export const stand = v => ({ x: 0, y: Math.sqrt(v.x * v.x + v.y * v.y) });

export const unfold = arr => arr.map(v => stand(v));
