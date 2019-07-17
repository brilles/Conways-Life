import React, { Component } from "react";
import "../styles/Game.css";
import LifeCanvas from "./LifeCanvas";

export default class Game extends Component {
  state = {
    play: false,
    pause: false,
    step: false,
    preset1: false,
    preset2: false,
    preset3: false,
    preset4: false,
    reset: false
  };

  updateStatus = e => {
    if (e.target.id === "reset") {
      this.setState({
        play: false,
        pause: false,
        step: false,
        preset1: false,
        preset2: false,
        preset3: false,
        preset4: false,
        reset: !this.state.reset
      });
    }
    this.setState({ [e.target.id]: !this.state[e.target.id] });
  };

  render() {
    return (
      <div className="game">
        <div className="grid">
          <h2>Generation: #</h2>
          <div className="display">
            <LifeCanvas {...this.state} />
          </div>
          <div className="controls">
            <button id="play" onClick={this.updateStatus}>
              Play
            </button>
            <button id="pause" onClick={this.updateStatus}>
              Pause
            </button>
            <button id="step" onClick={this.updateStatus}>
              Step
            </button>
            <button id="reset" onClick={this.updateStatus}>
              Reset
            </button>
          </div>
        </div>
        <div className="presets">
          <h2>Presets</h2>
          <div className="preset-main">
            <div className="preset">
              <div>img here</div>
              <button id="preset1" onClick={this.updateStatus}>
                Preset 1
              </button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button id="preset2" onClick={this.updateStatus}>
                Preset 2
              </button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button id="preset3" onClick={this.updateStatus}>
                Preset 3
              </button>
            </div>
            <div className="preset">
              <div>img here</div>
              <button id="preset3" onClick={this.updateStatus}>
                Preset 4
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
