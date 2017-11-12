export default class Vec {
  /**
   * @constructor
   * @param {number} x - x component
   * @param {number} y - y component
   *
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * sum two vector
   * @param {Vec} v
   * @return {Vec}
   */
  sum(v) {
    return new Vec(this.x + v.x, this.y + v.y);
  }

  /**
   * sub vector v from original vector
   * @param {{x:Number,y:Number}} v
   * @return {Vec}
   */
  sub(v) {
    return new Vec(this.x - v.x, this.y - v.y);
  }

  /**
   * get y vector with magnitude of original vector
   * @return {Vec}
   */
  stand() {
    return new Vec(0, this.mag);
  }

  /**
   * get magnitude of vector
   * @return {number}
   */
  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * get angle
   * @return {number}
   */
  get angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * get normal vector
   * @return {Vec}
   */
  normal() {
    if (this.mag === 0) return new Vec(0, 0);
    return new Vec(this.x / this.mag, this.y / this.mag);
  }

  /**
   * multiply scala to vector
   * @param {number} n
   * @return {Vec}
   */
  mult(n) {
    return new Vec(this.x * n, this.y * n);
  }

  /**
   * angle between two vector
   * @param {Vec} v
   * @return {number}
   */
  angleBetween(v) {
    return Math.atan2(this.x - v.x, this.y - v.y);
  }

  /**
   * scale vector by given width, height
   * @param {Number} w
   * @param {Number} h
   * @return {Vec}
   */
  scale(w, h) {
    return new Vec(this.x * w, this.y * h);
  }
}

/**
 * Cast Object to Vec Object
 * @param {Object} o
 * @param {Number} o.x
 * @param {Number} o.y
 * @return {Vec}
 */
export const castVec = ({ x, y }) => new Vec(x, y);

/**
 * Construct Vec Object from angle
 * @param {Number} a - angle
 * @return {Vec}
 */
export const angleToVec = a => new Vec(Math.cos(a), Math.sin(a));

/**
 * Straighten vector array
 * @param {Vec[]} arr
 *
 */
export const unfold = arr => arr.map(v => new Vec(v.x, v.y).stand());

/**
 * compose two Vector by rotating the first Vector
 * @param {Vec} s start Vector
 * @param {Vec} e end Vector
 * @param {number} c coefficient 0~1
 */
export function composeRotate(s, e, c) {
  if (!(s instanceof Vec)) s = castVec(s);
  if (!(e instanceof Vec)) e = castVec(e);
  if (c === 0) return s;
  if (c === 1) return e;
  let sa = s.angle;
  let ea = e.angle;
  let angleBetween = -1;
  if (sa * ea >= 0) angleBetween = ea - sa;
  else if (sa < 0) {
    if (ea - sa <= Math.PI) angleBetween = ea - sa;
    else {
      sa += 2 * Math.PI;
      angleBetween = ea - sa;
    }
  } else if (sa - ea <= Math.PI) {
    angleBetween = ea - sa;
  } else {
    ea += 2 * Math.PI;
    angleBetween = ea - sa;
  }
  return angleToVec(sa + angleBetween * c).mult(s.mag * (1 - c) + e.mag * c);
}

export function VectorComposer(s, e) {
  return function(c) {
    return composeRotate(s, e, c);
  };
}

/**
 * Compose two Vec array with given function
 * @param {Vec} x
 * @param {Vec[]} xs
 * @param {Vec} y
 * @param {Vec[]} ys
 * @param {Number} c
 * @param {Function} f
 * @return {Vec[]}
 */
export function composeVector([x, ...xs], [y, ...ys], c, f = composeRotate) {
  if (x && y) return [composeRotate(x, y, c), ...composeVector(xs, ys, c, f)];
  else if (y) return [castVec(y).mult(c), ...composeVector(xs, ys, c, f)];
  else if (x) return [castVec(x).mult(1 - c), ...composeVector(xs, ys, c, f)];
  return [];
}

export function VectorArrComposer(from, to) {
  return function(c) {
    return composeVector(from, to, c);
  };
}

/**
 * Returns function returning composedVector array
 * @param {[[Vec]]} s
 * @param {[[Vec]]} e
 * @return {Function}
 */
export function snapComposer(s, e) {
  const [longer, shorter] = s.length >= e.length ? [s, e] : [e, s];
  return function snapper(c) {
    return longer.map((el, i) => composeVector(el, shorter[i] || [], c));
  };
}
