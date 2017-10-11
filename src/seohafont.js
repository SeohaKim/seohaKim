import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
const canvas_style = {
  width: '1000px',
  height: '500px'
};
class Seohafont extends Component {
  componentDidMount() {
    const canvas = this.refs.seoha_canvas;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineTo(100, 100);
    //ctx.lineWidth = 1;
    this.props.text.split('').forEach((e, i) => {
      this.renderCharacter(i * 30, 10, 20, 40, e, ctx);
    });
  }

  /**
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
    console.log(vectors);
    console.log(x, y);
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    console.log(tx, ty);
    vectors.slice(1).forEach(function(e) {
      tx += e.x;
      ty += e.y;
      ctx.lineTo(tx, ty);
    });
    ctx.stroke();
  }

  render() {
    return (
      <canvas ref="seoha_canvas" className="seoha_text" style={canvas_style} />
    );
  }
}

export default Seohafont;
