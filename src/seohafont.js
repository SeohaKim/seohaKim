import React, { Component } from 'react';
import shf_data from './seohafont_data.js';

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
    console.log(this.text_vectors);
    this.animate = this.animate.bind(this);
    this.state = {
      text: text
    };
  }

  animate() {
    if (this.state.val > 0) {
      this.setState({
        val: this.state.val - 1
      });
      console.log(this.state.val);
      window.requestAnimationFrame(this.animate);
    }
  }

  componentDidMount() {
    const canvas = this.refs.seoha_canvas;
    const ctx = canvas.getContext('2d');
    const tw = this.props.text_width;
    const th = this.props.text_height;
    ctx.beginPath();
    ctx.lineTo(100, 100);
    //ctx.lineWidth = 1
    this.props.text.split('').forEach((e, i) => {
      this.renderCharacter(10 + i * tw * 1.5, 10, tw, th, e, ctx);
    });
    window.requestAnimationFrame(this.animate);
  }

  renderString(w, h) {}

  /***
   * render Character on canvas
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

    const vectors = shf_data[c].vectors.map(e => ({ x: e.x * w, y: e.y * h }));
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
