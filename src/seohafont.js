import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'raf/polyfill';
import ShfData from './seohafont_data';
import Vec, { unfold, snapComposer } from './vector';
import './seohafont.css';

/**
 * Shallow copy object
 * @param { Object } e
 * @return { Object } e
 */
const clone = e => JSON.parse(JSON.stringify(e));

/**
 * Turn String to Vec arr
 * @param { String } t
 * @return { Vec[][] }
 */
const textToVecs = t => t.split('').map(e => clone(ShfData[e].vectors));

class Seohafont extends Component {
  constructor(props) {
    super(props);
    const title = 'hello';
    const fold = false;
    const text = /^[a-zA-Z.]+$/.test(this.props.children)
      ? this.props.children.toUpperCase()
      : 'WRONG TEXT';
    this.text_vectors = textToVecs(text);
    this.state = { title, fold, text };

    // binding for callback
    this.animateStraight = this.animateStraight.bind(this);
    this.animateFold = this.animateFold.bind(this);
    this.renderString = this.renderString.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const canvas = this.seoha_canvas;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    canvas.setAttribute('width', (0.5 * vw).toString());
    canvas.setAttribute('height', vh.toString());
    // canvas.setAttribute('left',(0.25 * vw).toString());
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;

    this.renderString();
  }

  animate(snapper, st, duration) {
    const now = Date.now() - st;
    console.log(now);
    if (duration > now) {
      this.text_vectors = snapper(now / duration);
      requestAnimationFrame(() => this.animate(snapper, st, duration));
    } else {
      this.text_vectors = snapper(1);
    }

    this.renderString();
  }

  animateStraight() {
    const startVectors = JSON.parse(JSON.stringify(this.text_vectors));
    const endVectors = startVectors.map(unfold);
    return snapComposer(startVectors, endVectors);
  }

  animateFold() {
    const startVectors = JSON.parse(JSON.stringify(this.text_vectors));
    const endVectors = textToVecs(this.state.text);
    return snapComposer(startVectors, endVectors);
  }

  startLinearAnimation(duration, method) {
    const snapper = method();
    const st = Date.now();
    requestAnimationFrame(() => this.animate(snapper, st, duration));
  }

  /**
   * render string on canvas
   */
  renderString() {
    const ctx = this.seoha_canvas.getContext('2d');
    const w = this.canvas_width;
    const h = this.canvas_height;
    const sl = this.text_vectors.length;
    const tw = this.props.text_width;
    const th = this.props.text_height;
    if (!this.props.vertical) {
      const sx = w / 2 - (sl * 2 - 1) * tw / 2;
      const sy = h / 2 - th / 2;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx + tw * i * 2, sy, tw, th, e);
      });
    } else {
      const sx = w / 2 - tw / 2;
      const sy = h / 2 - (sl * 1.5 - 1) * th * 0.5;

      ctx.clearRect(0, 0, w, h);
      this.text_vectors.forEach((e, i) => {
        this.renderVector(sx, sy + th * i * 1.5, tw, th, e);
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
    const ctx = this.seoha_canvas.getContext('2d');
    const vectors = v.map(e => new Vec(e.x, e.y).scale(w, h));
    let tx = x + vectors[0].x;
    let ty = y + vectors[0].y;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(tx, ty);
    vectors.slice(1).forEach(e => {
      tx += e.x;
      ty += e.y;
      ctx.lineTo(tx, ty);
    });
    ctx.stroke();
    return new Vec(tx, ty);
  }

  render() {
    return (
      <div>
        <canvas
          ref={c => {
            this.seoha_canvas = c;
          }}
          className="seoha_text"
        />
        <button
          onClick={() => {
            this.startLinearAnimation(
              2000,
              this.state.fold ? this.animateFold : this.animateStraight
            );
            this.setState({ fold: !this.state.fold });
          }}
        >
          {this.state.fold ? 'fold' : 'unfold'}
        </button>
        <h1>{this.state.title}</h1>
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
