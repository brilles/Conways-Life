import React, { Component, createRef } from "react";
import "../styles/Canvas.css";

export default class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef(); //create ref (refer using current prop)
    this.state = {
      buffer: [],
      secondBuffer: [],
      height: 400,
      width: 400,
      size: 20,
      reset: false,
      generation: 0,
      play: false,
      random: false
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
    const buffer2 = new Array(20).fill(0);
    for (var i = 0; i < 20; i++) {
      buffer2[i] = new Array(20).fill(0);
    }

    const { buffer } = this.state;
    const secondBuffer = buffer2;
    for (var i in buffer) {
      for (var j in buffer[i]) {
        let above = i - 1;
        let below = Number(i) + 1;
        let right = Number(j) + 1;
        let left = Number(j) - 1;
        let neighbor1 = [left, above];
        let neighbor2 = [j, above];
        let neighbor3 = [right, above];
        let neighbor4 = [right, i];
        let neighbor5 = [right, below];
        let neighbor6 = [j, below];
        let neighbor7 = [left, below];
        let neighbor8 = [left, i];

        // Clockwise numbering (left-top == neighbor 1)
        let neighbors = [
          neighbor1,
          neighbor2,
          neighbor3,
          neighbor4,
          neighbor5,
          neighbor6,
          neighbor7,
          neighbor8
        ];

        // If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
        if (buffer[i][j] === 1) {
          let neighborsActive = [];
          for (var neighbor in neighbors) {
            let x = neighbors[neighbor][1];
            let y = neighbors[neighbor][0];

            if (x !== -1 && y !== -1 && x !== 20 && y !== 20) {
              if (buffer[x][y] === 1) {
                neighborsActive.push([x, y]);
              }
            }
          }
          if (neighborsActive.length === 2 || neighborsActive.length === 3) {
            secondBuffer[i][j] = 1;
          }
        } else {
          // the cell is dead
          let neighborsAlive = [];
          for (var k in neighbors) {
            let x = neighbors[k][1];
            let y = neighbors[k][0];

            if (x !== -1 && y !== -1 && x !== 20 && y !== 20) {
              if (buffer[x][y] === 1) {
                neighborsAlive.push([x, y]);
              }
            }
          }
          if (neighborsAlive.length === 3) {
            secondBuffer[i][j] = 1;
          }
        }
      }
    }
    this.setState({
      buffer: secondBuffer,
      generation: this.state.generation + 1
    });
    setTimeout(() => {
      this.runSimulation();
    }, 83);
  };

  componentDidUpdate() {
    // TODO: refactor so no state
    if (this.state.reset !== this.props.reset) {
      this.setState({ reset: !this.state.reset });
      // this.initializeBuffer();
    }
    if (this.props.play !== this.state.play) {
      // play
      this.setState({ play: !this.state.play });
      this.runSimulation();
    }

    if (this.props.random !== this.state.random) {
      // random config
      this.setState({ random: !this.state.random });
      this.randomConfig();
    }

    // fill in elements
    let { buffer } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (var i in buffer) {
      for (var j in buffer[i]) {
        if (buffer[i][j] === 1) {
          // paint
          ctx.beginPath();
          ctx.rect(j * 20, i * 20, 20, 20); // x, y, w, h - * 20 to resize
          ctx.fillStyle = "black";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.rect(j * 20, i * 20, 19, 19); // x, y, w, h - * 20 to resize
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    }
  }

  randomConfig = () => {
    const bufferZero = new Array(20).fill(0);
    for (var i = 0; i < 20; i++) {
      bufferZero[i] = new Array(20).fill(0);
    }
    if (this.props.play == false) {
      for (var i in bufferZero) {
        for (var j in bufferZero[i]) {
          let rand = Math.floor(Math.random() * 2);
          bufferZero[i][j] = rand; // random between 0, 1
        }
      }
      this.setState({ buffer: bufferZero });
    }
  };

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
      <>
        <h2>
          Generation: <span>{this.state.generation}</span>
        </h2>
        <div className="canvas-display">
          <canvas
            onClick={this.position}
            ref={this.canvasRef}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
      </>
    );
  }
}
