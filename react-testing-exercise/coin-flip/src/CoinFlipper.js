import React, { useState } from "react";
import tail from "./pennyTail.png";
import head from "./pennyHead.png";
import Coin from "./Coin";
import choice from "./helpers";
import "./CoinFlipper.css";

const CoinFlipper = (props) => {
  const [coinSide, setCoinSide] = useState(null);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const handleClick = () => {
    const newSide = choice(props.sides);

    setCoinSide(newSide);
    if (newSide.name === "heads") {
      setHeadsCount(headsCount + 1);
    } else {
      setTailsCount(tailsCount + 1);
    }
  };

  const currSide = coinSide ? (
    <Coin imgSrc={coinSide.imgSrc} altText={coinSide.name} />
  ) : null;

  return (
    <div className="CoinFlipper">
      {currSide}
      <button className="CoinFlipper-btn" onClick={handleClick}>
        FLIP COIN
      </button>
      <h3 className="CoinFlipper-counter">
        Out of {headsCount + tailsCount} flips, there have been {headsCount}{" "}
        heads and {tailsCount} tails!
      </h3>
    </div>
  );
};

CoinFlipper.defaultProps = {
  sides: [
    {
      imgSrc: head,
      name: "heads",
    },
    {
      imgSrc: tail,
      name: "tails",
    },
  ],
};

export default CoinFlipper;
