import React from "react";

const Card = ({ image, name }) => {
  return (
    <>
      <img className="Card" src={image} alt={name} />
    </>
  );
};

export default Card;
