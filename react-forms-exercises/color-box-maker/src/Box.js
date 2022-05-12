import React from "react";
import "./Box.css";

const Box = ({ color = "indigo", width = 7, height = 7, id, handleRemove }) => {
  const styles = {
    backgroundColor: color,
    width: `${width}em`,
    height: `${height}em`,
  };

  return (
    <div className="Box" style={styles} data-testid={color}>
      <button className="Box-btn" onClick={() => handleRemove(id)}>
        X
      </button>
    </div>
  );
};

export default Box;
