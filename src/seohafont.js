import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
import vec, { angleToVec } from './vector.js';

const canvas_style = {
  width: '1000px',
  height: '500px'
};

class Seohafont extends Component {
  constructor(props) {
    super(props);
    this.text_vectors = []; // text_vectors to push;
    const text = /^[a-zA-Z]+$/.test(this.props.children)
      ? this.props.children.toUpperCase()
      : 'WRONG TEXT';
    text
      .split('')
      .forEach(e =>
        this.text_vectors.push(e === ' ' ? ' ' : Object.assign({}, shf_data[e]))
      );
    for (let i in this.text_vectors) {
      this.text_vectors[i].current_vectors = [...this.text_vectors[i].vectors];
    }
    this.state = {
      text: text
    };
    this.animate = this.animate.bind(this);
    this.renderString = this.renderString.bind(this);
    this.transition = this.transition.bind(this);
  }

  animate(startT, duration, ctx) {
    const deltaT = Date.now() - startT;

    if (deltaT < duration) {
      this.transition(deltaT, duration);
      requestAnimationFrame(() => this.animate(startT, duration, ctx));
    } else {
      this.transition(duration, duration);
    }
    this.renderString(ctx);
  }

  componentDidMount() {
    const canvas = this.refs.seoha_canvas;
    const ctx = canvas.getContext('2d');
    const startT = Date.now();
    const duration = 5000;
    //requestAnimationFrame(() => this.animate(startT,duration,ctx));
    this.renderString(ctx);
  }

  /**
   * render string on canvas
   *
   * @param {Number} w - Width of canvas
   * @param {Number} h - height of canvas
   * @param {Object} s - String to render
   * @param {Object} ctx - Canvas reference object
   */
  renderString(ctx) {
    const w = 1000; // #fix
    const h = 500; // #fix
    const sl = this.text_vectors.length;
    const tw = this.props.text_width;
    const th = this.props.text_height;
    const sx = w / 2 - (sl * 2 - 1) * tw / 2;

    const sy = h / 2 - th / 2;

    ctx.clearRect(0, 0, 1000, 500);
    this.text_vectors.forEach((e, i) => {
      this.renderVector(
        sx + tw * i * 2,
        sy,
        tw,
        th,
        this.text_vectors[i].current_vectors,
        ctx
      );
    });
  }

  /**
   * Render character on canvas
   *
   * @param {Number} x - X coordinate of top left corner
   * @param {Number} y - Y coordinate of top left corner
   * @param {Number} w - width of target frame
   * @param {Number} h - height of target frame
   * @param {String} c - Character to render
   * @param {Object} ctx - Canvas reference object
   */
  renderCharacter(x, y, w, h, c, ctx) {
    if (!(c in shf_data)) return;
    this.renderVector(x, y, w, h, shf_data[c].vectors, ctx);
  }

  /**
   * Render vector array on canvas
   *
   * @param {Number} x - X coordinate of top left corner
   * @param {Number} y - Y coordinate of top left corner
   * @param {Number} w - width of target frame
   * @param {Number} h - height of target frame
   * @param {[{x:Number,y:Number}]} v - Vector array to render
   * @param {Object} ctx - Canvas reference object @param y
   */
  renderVector(x, y, w, h, v, ctx) {
    const vectors = v.map(e => ({ x: e.x * w, y: e.y * h }));
    let tx = x + vectors[0].x;
    let ty = y + vectors[0].y;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    vectors.slice(1).forEach(function(e) {
      tx += e.x;
      ty += e.y;
      ctx.lineTo(tx, ty);
    });
    ctx.stroke();
  }

  transition(deltaT, duration) {
    const delta = deltaT / duration;
    this.text_vectors.forEach((e, i) => {
      this.text_vectors[i].current_vectors.forEach((f, j) => {
        let v1 = new vec(
          this.text_vectors[i].vectors[j].x,
          this.text_vectors[i].vectors[j].y
        );
        let a1 = v1.angle;
        let newVec = null;
        if (i === 0 && j === 1) console.log(a1);
        if (Math.abs(a1) < Math.PI / 2) {
          //clockwise
          let deltaA = Math.PI / 2 - a1;
          newVec = angleToVec(a1 + deltaA * delta);
        } else {
          //counter-clockwise
          if (a1 <= 0) a1 += Math.PI * 2;
          let deltaA = a1 - Math.PI / 2;
          newVec = angleToVec(a1 - deltaA * delta);
        }
        this.text_vectors[i].current_vectors[j] = newVec.mult(v1.mag);
      });
    });
  }

  render() {
    return (
      <div>
        <canvas
          ref="seoha_canvas"
          className="seoha_text"
          width="1000"
          height="500"
          style={canvas_style}
        />
        <p>{this.state.val} </p>
      </div>
    );
  }
}

export default Seohafont;
