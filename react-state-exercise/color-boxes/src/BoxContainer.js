import React, { useState } from "react";
import Box from "./Box";
import choice from "./helpers";
import "./BoxContainer.css";

const BoxContainer = (props) => {
  const [boxes, setBoxes] = useState([...props.colors]);

  //put a random color in state to set as color of new box and display "CHANGED!" on the changed box
  const [randColor, setRandColor] = useState(null);

  const handleClick = () => {
    let randIdx = Math.floor(Math.random() * props.colors.length);

    setBoxes((boxes) => {
      let boxCopy = [...boxes];
      //choose new random color for a randomly selected box
      let newColor = choice(props.colors);
      setRandColor(newColor);
      boxCopy[randIdx] = newColor;
      return boxCopy;
    });
  };

  //map the array of colors to create all the boxes
  const boxComponents = boxes.map((color, i) => (
    <Box
      key={i}
      color={color}
      status={randColor === color ? "CHANGED!" : null}
    />
  ));

  return (
    <>
      <div className="BoxContainer">{boxComponents}</div>

      <div className="d-flex justify-content-center my-5">
        <button
          className="BoxContainer-btn"
          onClick={handleClick}
          style={{ backgroundColor: randColor }}
        >
          Change Color!
        </button>
      </div>
    </>
  );
};

BoxContainer.defaultProps = {
  colors: [
    "red",
    "mediumpurple",
    "black",
    "yellowgreen",
    "green",
    "indigo",
    "violet",
    "lightpink",
    "orange",
    "grey",
    "lime",
    "navy",
    "palegreen",
    "gold",
    "maroon",
    "cyan",
  ],
};

export default BoxContainer;
