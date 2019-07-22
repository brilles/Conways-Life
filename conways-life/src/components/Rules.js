import React from "react";
import "../styles/Rules.css";

export default function Rules() {
  return (
    <div className="rules">
      <h2>Rules 📜</h2>
      <p>
        · If the cell is alive and has 2 or 3 neighbors, then it remains alive.
        Else it dies.
      </p>
      <p>
        · If the cell is dead and has exactly 3 neighbors, then it comes to
        life. Else it remains dead.
      </p>
      <h2>To Begin 🟢</h2>
      <p>
        · Fill in cells by clicking the grid or clicking <span>random</span> and
        click play!
      </p>
    </div>
  );
}
