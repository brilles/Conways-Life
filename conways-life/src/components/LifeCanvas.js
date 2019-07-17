import React, { Component, createRef } from "react";
import "../styles/Canvas.css";

export default class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef(); //create ref (refer using current prop)
    this.state = {
      buffer: [],
      height: 400,
      width: 400,
      size: 25
    };
  }

  componentDidMount() {
    this.initializeBuffer();
  }

  initializeBuffer = () => {
    const bufferElement = new Array(16).fill(0);
    const buffer = new Array(16).fill(bufferElement);
    this.setState({ buffer });
  };

  componentDidUpdate() {
    this.initializeCanvas();
  }

  initializeCanvas = () => {
    console.log("CANVAS INIT");
    console.log(this.state.buffer);
    const { height, width, size } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create Grid
    for (var y = 0; y <= width; y += size) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (var x = 0; x <= height; x += size) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}
