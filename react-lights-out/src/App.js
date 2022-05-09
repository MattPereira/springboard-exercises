import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1>LIGHTS OUT</h1>
      <h4>Win Condition: All yellow lights turned off</h4>
      <Board />
      <Board nrows={1} ncols={3} chanceLightStartsOn={1} />
    </div>
  );
}

export default App;
