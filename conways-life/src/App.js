import React from "react";
import "./styles/App.css";
import Rules from "./components/Rules";
import Game from "./components/Game";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="main">
        <div className="game-wrapper">
          <Game />
        </div>
        <div className="rules-wrapper">
          <Rules />
        </div>
      </div>
      <div className="about-wrapper">
        <About />
      </div>
    </div>
  );
}

export default App;
