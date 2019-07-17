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
      size: 20
    };
  }

  componentDidMount() {
    this.initializeBuffer();
    this.initializeCanvas();
  }

  initializeBuffer = () => {
    const buffer = new Array(20).fill(0);
    for (var i = 0; i < 20; i++) {
      buffer[i] = new Array(20).fill(0);
    }
    this.setState({ buffer });
  };

  componentDidUpdate() {
    // fill in clicked elements
    const { buffer } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(buffer);
    for (var i in buffer) {
      for (var j in buffer[i]) {
        if (buffer[i][j] === 1) {
          // paint
          console.log(buffer[i][j]);
          console.log(this.props);
          ctx.rect(j * 20, i * 20, 20, 20); // x, y, w, h - * 20 to resize
          ctx.fill();
        }
      }
    }
  }

  //
  position = e => {
    const canvas = this.canvasRef.current;
    let mousePosition = this.getMousePosition(e, canvas);
    // insert the mouse position into the buffer
    let { x } = mousePosition;
    let { y } = mousePosition;
    let colIndex = Math.floor(x / 20);
    let rowIndex = Math.floor(y / 20);
    let bufferUpdated = this.state.buffer;
    bufferUpdated[rowIndex][colIndex] = 1;
    this.setState({ buffer: bufferUpdated });
  };

  getMousePosition = (e, canvas) => {
    let rectangle = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rectangle.left,
      y: e.clientY - rectangle.top
    };
  };

  initializeCanvas = () => {
    // Setup canvas and context
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
        onClick={this.position}
        ref={this.canvasRef}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}
