import React from "react";
import { Link } from "react-router-dom";

const DogList = ({ dogs }) => {
  return (
    <div className="container">
      <h1 className="my-5">DOGGY DOGGY WHAT NOW?</h1>
      <div className="row justify-content-center">
        {dogs.map((dog) => (
          <div className="col-3" key={dog.name}>
            <Link exact="true" to={`/dogs/${dog.name.toLowerCase()}`}>
              <h3>{dog.name}</h3>
              <img src={dog.src} alt={dog.name} className="img-fluid" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogList;
