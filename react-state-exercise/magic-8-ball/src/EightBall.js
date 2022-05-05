import React, { useState } from "react";
import "./EightBall.css";

/* Choose a random element from an array*/
function choice(arr) {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

const EightBall = (props) => {
  //set the inital state of msg, color, and color counts
  const [msg, setMsg] = useState("Think of a Question.");
  const [color, setColor] = useState("black");
  const [redCount, setRedCount] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);

  const handleClick = () => {
    //destructure msg and color from answers like {msg: "Most likely", color: "green"}
    const { msg, color } = choice(props.answers);
    //set state of color counts
    color === "red"
      ? setRedCount(redCount + 1)
      : color === "goldenrod"
      ? setGoldCount(goldCount + 1)
      : setGreenCount(greenCount + 1);

    //update the state of msg and color
    setMsg(msg);
    setColor(color);
  };

  /* reset all states to default */
  const reset = () => {
    setMsg("Think of a Question.");
    setColor("black");
    setRedCount(0);
    setGoldCount(0);
    setGreenCount(0);
  };

  return (
    <>
      <h3>REDS: {redCount}</h3>
      <h3>GOLDS: {goldCount}</h3>
      <h3>GREENS: {greenCount}</h3>

      <div
        className="EightBall"
        onClick={handleClick}
        style={{ backgroundColor: color }}
      >
        <h1 className="EightBall-msg">{msg}</h1>
      </div>
      <div>
        <button onClick={reset} className="btn btn-danger btn-lg rounded-pill">
          <b>RESET ALL STATES</b>
        </button>
      </div>
    </>
  );
};

EightBall.defaultProps = {
  answers: [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ],
};

export default EightBall;
