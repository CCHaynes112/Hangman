import React from "react";

import "./HangmanPanel.css";

function HangmanPanel(props) {
  return (
    <div className="HangmanCharacter">
      <h1>Category: Movies</h1>
      <img
        className="hangmanImg"
        src={require(`./assets/img/${props.failCount}.png`)}
      />
      <h1>{props.word.toUpperCase()}</h1>
    </div>
  );
}

export default HangmanPanel;
