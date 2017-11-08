import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'raf/polyfill';
import ShfData from './seohafont_data';
import Vec, { unfold, snapComposer } from './vector';
import './seohafont.css';

const clone = e => JSON.parse(JSON.stringify(e));

class Seohafont extends Component {
  constructor(props) {
    super(props);
    const title = 'hello';
    const fold = false;
    this.text_vectors = []; // text_vectors to push;
    const text = /^[a-zA-Z.]+$/.test(this.props.children)
      ? this.props.children.toUpperCase()
      : 'WRONG TEXT';
    text
      .split('')
      .forEach(e => this.text_vectors.push(clone(ShfData[e].vectors)));
    this.state = { title, fold };

    this.animateStraight = this.animateStraight.bind(this);
    this.renderString = this.renderString.bind(this);
  }

  componentDidMount() {
    const canvas = this.seoha_canvas;
    const ctx = canvas.getContext('2d');
    const startT = Date.now();
    const duration = 2000;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    canvas.setAttribute('width', (0.5 * vw).toString());
    canvas.setAttribute('height', vh.toString());
    // canvas.setAttribute('left',(0.25 * vw).toString());
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;

    requestAnimationFrame(() => this.animateStraight(startT, duration, ctx));
    this.renderString(ctx);
  }

  animate(snapper, d) {}

  animateStraight(startT, duration, ctx) {
    const startVectors = JSON.parse(JSON.stringify(this.text_vectors));
    const endVectors = startVectors.map(unfold);
    const deltaT = Date.now() - startT;
    if (deltaT < duration) {
      requestAnimationFrame(() => this.animateStraight(startT, duration, ctx));
    } else {
    }
    this.renderString(ctx);
  }

  /**
   * render string on canvas
   * @param {Object} ctx - Canvas reference object
   */
  renderString(ctx) {
    const w = this.canvas_width;
    const h = this.canvas_height;
    const sl = this.text_vectors.length;
    const tw = this.props.text_width;
    const th = this.props.text_height;
    if (this.props.vertical) {
      const sx = w / 2 - (sl * 2 - 1) * tw / 2;
      const sy = h / 2 - th / 2;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx + tw * i * 2, sy, tw, th, e, ctx);
      });
    } else {
      const sx = w / 2 - tw / 2;
      const sy = h / 2 - (sl * 1.5 - 1) * th * 0.5;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx, sy + th * i * 1.5, tw, th, e, ctx);
      });
    }
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
   *
   * @return {Vec} - return end Vector;
   */
  renderVector(x, y, w, h, v) {
    const vectors = v.map(e => new Vec(e.x, e.y).scale(w, h));
    let tx = x + vectors[0].x;
    let ty = y + vectors[0].y;
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(tx, ty);
    vectors.slice(1).forEach(e => {
      tx += e.x;
      ty += e.y;
      this.ctx.lineTo(tx, ty);
    });
    this.ctx.stroke();
    return new Vec(tx, ty);
  }

  al(e) {
    console.log('hello');
    alert('hello');
  }

  render() {
    return (
      <div>
        <button>{this.state.fold ? 'fold' : 'unfold'}</button>
        <h1>{this.state.title}</h1>
        <canvas
          ref={c => {
            this.seoha_canvas = c;
            this.ctx = c.getContext('2d');
          }}
          className="seoha_text"
        />
      </div>
    );
  }
}

Seohafont.propTypes = {
  children: PropTypes.string.isRequired,
  text_width: PropTypes.number.isRequired,
  text_height: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired
};

export default Seohafont;
