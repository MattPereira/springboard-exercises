import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Chocolates.css";

const chocolateImgSrc =
  "https://images.unsplash.com/photo-1511381939415-e44015466834?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1872";

const Chocolates = () => {
  return (
    <div
      className="Chocolates"
      style={{ backgroundImage: `url(${chocolateImgSrc})` }}
    >
      <Card>
        <h1 className="my-3">Chocolates!</h1>
        <Link exact to="/" className="btn btn-primary">
          Back To Vending Machine
        </Link>
      </Card>
    </div>
  );
};

export default Chocolates;
