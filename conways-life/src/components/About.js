import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about">
      <h2>About</h2>
      <h3>Is the Game of Life Turing Complete?</h3>
      <p>
        Something is said to be Turing complete if it is capable of computing
        that which a Turing Machine can compute. A Turing Machine is a
        theoretical mechanical calculator that can run calculations. It has a
        tape (instruction set) that is divided into cells. These cells can have
        values 0 or 1 which can be read from or written to as the machine moves
        along the tape. It can do arithmetic conditional branching, and store
        data. With that, anything that is computable can be calculated.
      </p>
      <p className="bottom">
        The Game of Life can compute anything that is computable given a enought
        time and a large enough grid therefore it is Turing Complete.
      </p>
    </div>
  );
}
