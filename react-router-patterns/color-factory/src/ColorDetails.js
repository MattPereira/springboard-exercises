import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ColorDetails.css";

const ColorDetails = ({ colors }) => {
  const { color } = useParams();

  const hexCode = colors[color];

  return (
    <div className="Color" style={{ backgroundColor: hexCode }}>
      <p>This is {color}!</p>
      <p>
        <Link exact="true" to="/colors">
          GO BACK
        </Link>
      </p>
    </div>
  );
};

export default ColorDetails;
