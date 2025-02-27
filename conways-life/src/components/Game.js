import React, { Component } from "react";
import "../styles/Game.css";
import LifeCanvas from "./LifeCanvas";
import Button from "antd/es/button";
import preset1 from "../assets/preset1.png";
import preset2 from "../assets/preset2.png";
import preset3 from "../assets/preset3.png";
import preset4 from "../assets/preset4.png";

export default class Game extends Component {
  state = {
    play: false,
    pause: false,
    step: false,
    preset1: false,
    preset2: false,
    preset3: false,
    preset4: false,
    reset: false,
    random: false
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
        reset: false,
        random: false
      });
    }
    this.setState({ [e.target.id]: !this.state[e.target.id] });
  };

  render() {
    return (
      <div className="game">
        <div className="grid">
          <div className="display">
            <LifeCanvas {...this.state} />
          </div>
          <div className="controls">
            <Button
              id="play"
              shape="round"
              type="default"
              onClick={this.updateStatus}
            >
              Play
            </Button>
            <Button
              id="step"
              type="default"
              shape="round"
              onClick={this.updateStatus}
            >
              Stop
            </Button>
            <Button
              id="step"
              type="default"
              shape="round"
              onClick={this.updateStatus}
            >
              Step
            </Button>
            <Button
              id="reset"
              type="danger"
              shape="round"
              onClick={this.updateStatus}
            >
              Reset
            </Button>
            <Button
              id="random"
              type="primary"
              shape="round"
              onClick={this.updateStatus}
            >
              Random
            </Button>
          </div>
        </div>
        <div className="presets">
          <div className="preset-main">
            <div className="preset">
              <img src={preset1} alt="test img" />
              <Button
                id="preset1"
                type="default"
                shape="round"
                onClick={this.updateStatus}
              >
                Preset 1
              </Button>
            </div>
            <div className="preset">
              <img src={preset2} alt="test img" />
              <Button
                id="preset2"
                type="default"
                shape="round"
                onClick={this.updateStatus}
              >
                Preset 2
              </Button>
            </div>
            <div className="preset">
              <img src={preset3} alt="test img" />
              <Button
                id="preset3"
                type="default"
                shape="round"
                onClick={this.updateStatus}
              >
                Preset 3
              </Button>
            </div>
            <div className="preset">
              <img src={preset4} alt="test img" />
              <Button
                id="preset4"
                type="default"
                shape="round"
                onClick={this.updateStatus}
              >
                Preset 4
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
