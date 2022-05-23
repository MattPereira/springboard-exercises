import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

const ColorList = ({ colors }) => {
  document.body.style.backgroundColor = "white";

  const colorLinks = Object.keys(colors).map((colorName) => (
    <div className="ColorList-links" key={colorName}>
      <Link exact="true" to={`/colors/${colorName}`} key={colorName}>
        {colorName}
      </Link>
    </div>
  ));
  return (
    <div className="ColorList">
      <header className="ColorList-header">
        <h1>Welcome to the Color Factory</h1>
        <Link exact="true" to="/colors/new">
          Add a Color
        </Link>
      </header>
      <p>Please select a color.</p>
      {colorLinks}
    </div>
  );
};

export default ColorList;
