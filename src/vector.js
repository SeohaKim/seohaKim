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
}

export const angleToVec = a => new Vec(Math.cos(a), Math.sin(a));

export const unfold = arr => arr.map(v => new Vec(v.x, v.y).stand());

/**
 * compose two Vector by rotating the first Vector
 * @param {Vec} s start Vector
 * @param {Vec} e end Vector
 * @param {number} c coefficient 0~1
 */
export function composeRotate(s, e, c) {
  let sa = s.angle;
  let ea = e.angle;
  let angleBetween = -1;
  if (sa * ea >= 0) angleBetween = ea - sa;
  else {
    if (sa < 0) {
      if (ea - sa <= Math.PI) angleBetween = ea - sa;
      else {
        sa += 2 * Math.PI;
        angleBetween = ea - sa;
      }
    } else {
      //ea < 0
      if (sa - ea <= Math.PI) angleBetween = ea - sa;
      else {
        ea += 2 * Math.PI;
        angleBetween = ea - sa;
      }
    }
  }
  return angleToVec(sa + angleBetween * c).mult(s.mag * (1 - c) + e.mag * c);
}
