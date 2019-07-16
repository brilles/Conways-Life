import React, { Component, createRef } from "react";
import "../styles/Canvas.css";

export default class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.continueAnimation = true;
    this.canvasRef = createRef(); //create ref (refer using current prop)
  }
  componentDidMount() {
    this.animate();
    // request initial animation fram
    requestAnimationFrame(timestamp => {
      this.onAnimFrame(timestamp);
    });
  }
  componentWillMount() {
    // stop animating
    this.continueAnimation = false;
  }
  // called every animation
  onAnimFrame(timestamp) {
    console.log(timestamp);
    // could request another anim frame for later
    if (this.continueAnimation) {
      requestAnimationFrame(timestamp => {
        this.onAnimFrame(timestamp);
      });
    }
  }
  // animate
  animate() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d"); // AKA "context" - the current drawing state of the canvas
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let screenBuffer = imageData.data;
    let x = 10,
      y = 20;
    let index = (y * canvas.width + x) * 4;

    screenBuffer[index + 0] = 0xff; // Red: 0xff == 255, full intensity
    screenBuffer[index + 1] = 0x00; // Green: zero intensity
    screenBuffer[index + 2] = 0x00; // Blue: zero intensity
    screenBuffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque

    ctx.putImageData(imageData, 0, 0);
  }
  render() {
    return <canvas ref={this.canvasRef} width={400} height={400} />;
  }
}
