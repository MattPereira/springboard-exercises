import React from "react";
import "./Coin.css";

//render image of coin
const Coin = (props) => {
  return (
    <div className="Coin">
      <img src={props.imgSrc} alt={props.altText} data-testid="coin" />
    </div>
  );
};

export default Coin;
