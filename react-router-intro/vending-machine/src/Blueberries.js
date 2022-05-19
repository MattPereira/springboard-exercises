import React, { useState } from "react";
import { Link } from "react-router-dom";
import blueberry from "./blueberry.png";
import "./Blueberry.css";
import Card from "./Card";

const randCoords = () => {
  const x = window.innerWidth * Math.random();
  const y = window.innerWidth * Math.random();

  return { x, y };
};

const Blueberries = () => {
  const [berries, setBerries] = useState([
    randCoords(),
    randCoords(),
    randCoords(),
  ]);

  const handleClick = () => {
    setBerries((berries) => [...berries, randCoords()]);
  };

  const b = berries.map((berry, i) => (
    <img
      key={i}
      src={blueberry}
      className="blueberry"
      style={{ top: `${berry.y}px`, left: `${berry.x}px` }}
      alt="blueberry"
    />
  ));
  return (
    <div className="blueberries">
      <Card>
        <h1 className="my-3">Blueberries!</h1>

        <Link exact to="/">
          Back To Vending Machine
        </Link>
        <div className="mt-4">
          <button onClick={handleClick} className="btn btn-lg btn-primary">
            NOM NOM NOM!
          </button>
        </div>
      </Card>

      <div>{b}</div>
    </div>
  );
};

export default Blueberries;
