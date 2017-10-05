import React, { Component } from 'react';
import shf_data from './seohafont_data.js';
const canvas_style = {
  background: 'white'
};
class Seohafont extends Component {
  componentDidMount() {
    const WIDTH = 40;
    const HEIGHT = 80;
    let x = shf_data['A'].vectors[0].x * 10;
    let y = shf_data['A'].vectors[0].y * 10;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    shf_data['A'].vectors.slice(1).forEach(function(e) {
      x += e.x * 10;
      y += e.y * 10;
      console.log(x, y);
      ctx.lineTo(x, y);
    });
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  render() {
    return <canvas ref="canvas" className="seoha_text" style={canvas_style} />;
  }
}

export default Seohafont;
