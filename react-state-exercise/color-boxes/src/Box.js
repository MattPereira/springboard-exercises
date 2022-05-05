import React from "react";
import "./Box.css";

const Box = ({ color, status }) => {
  let changed;
  status ? (changed = <h3>{status}</h3>) : (changed = null);
  return (
    <div className="Box text-white" style={{ backgroundColor: color }}>
      {changed}
    </div>
  );
};

export default Box;
