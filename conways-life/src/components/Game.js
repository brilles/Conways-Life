import React, { Component } from "react";
import "../styles/Game.css";
import LifeCanvas from "./LifeCanvas";

export default class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="grid">
          <h2>Generation: #</h2>
          <div className="display">
            <LifeCanvas />
          </div>
          <div className="controls">
            <button onClick={() => console.log("Play")}>Play</button>
            <button onClick={() => console.log("Pause")}>Pause</button>
            <button onClick={() => console.log("Stop")}>Stop</button>
            <button onClick={() => console.log("Step")}>Step</button>
          </div>
        </div>
        <div className="presets">
          <h2>Presets</h2>
          <div className="preset-main">
            <div className="preset">
              <div>img here</div>
              <button onClick={() => console.log("Preset 1")}>Preset 1</button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button onClick={() => console.log("Preset 2")}>Preset 2</button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button onClick={() => console.log("Preset 3")}>Preset 3</button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button onClick={() => console.log("Preset 4")}>Preset 4</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
