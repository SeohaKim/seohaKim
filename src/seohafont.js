import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
import Vec, { unfold, angleToVec, composeRotate } from './vector.js';
import './seohafont.css';

const canvas_style = {
  position: 'fixed',
  top: '0',
  left: 'calc(50% - 250px)'
};
const wrapper_style = {};
const clone = e => JSON.parse(JSON.stringify(e));

class Seohafont extends Component {
  constructor(props) {
    super(props);
    this.text_vectors = []; // text_vectors to push;
    const text = /^[a-zA-Z]+$/.test(this.props.children)
      ? this.props.children.toUpperCase()
      : 'WRONG TEXT';
    text
      .split('')
      .forEach(e => this.text_vectors.push(clone(shf_data[e].vectors)));
    console.log(this.text_vectors);
    this.state = {
      text: text
    };

    this.animate_straight = this.animate_straight.bind(this);
    this.renderString = this.renderString.bind(this);
    this.composeRotateVectors = this.composeRotateVectors.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.seoha_canvas;
    const ctx = canvas.getContext('2d');
    const startT = Date.now();
    const duration = 2000;
    let vw = document.documentElement.clientWidth;
    let vh = document.documentElement.clientHeight;
    canvas.setAttribute('width', (0.5 * vw).toString());
    canvas.setAttribute('height', vh.toString());
    // canvas.setAttribute('left',(0.25 * vw).toString());
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;

    requestAnimationFrame(() => this.animate_straight(startT, duration, ctx));
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
    const w = this.canvas_width;
    const h = this.canvas_height;
    const sl = this.text_vectors.length;
    const tw = this.props.text_width;
    const th = this.props.text_height;
    if (!this.props.vertical) {
      let sx = w / 2 - (sl * 2 - 1) * tw / 2;
      let sy = h / 2 - th / 2;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx + tw * i * 2, sy, tw, th, e, ctx);
      });
    } else {
      let sx = w / 2 - tw / 2;
      let sy = h / 2 - (sl * 3 - 1) * th / 2;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx, sy + th * i * 3, tw, th, e, ctx);
      });
    }
  }

  animate_straight(startT, duration, ctx) {
    const start_vectors = JSON.parse(JSON.stringify(this.text_vectors));
    const end_vectors = start_vectors.map(unfold);
    console.log(end_vectors);
    const deltaT = Date.now() - startT;
    if (deltaT < duration) {
      this.composeRotateVectors(deltaT, duration);
      requestAnimationFrame(() => this.animate_straight(startT, duration, ctx));
    } else {
      this.composeRotateVectors(duration, duration);
    }
    this.renderString(ctx);
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
    return new Vec(tx, ty);
  }

  composeRotateVectors(s_vectors, e_vectors, c) {}

  render() {
    return (
      <div>
        <canvas ref="seoha_canvas" className="seoha_text" />
      </div>
    );
  }
}

export default Seohafont;
