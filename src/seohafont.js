import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
const canvas_style = {};
class Seohafont extends Component {
  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 1;
    this.props.text.split('').forEach((e, i) => {
      this.renderCharacter(i * 60, 10, 50, 100, e, ctx);
    });
    ctx.stroke();
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
    ctx.moveTo(tx, ty);
    console.log(tx, ty);
    vectors.slice(1).forEach(function(e) {
      tx += e.x;
      ty += e.y;
      ctx.lineTo(tx, ty);
      console.log(tx, ty);
    });
  }

  render() {
    return <canvas ref="canvas" className="seoha_text" style={canvas_style} />;
  }
}

export default Seohafont;
