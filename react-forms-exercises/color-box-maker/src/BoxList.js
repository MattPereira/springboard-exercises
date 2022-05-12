import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

import "./BoxList.css";

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);

  const add = (newBox) => {
    setBoxes((boxes) => [...boxes, newBox]);
  };

  const remove = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  const boxComponents = boxes.map((box) => (
    <Box
      color={box.color}
      height={box.height}
      width={box.width}
      id={box.id}
      key={box.id}
      handleRemove={remove}
    />
  ));

  return (
    <div className="BoxList">
      <div className="BoxList-form">
        <NewBoxForm addBox={add} />
      </div>
      <div className="BoxList-container">{boxComponents}</div>
    </div>
  );
};

export default BoxList;
