import React from "react";
import { Link } from "react-router-dom";
import "./VendingMachine.css";

const VendingMachine = () => {
  return (
    <div className="VendingMachine">
      <h1>React Router Vending Machine!</h1>
      <div className="row justify-content-around my-5">
        <div className="col-auto">
          <Link exact to="/blueberries">
            Blueberries
          </Link>
        </div>
        <div className="col-auto">
          <Link exact to="/chocolates">
            Chocolates
          </Link>
        </div>
        <div className="col-auto">
          <Link exact to="/almonds">
            Almonds
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
