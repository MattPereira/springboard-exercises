import React from "react";
import { Link } from "react-router-dom";
import "./Almonds.css";
import almondImg from "./almond.png";
import Card from "./Card";

const Almonds = () => {
  return (
    <div className="Almonds">
      <img src={almondImg} alt="bowl of almonds" />
      <Card>
        <h1 className="my-3">Almonds!</h1>

        <Link to="/" className="btn btn-primary">
          Vending Machine
        </Link>
      </Card>
      <img src={almondImg} alt="bowl of almonds" />
    </div>
  );
};

export default Almonds;
