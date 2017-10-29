export default class vec {
  /**
   *
   * @param {n x
   * @param y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sum(v) {
    return new vec(this.x + v.x, this.y + v.y);
  }

  stand() {
    return new vec(0, this.mag);
  }

  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  normal() {
    if (this.mag === 0) return new vec(0, 0);
    return new vec(this.x / this.mag, this.y / this.mag);
  }

  mult(n) {
    return new vec(this.x * n, this.y * n);
  }
}

export const angleToVec = a => new vec(Math.cos(a), Math.sin(a));

export const unfold = arr => arr.map(v => new vec(v.x, v.y).stand());
