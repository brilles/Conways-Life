import React from "react";
import "../styles/Game.css";

export default function Game() {
  return (
    <div className="game">
      <div className="grid">
        <h2>Generation: #</h2>
        <div className="display">Display</div>
        <div className="controls">controls</div>
      </div>
      <div className="presets">
        <h2>Presets</h2>
      </div>
    </div>
  );
}
