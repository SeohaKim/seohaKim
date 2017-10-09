import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
const canvas_style = {};
class Seohafont extends Component {
  componentDidMount() {
    const WIDTH = 40;
    const HEIGHT = 80;
    let x = shf_data['A'].vectors[0].x * WIDTH;
    let y = shf_data['A'].vectors[0].y * HEIGHT;
    const ctx = this.refs.canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    shf_data['A'].vectors.slice(1).forEach(function(e) {
      x += e.x * WIDTH;
      y += e.y * HEIGHT;
      console.log(x, y);
      ctx.lineTo(x, y);
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
    const vectors = shf_data[c].map(x => ({ x: x * w, y: y * h }));
    let tx = x + vectors[1];
    let ty = y + vectors[1];
  }

  render() {
    return <canvas ref="canvas" className="seoha_text" style={canvas_style} />;
  }
}

export default Seohafont;
