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
      size: 20,
      reset: false
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

  runSimulation = () => {
    console.log("Simulation running");
    const { buffer } = this.state;
    for (var i in buffer) {
      for (var j in buffer[i]) {
        let above = i - 1;
        let below = Number(i) + 1;
        let right = Number(j) + 1;
        let left = Number(j) - 1;

        let position = [j, i];
        let neighbor1 = [left, above];
        let neighbor2 = [j, above];
        let neighbor3 = [right, above];
        let neighbor4 = [right, i];
        let neighbor5 = [right, below];
        let neighbor6 = [j, below];
        let neighbor7 = [left, below];
        let neighbor8 = [left, j];
        // Clockwise numbering (leftmost == 0)
        const neighbors = [
          neighbor1,
          neighbor2,
          neighbor3,
          neighbor4,
          neighbor5,
          neighbor6,
          neighbor7,
          neighbor8
        ];
        let neighborsActive = [];
        if (buffer[i][j] === 1) {
          console.log(neighbors);

          // If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
          // If the cell is dead and has exactly 3 neighbors, then it comes to life.
          //Else if remains dead.

          if (neighborsActive.length === 2 || neighborsActive.length === 3) {
            console.log("remains alive");
          } else {
            console.log("dies");
          }
        } else {
          // inActive
          if (neighborsActive.length === 3) {
            console.log("comes to live");
          }
        }
      }
    }
  };

  componentDidUpdate() {
    // TODO: refactor so no state
    if (this.state.reset !== this.props.reset) {
      this.setState({ reset: !this.state.reset });
      this.initializeBuffer();
    }
    if (this.props.play == true) {
      // play
      this.runSimulation();
    }
    // fill in clicked elements
    const { buffer } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i in buffer) {
      for (var j in buffer[i]) {
        if (buffer[i][j] === 1) {
          // paint
          ctx.rect(j * 20, i * 20, 20, 20); // x, y, w, h - * 20 to resize
          ctx.fill();
        }
      }
    }
  }

  //
  position = e => {
    if (this.props.play === false) {
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
    } else if (this.props.play === true || this.props.pause === true) {
      alert("Cannot add cells while simulation is running.");
    }
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

    // let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // let screenBuffer = imageData.data;
    // screenBuffer[0] = 1;
    // console.log("SCREEN BUFFER", screenBuffer);

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
